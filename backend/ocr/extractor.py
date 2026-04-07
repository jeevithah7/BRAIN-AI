import fitz  # PyMuPDF
import cv2
import pytesseract

def extract_text_from_pdf(pdf_path: str) -> str:
    text = ""
    try:
        with fitz.open(pdf_path) as doc:
            for page in doc:
                text += page.get_text()
    except Exception as e:
        print(f"Error reading PDF {pdf_path}: {e}")
    return text

def extract_text_from_image(image_path: str) -> str:
    try:
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Could not read image from {image_path}")
        
        # Preprocessing: Convert to grayscale, denoise, and apply thresholding
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray = cv2.medianBlur(gray, 3)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        text = pytesseract.image_to_string(thresh)
        return text
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        return ""

def extract_text_from_file(file_path: str, mime_type: str) -> str:
    if "pdf" in mime_type.lower():
        return extract_text_from_pdf(file_path)
    elif "image" in mime_type.lower():
        return extract_text_from_image(file_path)
    else:
        raise ValueError(f"Unsupported file type: {mime_type}")
