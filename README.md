# BrainAI - Blood Report Analyser

BrainAI is a sophisticated, full-stack clinical decision support application designed to parse, analyze, and provide actionable insights from medical blood reports. It leverages Optical Character Recognition (OCR), Machine Learning (ML), and Large Language Models (LLMs) to automatically detect anomalies in blood biomarkers and generate personalized lifestyle and dietary recommendations.

## 🚀 Features

* **Intelligent Document Parsing:** Extracts key blood biomarkers from uploaded physical or digital reports (PDFs, Images) using an integrated OCR pipeline.
* **Machine Learning Analysis:** Uses trained ML models (Scikit-learn, XGBoost, LightGBM) to classify biomarker values into Normal, Borderline, or Abnormal categories by weighing them against clinical reference ranges, patient age, and sex.
* **AI-Powered Recommendations:** Integrates with Anthropic's Claude API to summarize critical metrics and provide targeted nutritional and lifestyle guidance.
* **Interactive Dashboard:** Beautiful React-based frontend providing rich visualizations of historical health data and report metrics using Recharts and Framer Motion.
* **Persistent Storage:** Cloud database synchronization powered by Supabase for managing patient histories and ML analysis results securely.

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** TailwindCSS v4, clsx, tailwind-merge
- **UI & Animations:** Framer Motion, Lucide-React
- **Visualization:** Recharts
- **Routing:** React Router v7

### Backend
- **Framework:** FastAPI (Python 3)
- **OCR Pipeline:** PyTesseract, OpenCV, PyMuPDF (fitz), Google Cloud Vision
- **Machine Learning:** Scikit-learn, XGBoost, LightGBM, Pandas, Imbalanced-learn
- **AI Integration:** Anthropic API (Claude)
- **Database:** Supabase (PostgreSQL)

## 📁 Project Structure

```text
brainai/
├── backend/                  # FastAPI Application
│   ├── api/                  # API Routers, Claude Integration, and Endpoints
│   ├── db/                   # Supabase client configurations
│   ├── ml/                   # ML Training and Prediction scripts
│   ├── ocr/                  # Optical Character Recognition logic
│   └── prompts/              # System prompts for LLMs
├── frontend/                 # React Vite Application
│   ├── public/
│   └── src/                  
│       ├── components/       # Reusable UI elements (Dashboards, Tables, Cards)
│       ├── pages/            # Core application screens (Upload, Preview, Dashboard)
│       └── data/             # Frontend utility objects
├── venv/                     # Python Virtual Environment
└── .gitignore                # Ignored files (node_modules, venv, pycache, etc.)
```

## 💻 Getting Started (Local Development)

If you're studying this codebase or contributing to it, you can run the full stack locally.

### Prerequisites
* **Node.js**: (v18+)
* **Python**: (3.9+)
* **Supabase Account**: (For database configuration)
* **Anthropic API Key**: (For AI integration)
* Tesseract OCR installed on your system.

### 1. Setup the Backend

```bash
cd backend
# Create and activate a virtual environment if you don't have one
python -m venv ../venv
# On Windows
..\venv\Scripts\activate
# Install necessary packages (including supabase, fastapi, uvicorn, opencv-python, pytesseract, scikit-learn, xgboost, lightgbm, etc.)
pip install supabase python-dotenv pydantic fastapi uvicorn anthropic joblib pandas numpy scikit-learn xgboost lightgbm pymupdf opencv-python pytesseract google-cloud-vision imbalanced-learn

# Create a .env file inside backend/ and add your credentials
# SUPABASE_URL=...
# SUPABASE_KEY=...
# ANTHROPIC_API_KEY=...

# Start the FastAPI server
python -m uvicorn api.main:app --reload --port 8000
```
> The API will be available at [http://localhost:8000](http://localhost:8000). You can visit `/docs` for the interactive Swagger UI.

### 2. Setup the Frontend

```bash
cd frontend
# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
> The frontend application will run on [http://localhost:5173](http://localhost:5173).

## 🗃️ Database Schema

The system uses the following core conceptual tables in Supabase:
- `patients`: Stores patient demographic identifiers (Name, Age, Sex).
- `reports`: Tracks individual uploaded report files (File URL, timestamps).
- `blood_results`: Stores individual test metrics parsed from the report alongside the ML predicted status.
- `recommendations`: Stores AI-generated JSON recommendations bound to a specific report.

## 🤝 Contributing

This project is aimed at assisting physiological analysis. When adding new medical capabilities or models, ensure appropriate evaluation against verified clinical datasets and retain mock capability (as currently integrated) for local test environments.
