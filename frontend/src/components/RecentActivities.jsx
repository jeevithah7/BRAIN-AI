import { PersonStanding, Moon } from 'lucide-react';
import { patientData } from '../data/patientData';

export default function RecentActivities() {
  const walkData = [
    { day: 'MON', val: 0.4 },
    { day: 'TUE', val: 0.5 },
    { day: 'WED', val: 0.6 },
    { day: 'THU', val: 0.4 },
    { day: 'FRI', val: 1.0 },
  ];

  const totalSleep = patientData.sleep.deep + patientData.sleep.light;
  const deepPct = (patientData.sleep.deep / totalSleep) * 100;
  const lightPct = (patientData.sleep.light / totalSleep) * 100;

  return (
    <div className="bg-white rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <h3 className="font-bold text-[#0F172A] text-[16px] mb-5">Recent Activities</h3>
      
      {/* Walk Activity */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <PersonStanding className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-700 text-[14px]">Walk</span>
          </div>
          <span className="font-bold text-[#0F172A] text-[14px]">{patientData.steps.toLocaleString()} <span className="text-xs font-medium text-slate-500 ml-0.5">Steps</span></span>
        </div>
        
        {/* Custom Bar Chart for Walk */}
        <div className="flex justify-between items-end h-[60px] gap-2 px-1">
          {walkData.map(d => (
            <div key={d.day} className="flex flex-col items-center gap-2 flex-grow">
              <div 
                 className={`w-full rounded-[4px] transition-transform hover:opacity-80 cursor-pointer max-w-[24px] ${d.day === 'FRI' ? 'bg-[#3B82F6]' : 'bg-slate-200'}`}
                 style={{ height: `${d.val * 40}px` }}
              ></div>
              <span className="text-[10px] font-bold text-slate-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-slate-100 my-5"></div>

      {/* Sleep Activity */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-700 text-[14px]">Sleep</span>
          </div>
          <span className="font-bold text-[#0F172A] text-[14px]">{totalSleep} <span className="text-xs font-medium text-slate-500 ml-0.5">Hours</span></span>
        </div>

        {/* Custom Stacked Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex mb-4">
          <div style={{ width: `${deepPct}%` }} className="bg-[#8b5cf6] h-full transition-all duration-1000"></div>
          <div style={{ width: `${lightPct}%` }} className="bg-[#f59e0b] h-full transition-all duration-1000"></div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 mt-3">
           <div className="flex justify-between items-center text-[12px]">
             <div className="flex items-center gap-2.5">
               <div className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></div>
               <span className="text-slate-600 font-medium">Deep Sleep</span>
             </div>
             <span className="text-[#0F172A] font-bold">{patientData.sleep.deep} Hours</span>
           </div>
           
           <div className="flex justify-between items-center text-[12px]">
             <div className="flex items-center gap-2.5">
               <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
               <span className="text-slate-600 font-medium">Light Sleep</span>
             </div>
             <span className="text-[#0F172A] font-bold">{patientData.sleep.light} Hours</span>
           </div>
        </div>
      </div>
    </div>
  );
}
