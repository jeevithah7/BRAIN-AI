import { MoreVertical } from 'lucide-react';

export default function MetricCard({ icon: Icon, value, unit, label }) {
  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] relative flex flex-col h-full min-h-[140px] hover:-translate-y-0.5 transition-transform">
      <div className="flex justify-between items-start mb-4">
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-700" />
        </div>
        <button className="text-slate-300 hover:text-slate-500 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-auto">
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-bold text-[#0F172A] leading-none">{value}</span>
          <span className="text-sm font-medium text-slate-500">{unit}</span>
        </div>
        <p className="text-[13px] text-[#94A3B8] mt-1.5 font-medium">{label}</p>
      </div>
    </div>
  );
}
