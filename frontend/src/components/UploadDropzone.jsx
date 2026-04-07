import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileType2 } from 'lucide-react';
import { clsx } from "clsx";
import axios from 'axios';

// Create an axios instance pointing to the FastAPI backend
// In development, you'd proxy this. For now, since they run on localhost, we'll hardcode or assume proxy.
// Vite proxy needs to be set up, or we use full URL.
const api = axios.create({ baseURL: 'http://localhost:8000/api' });

export default function UploadDropzone({ setResults, setIsUploading, setRecommendations }) {
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setIsUploading(true);
    setError(null);

    try {
      // 1. Upload File for OCR
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const extractedText = uploadRes.data.extracted_text;
      if (!extractedText) throw new Error("No text could be extracted from the file.");

      // 2. Transmit to Claude for Analysis
      const analyseRes = await api.post('/analyse', { text: extractedText });
      const results = analyseRes.data.results;
      
      if (!results || results.length === 0) throw new Error("Analysis failed. Unable to identify blood parameters.");

      // Optional step: Use local ML model to cross-validate (we just have dummy here, so skip or log)
      // Example: const pred = await api.post('/predict', {test_val: results[0].value});
      
      // 3. Request Recommendations from Claude based on abnormal values
      const abnormal = results.filter(r => r.status !== 'NORMAL');
      let recs = null;
      if (abnormal.length > 0) {
        const recsRes = await api.post('/recommend', { abnormal_values: abnormal });
        recs = recsRes.data.recommendations;
      }

      setRecommendations(recs);
      setResults(results);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "An unexpected error occurred during processing.");
    } finally {
      setIsUploading(false);
    }
  }, [setIsUploading, setResults, setRecommendations]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024 // 20 MB
  });

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-20 animate-in fade-in zoom-in-95 duration-500">
      <div 
        {...getRootProps()} 
        className={clsx(
          "w-full p-16 rounded-3xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center transition-all bg-white relative overflow-hidden",
          isDragActive ? "border-emerald-500 bg-emerald-50" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50",
          error ? "border-red-400 bg-red-50" : ""
        )}
      >
        <input {...getInputProps()} />
        
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6 shadow-sm">
          <UploadCloud className={clsx("w-10 h-10", isDragActive ? "text-emerald-500" : "text-slate-500")} />
        </div>
        
        <h3 className="text-xl font-bold tracking-tight text-slate-800 text-center mb-2">
          {isDragActive ? "Drop your report here" : "Drag & drop your report here"}
        </h3>
        
        <p className="text-slate-500 text-center max-w-sm mb-6">
          We extract values automatically using OCR and analyze them against medical reference ranges using AI.
        </p>

        <button className="bg-slate-900 text-white font-medium py-3 px-8 rounded-full shadow-md hover:bg-slate-800 transition-colors shadow-slate-900/10">
          Browse Files
        </button>
        
        <div className="flex items-center space-x-4 mt-8 text-xs text-slate-400 font-medium tracking-wide">
          <div className="flex items-center"><FileType2 className="w-4 h-4 mr-1" /> PDF, JPG, PNG</div>
          <span>•</span>
          <div>Max 20MB</div>
          <span>•</span>
          <div>Secure & Private</div>
        </div>
        
        {error && (
          <div className="absolute bottom-0 inset-x-0 bg-red-100 text-red-700 py-3 px-6 text-sm flex justify-center text-center font-medium border-t border-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
