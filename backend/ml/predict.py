import os
import json
import joblib
import pandas as pd
import numpy as np

MODELS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../models'))

# Ensure paths exist
BEST_MODEL_PATH = os.path.join(MODELS_DIR, 'best_model.pkl')
ENCODER_PATH = os.path.join(MODELS_DIR, 'label_encoder.pkl')
SCALER_MAP_PATH = os.path.join(MODELS_DIR, 'test_name_map.json')
METADATA_PATH = os.path.join(MODELS_DIR, 'metadata.json')

def load_artifacts():
    try:
        model = joblib.load(BEST_MODEL_PATH)
        le = joblib.load(ENCODER_PATH)
        with open(SCALER_MAP_PATH, 'r') as f:
            scaler_map = json.load(f)
        with open(METADATA_PATH, 'r') as f:
            metadata = json.load(f)
        return model, le, scaler_map, metadata
    except Exception as e:
        print(f"Prediction artifacts not fully loaded: {e}")
        return None, None, None, None

def predict(test_name, value, ref_low, ref_high, age, sex) -> dict:
    model, le, scaler_map, metadata = load_artifacts()
    
    if not model:
        return {"predicted_status": "UNKNOWN", "confidence_score": 0.0, "model_used": "NONE"}

    try:
        # Encode test name
        t_name = str(test_name).lower().strip()
        encoded_name = le.transform([t_name])[0] if t_name in le.classes_ else 0
        
        # Scaling
        s_dict = scaler_map.get(t_name, {'min': value, 'max': value + 0.1})
        v_min, v_max = s_dict['min'], s_dict['max']
        if v_max == v_min: v_max += 0.1
        val_norm = (value - v_min) / (v_max - v_min)
        
        # Age
        age = int(age) if age else 30
        if age < 18: age_bin = 0
        elif age <= 40: age_bin = 1
        elif age <= 60: age_bin = 2
        else: age_bin = 3
        
        # Sex
        sex_bin = 1 if str(sex).upper() in ['F', 'FEMALE', '1'] else 0
        
        # Deviation
        ref_diff = (ref_high - ref_low) or 0.1
        val_dev = (value - ref_low) / ref_diff
        
        # Outside range flag
        out_range = 1 if (value < ref_low or value > ref_high) else 0
        
        # Prepare vector
        X = pd.DataFrame([{
            'test_name_encoded': encoded_name,
            'value_norm': val_norm,
            'reference_range_low': ref_low,
            'reference_range_high': ref_high,
            'age_binned': age_bin,
            'sex_binary': sex_bin,
            'value_deviation': val_dev,
            'is_outside_range': out_range
        }])
        
        pred_label = model.predict(X)[0]
        pred_proba = model.predict_proba(X).max()
        
        labels_map = {0: "NORMAL", 1: "LOW", 2: "HIGH", 3: "CRITICAL"}
        
        return {
            "predicted_status": labels_map.get(pred_label, "UNKNOWN"),
            "confidence_score": float(pred_proba),
            "model_used": metadata.get('model_type', 'ML Model')
        }
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        return {"predicted_status": "ERROR", "confidence_score": 0.0, "model_used": "NONE"}
