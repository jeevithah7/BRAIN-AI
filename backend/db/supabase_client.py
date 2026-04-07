from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
key: str = os.getenv("SUPABASE_SERVICE_KEY", "your_service_role_key")
supabase: Client = create_client(url, key)
