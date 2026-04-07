import os
import json
import joblib
import pandas as pd
import numpy as np
from datetime import datetime
from sklearn.model_selection import train_test_split, cross_validate, StratifiedKFold
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score, precision_score, recall_score, confusion_matrix, accuracy_score
import xgboost as xgb
import lightgbm as lgb
import warnings

warnings.filterwarnings('ignore')

BASE_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../data'))
MODELS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../models'))
DATASET_PATH = os.path.join(BASE_DATA_DIR, 'dataset.csv')
os.makedirs(MODELS_DIR, exist_ok=True)

def train_and_compare():
    print(">>> PHASE 2B: LOADING DATA")
    if not os.path.exists(DATASET_PATH):
        print("Dataset not found. Please run the OCR pipeline first.")
        # Create a dummy dataset for demonstration if not found to prevent compilation breaks
        df = pd.DataFrame(columns=['test_name', 'value', 'reference_range_low', 'reference_range_high', 'patient_age', 'patient_sex', 'label'])
    else:
        df = pd.read_csv(DATASET_PATH)
        
    print(df.head())
    
    # Preprocessing
    print(">>> PREPROCESSING FEATURES")
    
    # Drop NAs
    for col in ['test_name', 'value', 'reference_range_low', 'reference_range_high', 'patient_age', 'patient_sex', 'label']:
        if col not in df.columns:
            print(f"Missing required column: {col}")
    df = df.dropna(subset=['test_name', 'value', 'reference_range_low', 'reference_range_high'])
    
    # Calculate group min-max for value 
    scaler_dict = {}
    for t_name, group in df.groupby('test_name'):
        v_min, v_max = group['value'].min(), group['value'].max()
        if v_max == v_min: v_max += 0.1 # prevent division by zero
        scaler_dict[t_name] = {'min': float(v_min), 'max': float(v_max)}
        
    df['value_norm'] = df.apply(lambda r: (r['value'] - scaler_dict[r['test_name']]['min']) / (scaler_dict[r['test_name']]['max'] - scaler_dict[r['test_name']]['min']), axis=1)

    # Label encode test_name
    le = LabelEncoder()
    df['test_name_encoded'] = le.fit_transform(df['test_name'])
    
    # Bin patient age
    bins = [0, 18, 40, 60, 150]
    labels = [0, 1, 2, 3] # <18, 18-40, 40-60, 60+
    try:
        df['age_binned'] = pd.cut(pd.to_numeric(df['patient_age'], errors='coerce').fillna(30), bins=bins, labels=labels).astype(int)
    except:
        df['age_binned'] = 1
        
    # Sex
    df['sex_binary'] = df['patient_sex'].apply(lambda x: 1 if str(x).upper() in ['F', 'FEMALE', '1'] else 0)
    
    # Deviation and Outside Range flag
    df['value_deviation'] = (df['value'] - df['reference_range_low']) / (df['reference_range_high'] - df['reference_range_low']).replace(0, 0.1)
    df['is_outside_range'] = ((df['value'] < df['reference_range_low']) | (df['value'] > df['reference_range_high'])).astype(int)

    features = ['test_name_encoded', 'value_norm', 'reference_range_low', 'reference_range_high', 'age_binned', 'sex_binary', 'value_deviation', 'is_outside_range']
    X = df[features]
    y = df['label']

    if len(X) < 10:
        print("Not enough data to train.")
        return

    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
    
    print(">>> INITIALIZING MODELS")
    # Weights for class imbalance approximation
    classes = np.unique(y_train)
    
    xgb_model = xgb.XGBClassifier(n_estimators=300, max_depth=6, learning_rate=0.05, objective='multi:softprob')
    rf_model = RandomForestClassifier(n_estimators=200, class_weight='balanced', max_features='sqrt', random_state=42)
    lgb_model = lgb.LGBMClassifier(num_leaves=63, learning_rate=0.05, class_weight='balanced', random_state=42, n_jobs=1)

    models = [
        ("XGBoost", xgb_model),
        ("Random Forest", rf_model),
        ("LightGBM", lgb_model)
    ]

    best_f1 = -1
    best_name = None
    best_model = None

    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    for name, model in models:
        try:
            print(f"--- Training {name} ---")
            cv_results = cross_validate(model, X_train, y_train, cv=skf, scoring='f1_macro')
            f1_cv = cv_results['test_score'].mean()
            print(f"5-Fold CV F1-Macro: {f1_cv:.4f}")
            
            # Train on full train set
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            test_f1 = f1_score(y_test, y_pred, average='macro')
            
            print(f"Test Accuracy: {accuracy_score(y_test, y_pred):.4f}")
            print(f"Test F1-Macro: {test_f1:.4f}")
            print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
            
            if test_f1 > best_f1:
                best_f1 = test_f1
                best_name = name
                best_model = model
        except Exception as e:
            print(f"Error training {name}: {e}")

    print(f"\n>>> WINNER: {best_name} with F1 {best_f1:.4f}")
    
    # Save artifacts
    joblib.dump(best_model, os.path.join(MODELS_DIR, 'best_model.pkl'))
    joblib.dump(le, os.path.join(MODELS_DIR, 'label_encoder.pkl'))
    
    # Save test minmax map
    with open(os.path.join(MODELS_DIR, 'test_name_map.json'), 'w') as f:
        json.dump(scaler_dict, f, indent=2)
        
    # Metadata
    metadata = {
        "model_type": best_name,
        "f1_macro": float(best_f1),
        "trained_at": datetime.now().isoformat(),
        "total_samples": len(df),
        "features": features
    }
    with open(os.path.join(MODELS_DIR, 'metadata.json'), 'w') as f:
        json.dump(metadata, f, indent=2)
        
    print("Model artifacts saved to /models")

if __name__ == "__main__":
    train_and_compare()
