# B.R.A.I.N-AI

**Blood Report Analysis & Interpretation Node**

B.R.A.I.N-AI is an AI-driven system designed to extract, structure, and analyze clinical blood test reports automatically.
The project converts raw blood report PDFs into structured medical datasets, enabling machine learning models to identify abnormalities, biomarker trends, and clinical insights.

This repository provides tools for:

* Document preprocessing
* Medical data annotation
* Structured dataset generation
* Biomarker interpretation pipelines
* Future ML model training for clinical report understanding

---

# Project Overview

Clinical blood reports often exist as unstructured PDF documents.
B.R.A.I.N-AI transforms these reports into **machine-readable structured data**.

The system focuses on extracting information such as:

* Patient information
* Test names
* Test values
* Units
* Reference ranges
* Abnormal indicators

This structured representation allows automated analysis of laboratory results.

---

# Pipeline Architecture

The workflow of B.R.A.I.N-AI follows this pipeline:

```
Blood Report PDF
        │
        ▼
PDF → Image Conversion
        │
        ▼
Annotation (Label Studio)
        │
        ▼
Structured Dataset Generation
        │
        ▼
Biomarker Analysis Engine
        │
        ▼
Clinical Insights / ML Models
```

---

# Repository Structure

```
BRAIN-AI
│
├── data
│   └── biomarker_master_list.csv        # reference biomarker database
│
├── datasets
│   ├── raw_reports                      # original reports
│   └── annotations                      # annotation outputs
│
├── scripts
│   ├── pdf_to_images.py                 # converts PDFs to images
│   ├── generate_tasks.py                # creates Label Studio tasks
│   └── organize.py                      # organizes dataset structure
│
├── tasks.json                           # annotation task definitions
│
├── .gitignore
└── README.md
```

---

# Dataset Annotation

Medical report annotation is performed using **Label Studio**.

Annotated entities include:

| Entity          | Description                  |
| --------------- | ---------------------------- |
| Patient_Name    | Name of the patient          |
| Age             | Patient age                  |
| Gender          | Patient gender               |
| Report_Date     | Date of report               |
| Test_Name       | Name of laboratory test      |
| Test_Value      | Measured value               |
| Unit            | Measurement unit             |
| Reference_Range | Normal biological range      |
| Abnormal_Flag   | Indicator of abnormal values |

This labeled dataset enables future **document AI models** to automatically extract medical parameters.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/jeevithah7/BRAIN-AI.git
cd BRAIN-AI
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate environment:

**Windows**

```bash
venv\Scripts\activate
```

**Linux / Mac**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# Usage

## Convert PDFs to images

```bash
python scripts/pdf_to_images.py
```

## Generate annotation tasks

```bash
python scripts/generate_tasks.py
```

## Start Label Studio

```bash
label-studio start
```

Import `tasks.json` into Label Studio to begin annotation.

---

# Biomarker Knowledge Base

The repository includes a **biomarker reference dataset** containing:

* Short biomarker name
* Panel category
* Units
* Male reference range
* Female reference range
* Clinical description

This dataset enables automated interpretation of laboratory results.

---

# Future Work

Planned enhancements include:

* Automated table detection using **LayoutLM / Document AI**
* Clinical anomaly detection models
* Biomarker trend analysis
* Physician decision support system
* Web interface for report upload and interpretation

---

# License

This project is licensed under the **Apache 2.0 License**.

---

# Author

**Jeevitha H**
