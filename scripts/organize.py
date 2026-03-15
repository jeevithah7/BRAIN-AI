import os

base_folder = "datasets/raw_reports/pdfs"

for folder in os.listdir(base_folder):
    folder_path = os.path.join(base_folder, folder)

    if os.path.isdir(folder_path):

        for file in os.listdir(folder_path):
            if file.endswith(".pdf"):

                old_pdf = os.path.join(folder_path, file)
                new_pdf = os.path.join(folder_path, f"{folder}.pdf")

                os.rename(old_pdf, new_pdf)

                print(f"{file} → {folder}.pdf")