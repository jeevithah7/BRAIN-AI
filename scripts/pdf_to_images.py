import os
from pdf2image import convert_from_path

reports_folder = "datasets/raw_reports/pdfs"

poppler_path = r"C:\Users\jeevitha\AppData\Local\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin"

for report_folder in os.listdir(reports_folder):

    report_path = os.path.join(reports_folder, report_folder)

    if os.path.isdir(report_path):

        for file in os.listdir(report_path):

            if file.endswith(".pdf"):

                pdf_path = os.path.join(report_path, file)

                pages = convert_from_path(
                    pdf_path,
                    dpi=300,
                    poppler_path=poppler_path
                )

                for i, page in enumerate(pages):

                    image_name = f"page_{i+1}.png"
                    image_path = os.path.join(report_path, image_name)

                    page.save(image_path)

                    print(f"Saved {image_path}")