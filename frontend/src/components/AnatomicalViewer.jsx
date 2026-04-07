import { Thermometer, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { patientData } from '../data/patientData';

export default function AnatomicalViewer() {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-b from-[#EEF2F7] to-[#DFE6F1] rounded-[16px] overflow-hidden flex flex-col items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      
      {/* Top Right: Heart Rate + ECG */}
      <div className="absolute top-6 right-6 bg-[#1E3A5F] rounded-xl pt-4 shadow-lg w-[160px] overflow-hidden z-20 hover:scale-105 transition-transform cursor-pointer">
        <div className="flex items-center gap-3 px-4 mb-3">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <Heart className="w-8 h-8 text-red-500 drop-shadow-md" fill="currentColor" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-white leading-none">{patientData.heartRate} <span className="text-[11px] font-normal text-slate-300">BPM</span></p>
            <p className="text-[11px] text-slate-400 font-medium mt-1 whitespace-nowrap">Heart Rate</p>
          </div>
        </div>
        {/* Simple ECG SVG Path */}
        <div className="w-full h-10 opacity-70 border-t border-white/10 mt-2 flex items-end">
          <svg viewBox="0 0 160 30" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <polyline 
              stroke="#93C5FD" 
              strokeWidth="1.5" 
              fill="none" 
              points="0,15 10,15 15,5 20,25 25,10 32,15 45,15 50,10 55,20 60,15 160,15"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Body Model Image */}
      <div className="relative z-10 w-full max-w-[280px] h-[500px] mt-8 flex items-center justify-center">
         {/* If image missing, using a placeholder div */}
         <img src="/body-model.png" alt="Anatomical Body" className="w-full h-full object-contain drop-shadow-2xl opacity-90 fallback-bg" onError={(e) => e.target.style.display='none'} />
         
         {/* Hotspots */}
         <div className="absolute top-[28%] left-[62%] w-3.5 h-3.5 bg-white rounded-full border-4 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] cursor-pointer hover:scale-125 transition-transform"></div>
         <div className="absolute top-[35%] left-[32%] w-3.5 h-3.5 bg-white rounded-full border-4 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] cursor-pointer hover:scale-125 transition-transform"></div>
         <div className="absolute top-[52%] left-[50%] -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full border-4 border-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)] cursor-pointer hover:scale-125 transition-transform"></div>
         <div className="absolute top-[75%] left-[34%] w-3.5 h-3.5 bg-white rounded-full border-4 border-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.8)] cursor-pointer hover:scale-125 transition-transform"></div>
      </div>

      {/* CSS Concentric Rings (Bottom) */}
      <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 w-[340px] h-[100px] z-0 pointer-events-none">
        <svg viewBox="0 0 340 100" className="w-full h-full overflow-visible">
           {/* Inner ring */}
           <ellipse cx="170" cy="50" rx="100" ry="20" fill="none" stroke="#F59E0B" strokeWidth="1" className="opacity-60" strokeDasharray="4 2">
             <animateTransform attributeName="transform" type="rotate" from="0 170 50" to="360 170 50" dur="20s" repeatCount="indefinite" />
           </ellipse>
           {/* Middle ring */}
           <ellipse cx="170" cy="50" rx="140" ry="32" fill="none" stroke="#3B82F6" strokeWidth="1" className="opacity-50">
             <animateTransform attributeName="transform" type="rotate" from="360 170 50" to="0 170 50" dur="25s" repeatCount="indefinite" />
           </ellipse>
           {/* Outer ring */}
           <ellipse cx="170" cy="50" rx="170" ry="45" fill="none" stroke="#10B981" strokeWidth="0.5" className="opacity-30" strokeDasharray="8 4">
             <animateTransform attributeName="transform" type="rotate" from="0 170 50" to="360 170 50" dur="30s" repeatCount="indefinite" />
           </ellipse>
        </svg>
      </div>

      {/* Navigation Arrow Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0F172A] rounded-full px-2 py-1 flex items-center justify-center gap-6 text-white shadow-lg z-20 border border-slate-700/50">
        <button className="hover:text-amber-400 p-1 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
        <button className="hover:text-amber-400 p-1 transition-colors"><ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
