import cv2
import pytesseract
import os
import json
import time
import traceback

print("========== RUN OCR SCRIPT STARTED ==========")

start_time = time.time()

try:

    print("Setting Tesseract path...")
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    root = "datasets/raw_reports/pdfs"
    print(f"OCR root directory: {root}")

    # AUTOMATICALLY CREATE OUTPUT DIRECTORY
    output_dir = "datasets/processed"
    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(output_dir, "ocr_words.json")

    data = []
    total_images = 0
    total_words = 0

    for report in os.listdir(root):

        folder = os.path.join(root, report)

        if not os.path.isdir(folder):
            continue

        print(f"\nProcessing report folder: {report}")

        for file in os.listdir(folder):

            if file.endswith(".png"):

                img_path = os.path.join(folder, file)
                total_images += 1

                print(f"Reading image: {img_path}")

                try:

                    img = cv2.imread(img_path)

                    if img is None:
                        print("WARNING: Image failed to load.")
                        continue

                    h, w, _ = img.shape

                    print("Running OCR...")

                    ocr = pytesseract.image_to_data(
                        img, output_type=pytesseract.Output.DICT
                    )

                    words = []
                    word_count = 0

                    for i in range(len(ocr["text"])):

                        text = ocr["text"][i].strip()

                        if text == "":
                            continue

                        word_count += 1
                        total_words += 1

                        words.append({
                            "text": text,
                            "x": ocr["left"][i] / w * 100,
                            "y": ocr["top"][i] / h * 100,
                            "width": ocr["width"][i] / w * 100,
                            "height": ocr["height"][i] / h * 100
                        })

                    print(f"OCR words detected: {word_count}")

                    data.append({
                        "image": img_path.replace("\\", "/"),
                        "words": words
                    })

                except Exception:
                    print("ERROR processing image:")
                    traceback.print_exc()

    print("\nWriting OCR results to JSON file...")

    with open(output_path, "w") as f:
        json.dump(data, f, indent=2)

    print(f"OCR data saved to: {output_path}")

except Exception:
    print("FATAL ERROR during OCR pipeline:")
    traceback.print_exc()

end_time = time.time()

print("\n========== RUN OCR SCRIPT FINISHED ==========")
print(f"Total images processed: {total_images}")
print(f"Total OCR words detected: {total_words}")
print(f"Total execution time: {round(end_time - start_time, 2)} seconds")