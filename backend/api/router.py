import os
import shutil
from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ocr.extractor import extract_text_from_file
from api.claude import analyze_blood_report, generate_recommendations
from ml.predict import predict_status

router = APIRouter()

# Schema Definitions
class AnalysisResult(BaseModel):
    test_name: str
    value: float
    unit: str
    reference_range: str
    status: str # NORMAL, BORDERLINE, HIGH, LOW, CRITICAL

class RecommendationRequest(BaseModel):
    abnormal_values: List[dict]

@router.post("/upload")
async def upload_report(file: UploadFile = File(...)):
    """ Endpoint to upload PDF/image, extract text via OCR, and return raw text/data. """
    # Save file to a temporary location
    temp_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'data')
    os.makedirs(temp_dir, exist_ok=True)
    temp_file_path = os.path.join(temp_dir, file.filename)
    
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        mime_type = file.content_type
        extracted_text = extract_text_from_file(temp_file_path, mime_type)
        return {"filename": file.filename, "extracted_text": extracted_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

@router.post("/analyse")
async def analyse_report(data: dict):
    """ Endpoint to send OCR text to Claude and return structured JSON. """
    if "text" not in data:
        raise HTTPException(status_code=400, detail="Missing 'text' key")
    results = analyze_blood_report(data["text"])
    return {"results": results}

@router.post("/predict")
async def predict_ml(data: dict):
    """ Endpoint to run fast offline ML validation. """
    val = float(data.get("test_val", 0.0))
    age = int(data.get("age", 30))
    pred_class = predict_status(val, age)
    status_map = {0: "NORMAL", 1: "LOW", 2: "HIGH", 3: "CRITICAL"}
    return {
        "test_val": val, 
        "predicted_class": pred_class, 
        "status": status_map.get(pred_class, "UNKNOWN")
    }

@router.post("/recommend")
async def get_recommendations(req: RecommendationRequest):
    """ Endpoint to get dietary and lifestyle recommendations from Claude. """
    recs = generate_recommendations(req.abnormal_values)
    return {"recommendations": recs}
