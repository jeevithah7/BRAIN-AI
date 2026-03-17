import json
import os
import cv2

print("========== GENERATING LABEL STUDIO TASKS ==========")

input_file = "datasets/processed/ocr_words.json"
output_file = "datasets/processed/ocr_tasks.json"

os.makedirs("datasets/processed", exist_ok=True)

with open(input_file) as f:
    ocr_data = json.load(f)

tasks = []

for item in ocr_data:

    image_path = item["image"]
    words = item["words"]

    # FIX: convert path BEFORE using it
    image_path_fixed = image_path.replace("\\", "/")

    img = cv2.imread(image_path)
    if img is None:
        print(f"⚠️ Skipping image: {image_path}")
        continue

    h, w, _ = img.shape

    results = []

    for word in words:

        results.append({
            "from_name": "label",
            "to_name": "image",
            "type": "rectanglelabels",
            "original_width": w,
            "original_height": h,
            "image_rotation": 0,
            "value": {
                "x": word["x"],
                "y": word["y"],
                "width": word["width"],
                "height": word["height"],
                "rotation": 0,
                "rectanglelabels": ["Test_Name"]
            }
        })

    tasks.append({
        "data": {
            "image": "/data/local-files/?d=" + image_path_fixed   # ✅ NO f-string here
        },
        "annotations": [
            {
                "result": results
            }
        ]
    })

with open(output_file, "w") as f:
    json.dump(tasks, f, indent=2)

print("Tasks generated:", len(tasks))
print("Saved to:", output_file)
print("========== FINISHED ==========")