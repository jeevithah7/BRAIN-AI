import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, AlertCircle, ArrowRight, Info, Zap, Activity } from 'lucide-react';
import { clsx } from 'clsx';

const mockData = [
  { id: 1, name: "Hemoglobin", value: 10.2, range: "12.0 - 15.5", unit: "g/dL", status: "Abnormal", conf: 98, desc: "Protein in red blood cells that carries oxygen. Low suggests anemia." },
  { id: 2, name: "Potassium", value: 5.6, range: "3.5 - 5.0", unit: "mEq/L", status: "Abnormal", conf: 92, desc: "Important mineral for nerve and muscle function. High can affect the heart." },
  { id: 3, name: "Glucose (Fasting)", value: 105, range: "70 - 99", unit: "mg/dL", status: "Borderline", conf: 95, desc: "Blood sugar levels; elevated indicates prediabetes risk." },
  { id: 4, name: "Cholesterol", value: 160, range: "< 200", unit: "mg/dL", status: "Normal", conf: 99, desc: "Waxy fat-like substance found in all cells. Currently in healthy range." },
  { id: 5, name: "WBC Count", value: 6.5, range: "4.5 - 11.0", unit: "10^9/L", status: "Normal", conf: 96, desc: "White blood cells count. Indicates healthy immune system." }
];

export default function FindingsPreview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate AI extraction loading delay
    const timer = setTimeout(() => {
      // Sort: Abnormal first, then Borderline, then Normal
      const sorted = [...mockData].sort((a, b) => {
         const rank = { "Abnormal": 1, "Borderline": 2, "Normal": 3 };
         return rank[a.status] - rank[b.status];
      });
      setData(sorted);
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-grow flex flex-col w-full max-w-5xl mx-auto pb-12 mt-4 animate-in fade-in duration-500">
      
      {/* Stepper */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-10 px-8 relative">
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10 flex">
           <div className="w-1/2 bg-[#3B6FE8] h-full"></div>
           <div className="w-1/2 bg-slate-200 h-full"></div>
        </div>
        <div className="flex flex-col items-center bg-[#F8FAFC] px-2 relative z-10">
           <div className="w-8 h-8 rounded-full bg-[#3B6FE8] text-white flex items-center justify-center font-bold text-sm shadow-md">
             <CheckCircle2 className="w-5 h-5 text-white" />
           </div>
           <span className="text-xs font-bold text-[#0F172A] mt-2">Upload</span>
        </div>
        <div className="flex flex-col items-center bg-[#F8FAFC] px-2 relative z-10">
           <div className="w-8 h-8 rounded-full bg-[#3B6FE8] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-[#F8FAFC]">2</div>
           <span className="text-xs font-bold text-[#0F172A] mt-2">Review</span>
        </div>
        <div className="flex flex-col items-center bg-[#F8FAFC] px-2 relative z-10">
           <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-sm">3</div>
           <span className="text-xs font-semibold text-slate-400 mt-2">Analysis</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[24px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] min-h-[500px]">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#3B6FE8] border-t-transparent animate-spin"></div>
            <Activity className="absolute inset-0 m-auto text-[#3B6FE8] w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-[#0F172A]">AI is analyzing your report...</h3>
          <p className="text-slate-500 mt-2 text-lg">Extracting biomarkers and comparing against clinical ranges</p>
          
          <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
             <div className="h-full bg-gradient-to-r from-[#3B6FE8] to-[#F5A623] w-1/2 animate-[progress_1s_ease-in-out_infinite_alternate]"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700">
          {/* Patient Info Summary Card */}
          <div className="bg-white rounded-2xl py-3 px-6 shadow-sm border border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-[#0F172A] font-bold flex items-center justify-center">JJ</div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">James Johnson</p>
                <p className="text-xs text-slate-500 font-medium">34 • Male</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Report Date</span>
                <span className="text-[#0F172A] font-semibold">Jun 10, 2024</span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Report Type</span>
                <span className="text-[#0F172A] font-semibold flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#F5A623]"/> Blood Test</span>
              </div>
            </div>
          </div>

          {/* Key Findings Box */}
          <div className="bg-red-50 border border-red-200 rounded-[20px] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-red-100">
                 <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                 <h3 className="text-lg font-bold text-red-900">Key Findings</h3>
                 <p className="text-sm text-red-700/80 font-medium">We found 2 parameters that require your attention based on the extraction.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
               <span className="bg-red-100/80 text-red-800 border border-red-200/60 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
                 Hemoglobin <span className="bg-white/60 px-2 py-0.5 rounded text-xs">10.2 g/dL</span>
               </span>
               <span className="bg-red-100/80 text-red-800 border border-red-200/60 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
                 Potassium <span className="bg-white/60 px-2 py-0.5 rounded text-xs">5.6 mEq/L</span>
               </span>
            </div>
          </div>

          {/* Extracted Parameters Table */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
             <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#0F172A]">Extracted Parameters</h3>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left border-collapse">
                 <thead className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-slate-200">
                   <tr>
                     <th className="px-6 py-4">Parameter Name</th>
                     <th className="px-6 py-4">Value</th>
                     <th className="px-6 py-4">Normal Range</th>
                     <th className="px-6 py-4">Unit</th>
                     <th className="px-6 py-4">AI Confidence</th>
                     <th className="px-6 py-4 rounded-tr-lg">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {data.map((row) => {
                      const isNorm = row.status === 'Normal';
                      const isBord = row.status === 'Borderline';
                      const isAbnorm = row.status === 'Abnormal';
                      return (
                       <tr key={row.id} className={clsx(
                         "hover:bg-slate-50/50 transition-colors relative group",
                         isAbnorm && "bg-red-50/30"
                       )}>
                         {/* Status Color Border */}
                         <td className="p-0 relative px-6 py-5">
                            <div className={clsx(
                              "absolute left-0 top-0 bottom-0 w-1.5",
                              isNorm ? "bg-emerald-500" : isBord ? "bg-[#F5A623]" : "bg-red-500"
                            )}></div>
                            <div className="font-bold text-[#0F172A] flex items-center gap-2">
                               {row.name}
                               {/* Tooltip trigger */}
                               <div className="relative group/tooltip cursor-help">
                                  <Info className="w-3.5 h-3.5 text-slate-400 hover:text-[#3B6FE8]" />
                                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-[#0F172A] text-white text-xs p-2.5 rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-20 tooltip-triangle font-medium text-center shadow-xl">
                                     {row.desc}
                                  </div>
                               </div>
                            </div>
                         </td>
                         <td className={clsx(
                           "px-6 py-5 font-bold text-[16px]",
                           isNorm ? "text-slate-700" : isBord ? "text-[#F5A623]" : "text-red-700"
                         )}>{row.value}</td>
                         <td className="px-6 py-5 text-slate-500 font-medium">{row.range}</td>
                         <td className="px-6 py-5 text-slate-400 font-semibold">{row.unit}</td>
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-1.5 bg-slate-100 w-max px-2 py-1 rounded text-xs font-semibold text-slate-500">
                               <Zap className="w-3 h-3 text-[#3B6FE8]" />
                               {row.conf}%
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                               {isNorm && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                               {isBord && <AlertTriangle className="w-4 h-4 text-[#F5A623]" />}
                               {isAbnorm && <AlertCircle className="w-4 h-4 text-red-500" />}
                               <span className={clsx(
                                 "font-bold",
                                 isNorm ? "text-emerald-700" : isBord ? "text-[#D97706]" : "text-red-700"
                               )}>{row.status}</span>
                            </div>
                         </td>
                       </tr>
                      );
                   })}
                 </tbody>
               </table>
             </div>
          </div>

          <div className="flex justify-end pt-4">
             <button 
               onClick={() => navigate('/dashboard')}
               className="bg-[#0F172A] hover:bg-[#1A2E4C] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
             >
               View Full Body Analysis
               <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
