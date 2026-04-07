import { Leaf, ArrowUpRight } from 'lucide-react';

export default function FocusOnCard() {
  const habits = [
    "Increase Iron intake (Spinach, Lentils)",
    "Drink 2.5L water daily",
    "30 min cardio (Walking/Cycling)"
  ];
  return (
    <div className="bg-emerald-50 rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-emerald-100">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="w-5 h-5 text-emerald-600" />
        <h3 className="font-bold text-emerald-900 text-[16px]">What to Focus On</h3>
      </div>
      <ul className="space-y-3">
        {habits.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-emerald-800 font-medium">
            <ArrowUpRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
