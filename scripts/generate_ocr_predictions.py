import os
import json
import cv2
import pytesseract
import traceback

print("=== OCR SCRIPT STARTED ===")

try:
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    root = "datasets/raw_reports/pdfs"

    tasks = []
    total_images = 0

    for report in os.listdir(root):

        report_folder = os.path.join(root, report)

        if not os.path.isdir(report_folder):
            continue

        print(f"Processing folder: {report}")

        for file in os.listdir(report_folder):

            if file.endswith(".png"):

                total_images += 1
                image_path = os.path.join(report_folder, file)

                print(f"Reading image: {image_path}")

                try:
                    img = cv2.imread(image_path)

                    if img is None:
                        print("⚠️ Failed to load image")
                        continue

                    h, w, _ = img.shape

                    print("Running OCR...")

                    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

                    results = []

                    for i in range(len(data["text"])):

                        text = data["text"][i].strip()

                        if text == "":
                            continue

                        x = data["left"][i] / w * 100
                        y = data["top"][i] / h * 100
                        width = data["width"][i] / w * 100
                        height = data["height"][i] / h * 100

                        results.append({
                            "from_name": "label",
                            "to_name": "image",
                            "type": "rectanglelabels",
                            "value": {
                                "x": x,
                                "y": y,
                                "width": width,
                                "height": height,
                                "rotation": 0,
                                "rectanglelabels": ["Test_Name"]
                            }
                        })

                    tasks.append({
                        "data": {
                            "image": f"/data/local-files/?d=datasets/raw_reports/pdfs/{report}/{file}"
                        },
                        "predictions": [{"result": results}]
                    })

                    print(f"✔ OCR done for {file}")

                except Exception as img_error:
                    print("❌ Error processing image:")
                    traceback.print_exc()

    print("Writing JSON output...")

    with open("ocr_tasks.json", "w") as f:
        json.dump(tasks, f, indent=2)

    print("=== DONE ===")
    print("Total images processed:", total_images)

except Exception:
    print("❌ Script crashed:")
    traceback.print_exc()