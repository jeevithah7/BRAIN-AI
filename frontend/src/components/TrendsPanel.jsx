import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ReferenceArea, ResponsiveContainer } from 'recharts';

// Custom dot depending on status
const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;
  
  let color = "#10B981"; // Normal (Green)
  if (payload.status === "CRITICAL" || payload.status === "HIGH") color = "#EF4444"; // Red
  if (payload.status === "LOW" || payload.status === "BORDERLINE") color = "#F5A623"; // Yellow/Orange
  
  return <circle cx={cx} cy={cy} r={6} fill={color} stroke="white" strokeWidth={2.5} className="shadow-sm" />;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0F172A] text-white p-4 rounded-xl shadow-xl text-sm border border-slate-700">
        <p className="font-bold text-slate-300 mb-1">{new Date(label).toLocaleDateString()}</p>
        <p className="text-xl font-bold">{data.value} {data.unit}</p>
        <p className={`font-semibold mt-1 ${data.status === 'NORMAL' ? 'text-emerald-400' : 'text-red-400'}`}>{data.status}</p>
      </div>
    );
  }
  return null;
};

export default function TrendsPanel() {
  const [selectedTest, setSelectedTest] = useState('Hemoglobin');
  
  // Mock data representing a parsed Supabase /api/trends output
  const mockTrends = [
    { date: '2023-01-15', value: 11.2, status: 'LOW', ref_low: 12.0, ref_high: 15.5, unit: 'g/dL' },
    { date: '2023-06-20', value: 11.8, status: 'LOW', ref_low: 12.0, ref_high: 15.5, unit: 'g/dL' },
    { date: '2023-11-20', value: 12.5, status: 'NORMAL', ref_low: 12.0, ref_high: 15.5, unit: 'g/dL' },
    { date: '2024-06-10', value: 10.2, status: 'CRITICAL', ref_low: 12.0, ref_high: 15.5, unit: 'g/dL' },
  ];

  const currentRefLow = mockTrends[0].ref_low;
  const currentRefHigh = mockTrends[0].ref_high;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[#0F172A] text-lg">Biomarker Trends</h3>
        <select 
           value={selectedTest} 
           onChange={(e) => setSelectedTest(e.target.value)}
           className="bg-slate-50 border border-slate-200 text-[#0F172A] font-semibold text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3B6FE8] outline-none"
        >
          <option value="Hemoglobin">Hemoglobin</option>
          <option value="Glucose">Glucose (Fasting)</option>
          <option value="WBC">WBC Count</option>
        </select>
      </div>

      <div className="w-full h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockTrends} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, {month:'short', year:'2-digit'})} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} dy={10} />
            <YAxis tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} dx={-10} domain={['dataMin - 1', 'dataMax + 1']} />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            {/* Reference Band (Normal Range) */}
            <ReferenceArea y1={currentRefLow} y2={currentRefHigh} fill="#10B981" fillOpacity={0.06} />
            
            <Line type="monotone" dataKey="value" stroke="#3B6FE8" strokeWidth={3} dot={<CustomDot />} activeDot={{ r: 8, strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center gap-6 text-xs font-semibold text-slate-500 mt-2 px-2">
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#10B981]"></div> Normal</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F5A623]"></div> Borderline / Low</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#EF4444]"></div> Critical / High</div>
         <div className="flex items-center gap-2 ml-auto"><div className="w-4 h-4 rounded bg-[#10B981] opacity-20 border border-[#10B981]"></div> Reference Range ({currentRefLow} - {currentRefHigh})</div>
      </div>
    </div>
  );
}
