import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, ArrowRight, Check, Type, Edit3, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function UploadScreen() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewObj, setPreviewObj] = useState(null);
  const [activeTab, setActiveTab] = useState('OCR'); // 'OCR' | 'Manual'
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ fullName: '', gender: '', age: '', reportDate: '', reportType: '' });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      if (selected.type.startsWith('image/')) setPreviewObj(URL.createObjectURL(selected));
      else setPreviewObj(null);
      
      // Flash animation happens via state change + CSS
      
      if (activeTab === 'OCR') {
         runOCRSimulation();
      }
    }
  }, [activeTab]);

  const runOCRSimulation = () => {
     setIsTyping(true);
     setFormData({ fullName: '', gender: '', age: '', reportDate: '', reportType: '' });
     const target = { fullName: 'James Johnson', gender: 'Male', age: '34', reportDate: '2024-06-10', reportType: 'Blood Test' };
     
     let step = 0;
     const interval = setInterval(() => {
        step++;
        if (step === 1) setFormData(prev => ({ ...prev, fullName: target.fullName.substring(0, 5) }));
        if (step === 2) setFormData(prev => ({ ...prev, fullName: target.fullName, gender: target.gender }));
        if (step === 3) setFormData(prev => ({ ...prev, age: target.age, reportDate: target.reportDate }));
        if (step === 4) {
           setFormData(target);
           setIsTyping(false);
           clearInterval(interval);
        }
     }, 400);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
    maxFiles: 1
  });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const isFormValid = file && formData.fullName && formData.gender && formData.age && formData.reportDate && formData.reportType;

  const handleAnalyze = () => {
    if (isFormValid && !isLoading) {
      setIsLoading(true);
      // Let the morph animation play for 600ms before routing
      setTimeout(() => navigate('/loading'), 600);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex-grow flex flex-col max-w-4xl mx-auto w-full pb-12 mt-4">
      
      {/* Stepper with glowing ring pulse on Active Step */}
      <div className="flex items-center justify-between w-full mb-10 px-8 relative">
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10"></div>
        <div className="flex flex-col items-center bg-[#F8FAFC] px-2 relative z-10">
           <div className="w-8 h-8 rounded-full bg-[#3B6FE8] text-white flex items-center justify-center font-bold text-sm animate-[pulseRing_2s_infinite]">1</div>
           <span className="text-xs font-bold text-[#0F172A] mt-2">Upload</span>
        </div>
        <div className="flex flex-col items-center bg-[#F8FAFC] px-2 relative z-10">
           <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-sm">2</div>
           <span className="text-xs font-semibold text-slate-400 mt-2">Review</span>
        </div>
        <div className="flex flex-col items-center bg-[#F8FAFC] px-2 relative z-10">
           <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-sm">3</div>
           <span className="text-xs font-semibold text-slate-400 mt-2">Analysis</span>
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col gap-10 overflow-hidden">
        
        {/* Upload Zone */}
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Upload Medical Report</h2>
          {!file ? (
            <div 
              {...getRootProps()} 
              className={clsx(
                "w-full py-16 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
                isDragActive ? "border-[#3B6FE8] border-solid bg-blue-50/50" : "border-slate-300 border-dashed hover:border-[#3B6FE8] hover:border-solid hover:bg-slate-50"
              )}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <UploadCloud className={clsx("w-8 h-8", isDragActive ? "text-[#3B6FE8]" : "text-slate-500")} />
              </div>
              <p className="text-lg font-bold text-[#0F172A] mb-2 pointer-events-none">Drop your report here or click to browse</p>
              <div className="flex gap-2 mt-3 pointer-events-none">
                 <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-semibold tracking-wider">PDF</motion.span>
                 <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-semibold tracking-wider">PNG</motion.span>
                 <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-semibold tracking-wider">JPG / JPEG</motion.span>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full p-6 rounded-2xl border border-emerald-200 bg-emerald-50/30 flex items-center justify-between shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center border border-emerald-100 overflow-hidden shrink-0">
                  {previewObj ? <img src={previewObj} alt="Preview" className="w-full h-full object-cover" /> : <FileText className="w-6 h-6 text-emerald-500" />}
                </div>
                <div className="max-w-[200px] sm:max-w-xs md:max-w-md overflow-hidden">
                  <p className="font-bold text-[#0F172A] truncate">{file.name}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1 font-medium">
                    <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-bold"><Check className="w-3.5 h-3.5"/> Uploaded</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setFile(null); setPreviewObj(null); setFormData({fullName:'',gender:'',age:'',reportDate:'',reportType:''});}} className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors">
                Remove
              </button>
            </motion.div>
          )}
        </div>

        {/* Tabbed Parameters Section */}
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">Enter Patient Details</h2>
          
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 p-1">
             <button onClick={() => setActiveTab('OCR')} className={clsx("flex-1 py-3 text-sm font-bold rounded-xl transition-all relative", activeTab === 'OCR' ? "text-[#3B6FE8] bg-blue-50/50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50")}>
                <span className="relative z-10 flex items-center justify-center gap-2"><Type className="w-4 h-4"/> Scan Report (OCR)</span>
             </button>
             <button onClick={() => setActiveTab('Manual')} className={clsx("flex-1 py-3 text-sm font-bold rounded-xl transition-all relative", activeTab === 'Manual' ? "text-[#3B6FE8] bg-blue-50/50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50")}>
                <span className="relative z-10 flex items-center justify-center gap-2"><Edit3 className="w-4 h-4"/> Enter Manually</span>
             </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              
              {activeTab === 'OCR' && (
                <div className="mb-6 bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                   <Info className="w-5 h-5 text-[#3B6FE8] shrink-0 mt-0.5" />
                   <div>
                     <p className="text-sm text-[#0F172A] font-semibold">AI Extraction Active</p>
                     <p className="text-xs text-slate-600 mt-1 font-medium">We'll auto-extract Name, Age, Gender & Report Type from your report. You can seamlessly correct any misread values inline below.</p>
                   </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                 {/* Visual typewriter overlay */}
                 {isTyping && <div className="absolute inset-0 z-20 bg-white/40 cursor-wait"></div>}

                 {[
                    { label: "Full Name", name: "fullName", type: "text", pl: "e.g. James Johnson" },
                    { label: "Age", name: "age", type: "number", pl: "e.g. 34" },
                    { label: "Report Date", name: "reportDate", type: "date" }
                 ].map((field, idx) => (
                    <motion.div key={field.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: activeTab === 'Manual' ? idx * 0.1 : 0 }} className="flex flex-col gap-2">
                       <label className="text-sm font-bold text-[#0F172A]">{field.label}</label>
                       <input 
                          type={field.type} name={field.name} value={formData[field.name]} onChange={handleInputChange} placeholder={field.pl} 
                          className={clsx("px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-[#3B6FE8] transition-shadow duration-300 placeholder:text-slate-400 text-slate-700", formData[field.name] && activeTab === 'OCR' ? "ring-2 ring-emerald-400/20" : "")} 
                          style={{ boxShadow: "0 0 0 transparent" }}
                          onFocus={(e) => e.target.style.boxShadow = "0 0 12px rgba(59,111,232,0.3)"}
                          onBlur={(e) => e.target.style.boxShadow = "none"}
                       />
                    </motion.div>
                 ))}

                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0F172A]">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-[#3B6FE8] transition-shadow text-slate-700" onFocus={(e) => e.target.style.boxShadow = "0 0 12px rgba(59,111,232,0.3)"} onBlur={(e) => e.target.style.boxShadow = "none"}>
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                 </motion.div>

                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-[#0F172A]">Report Type</label>
                    <select name="reportType" value={formData.reportType} onChange={handleInputChange} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:bg-white focus:border-[#3B6FE8] text-slate-700 transition-shadow" onFocus={(e) => e.target.style.boxShadow = "0 0 12px rgba(59,111,232,0.3)"} onBlur={(e) => e.target.style.boxShadow = "none"}>
                      <option value="" disabled>Select Report Type</option>
                      <option value="Blood Test">Blood Test</option>
                      <option value="X-Ray">X-Ray</option>
                      <option value="MRI">MRI</option>
                      <option value="General">General Checkup</option>
                    </select>
                 </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {activeTab === 'OCR' && (
             <div className="mt-4 flex justify-end">
                <button onClick={() => setActiveTab('Manual')} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-4">Skip OCR, enter manually</button>
             </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button 
            onClick={handleAnalyze}
            disabled={!isFormValid || isLoading || isTyping}
            className={clsx(
              "flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all relative overflow-hidden active:scale-95",
              isFormValid && !isLoading
                ? "bg-[#0F172A] text-white hover:bg-[#1A2E4C] hover:shadow-[0_0_15px_rgba(15,23,42,0.3)] cursor-pointer hover:-translate-y-0.5" 
                : isLoading 
                ? "bg-[#3B6FE8] text-white" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            )}
            style={{ minWidth: "200px" }}
          >
            {isLoading ? (
               <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
               <>Analyze Report <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
