import os
import json

root = "datasets/raw_reports/pdfs"
tasks = []

for report in os.listdir(root):
    report_path = os.path.join(root, report)

    if os.path.isdir(report_path):

        for file in os.listdir(report_path):

            if file.endswith(".png"):

                path = f"/data/local-files/?d={root}/{report}/{file}"

                tasks.append({
                    "image": path
                })

with open("tasks.json", "w") as f:
    json.dump(tasks, f, indent=2)

print(f"{len(tasks)} tasks created")