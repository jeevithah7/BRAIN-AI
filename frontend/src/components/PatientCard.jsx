import { MoreVertical, ChevronRight, Calendar } from 'lucide-react';
import { patientData } from '../data/patientData';

export default function PatientCard() {
  const initials = patientData.name.split(" ").map(n => n[0]).join("");
  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-600 relative shrink-0">
            <span className="absolute">{initials}</span>
          </div>
          <div>
            <h3 className="text-[#0F172A] font-bold text-[15px]">{patientData.name}</h3>
            <p className="text-[#94A3B8] text-[12px] font-medium leading-none mt-0.5">Last Visit: {patientData.lastVisit}</p>
          </div>
        </div>
        <button className="text-slate-300 hover:text-slate-500 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="h-px bg-slate-100 my-4"></div>

      <div>
         <div className="flex items-center gap-2 mb-3">
           <Calendar className="w-3.5 h-3.5 text-slate-400" />
           <p className="text-[12px] text-[#94A3B8] font-bold uppercase tracking-wider">Upcoming Appointment</p>
         </div>
         <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-3 hover:border-slate-200 transition-colors cursor-pointer group">
           <div>
              <p className="text-[14px] text-[#0F172A] font-bold">{patientData.appointment.title}</p>
              <p className="text-[12px] text-slate-500 mt-0.5 font-medium">{patientData.appointment.date}</p>
           </div>
           <div className="w-6 h-6 rounded-full bg-[#0F172A] text-white flex items-center justify-center group-hover:bg-[#1E3A5F] transition-colors shrink-0">
              <ChevronRight className="w-3 h-3" />
           </div>
         </div>
      </div>
    </div>
  );
}
