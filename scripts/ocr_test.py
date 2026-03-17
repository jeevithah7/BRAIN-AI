import cv2
import pytesseract
import time

print("========== OCR TEST SCRIPT STARTED ==========")

start_time = time.time()

try:
    print("Setting Tesseract path...")
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    image_path = "datasets/raw_reports/pdfs/report_1/page_1.png"
    print(f"Loading image: {image_path}")

    img = cv2.imread(image_path)

    if img is None:
        print("ERROR: Image could not be loaded.")
        exit()

    print("Image loaded successfully.")

    print("Starting OCR extraction...")
    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

    print("OCR completed. Drawing bounding boxes...")

    total_words = 0

    for i in range(len(data["text"])):

        text = data["text"][i].strip()

        if text != "":
            total_words += 1

            x = data["left"][i]
            y = data["top"][i]
            w = data["width"][i]
            h = data["height"][i]

            cv2.rectangle(img, (x, y), (x+w, y+h), (0,255,0), 2)
            cv2.putText(img, text, (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0,255,0), 1)

    print(f"Total OCR words detected: {total_words}")

    print("Displaying OCR result window...")
    cv2.imshow("OCR Result", img)
    cv2.waitKey(0)

    print("Closing window...")
    cv2.destroyAllWindows()

except Exception as e:
    print("ERROR occurred during OCR execution:")
    print(e)

end_time = time.time()

print("========== OCR TEST SCRIPT FINISHED ==========")
print(f"Total execution time: {round(end_time - start_time, 2)} seconds")