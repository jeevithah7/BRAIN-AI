import { Calendar, ChevronDown, Heart, Droplet, Users, Activity } from 'lucide-react';
import MetricCard from './MetricCard';
import { patientData } from '../data/patientData';

export default function HealthOverview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <h2 className="text-[40px] font-bold text-[#0F172A] leading-[1.1] tracking-tight">
          Health<br/>Overview
        </h2>
        
        <button className="flex items-center gap-2 px-4 py-2 mt-2 bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Today, Jun 13</span>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>

      <div className="w-full">
        <div className="relative inline-block mb-4">
          <select className="w-full appearance-none bg-transparent text-[#0F172A] font-semibold text-sm outline-none cursor-pointer border-b border-transparent hover:border-slate-300 pb-1 pr-6 z-10 relative left-0">
            <option>Cardiovascular</option>
            <option>Metabolic</option>
            <option>General</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-0.5 pointer-events-none" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <MetricCard icon={Heart} value={patientData.heartRate} unit="bpm" label="Heart Rate" />
          <MetricCard icon={Droplet} value={patientData.bloodPressure} unit="mmHg" label="Blood Pressure" />
          <MetricCard icon={Users} value={patientData.cholesterol} unit="mg/dL" label="Total Cholesterol" />
          <MetricCard icon={Activity} value={patientData.restingHR} unit="BPM" label="Resting Heart Rate" />
        </div>
      </div>
    </div>
  );
}
