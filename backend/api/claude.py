import os
import json
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

def analyze_blood_report(ocr_text: str) -> list:
    system_prompt = """You are a clinical lab report analyser. Given raw OCR text from a blood 
report, extract all test parameters, their values, units, and reference ranges. Return a structured JSON array. For each parameter, label it as NORMAL, HIGH, LOW, or CRITICAL. Flag any value needing immediate medical attention as URGENT."""
    
    try:
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=2500,
            system=system_prompt,
            messages=[
                {"role": "user", "content": f"Here is the raw OCR text. Please return only the structured JSON array.\n\n{ocr_text}"}
            ]
        )
        
        content = response.content[0].text
        json_str = content[content.find('['):content.rfind(']')+1]
        return json.loads(json_str)
    except Exception as e:
        print(f"Error parsing Claude response: {e}")
        return []

def generate_recommendations(abnormal_values: list) -> dict:
    system_prompt = """You are a medical assistant. Based on these abnormal blood values, generate personalised dietary and lifestyle recommendations. Include: foods to eat, foods to avoid, lifestyle changes, and when to see a doctor. Be specific, evidence-based, and easy to understand for a non-medical person. Return valid JSON explicitly matching exactly this structure: {"foods_to_eat": ["..."], "foods_to_avoid": ["..."], "lifestyle": ["..."], "when_to_see_doctor": "..."}"""
    
    try:
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1500,
            system=system_prompt,
            messages=[
                {"role": "user", "content": f"Abnormal values:\n{json.dumps(abnormal_values)}"}
            ]
        )
        
        content = response.content[0].text
        json_str = content[content.find('{'):content.rfind('}')+1]
        return json.loads(json_str)
    except Exception as e:
        return {"error": "Failed to parse recommendations: " + str(e)}
