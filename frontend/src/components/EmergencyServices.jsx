import { ChevronRight } from 'lucide-react';

export default function EmergencyServices() {
  return (
    <div className="bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-between flex-grow min-h-[180px]">
      {/* Decorative subtle shape */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/50 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 h-full flex flex-col">
        <h2 className="text-[22px] font-bold text-[#0F172A] leading-tight tracking-tight mb-8">
          Emergency<br/>Services
        </h2>

        <button className="mt-auto w-full bg-[#0F172A] hover:bg-[#1E3A5F] text-white rounded-[12px] py-3.5 px-5 flex justify-between items-center transition-colors shadow-lg shadow-slate-900/10 group active:scale-95">
          <span className="text-sm font-semibold tracking-wide">Get Help Now</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
