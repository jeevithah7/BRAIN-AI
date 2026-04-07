import { AlertOctagon, ArrowDownRight } from 'lucide-react';

export default function ReduceCard() {
  const warnings = [
    "Reduce saturated fats (Fried foods)",
    "Limit sodium intake (< 2g/day)",
    "Decrease sedentary screen time"
  ];
  return (
    <div className="bg-red-50 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-red-100">
      <div className="flex items-center gap-2 mb-4">
        <AlertOctagon className="w-5 h-5 text-red-600" />
        <h3 className="font-bold text-red-900 text-[16px]">What to Quit / Reduce</h3>
      </div>
      <ul className="space-y-3">
        {warnings.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-red-800 font-medium">
            <ArrowDownRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
