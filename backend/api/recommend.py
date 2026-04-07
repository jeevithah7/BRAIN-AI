import os
import json
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()
anthropic_key = os.getenv("ANTHROPIC_API_KEY")

def generate_recommendations(abnormals: list) -> dict:
    if not abnormals:
        return {
            "foods_to_eat": [], "foods_to_avoid": [], "lifestyle_changes": [],
            "supplements": [], "when_to_see_doctor": "No immediate concerns.",
            "urgency_level": "low", "summary": "All parameters are within normal ranges."
        }
        
    system_prompt = """You are a clinical nutritionist and health coach AI. You receive a patient's abnormal blood test results and generate personalized, evidence-based health recommendations. Return ONLY a JSON object with these keys:
{
  "foods_to_eat": [{"item": "str", "reason": "str", "emoji": "str"}],
  "foods_to_avoid": [{"item": "str", "reason": "str", "emoji": "str"}],
  "lifestyle_changes": [{"action": "str", "frequency": "str", "reason": "str"}],
  "supplements": [{"name": "str", "dosage": "str", "reason": "str", "note": "str"}],
  "when_to_see_doctor": "str",
  "urgency_level": "low" | "medium" | "high" | "critical",
  "summary": "str (2 sentences max)"
}"""

    try:
        client = Anthropic(api_key=anthropic_key)
        response = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1200,
            system=system_prompt,
            messages=[{"role": "user", "content": f"Patient has these abnormal values:\n{json.dumps(abnormals)}"}]
        )
        raw_val = response.content[0].text
        if '```json' in raw_val: raw_val = raw_val.split('```json')[1].split('```')[0]
        elif '```' in raw_val: raw_val = raw_val.split('```')[1].split('```')[0]
        return json.loads(raw_val)
    except Exception as e:
        print(f"Error generating recommendations: {e}")
        return {}
