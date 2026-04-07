import { Apple, TriangleAlert, Dumbbell, Pill, Stethoscope } from 'lucide-react';

export default function RecommendationsTab() {
  // Mock subset based on Claude Response logic
  const mockRecs = {
    foods_to_eat: [
      { item: "Spinach & Kale", reason: "High in dietary iron to combat low hemoglobin.", emoji: "🥬" },
      { item: "Citrus Fruits", reason: "Vitamin C helps absorb plant-based iron.", emoji: "🍊" }
    ],
    foods_to_avoid: [
      { item: "Excessive Coffee/Tea", reason: "Tannins inhibit iron absorption if drunk with meals.", emoji: "☕" }
    ],
    lifestyle_changes: [
      { action: "Daily Walking", frequency: "30 mins/day", reason: "Stimulates red blood cell production gently." }
    ],
    supplements: [
      { name: "Ferrous Sulfate", dosage: "325 mg", reason: "Direct iron supplementation.", note: "Take with Vitamin C on an empty stomach." }
    ],
    when_to_see_doctor: "If experiencing severe dizziness, shortness of breath, or chest pain.",
    urgency_level: "high",
    summary: "Your hemoglobin indicates mild to moderate anemia. Integrating targeted iron-rich foods, supplementation, and absorption enhancers is critical to rebuilding stores."
  };

  const getUrgencyColor = (level) => {
    switch(level) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-amber-400 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="flex flex-col gap-6">
       {/* Urgency Banner */}
       <div className={`rounded-2xl p-5 shadow-lg flex items-start gap-4 ${getUrgencyColor(mockRecs.urgency_level)}`}>
          <Stethoscope className="w-8 h-8 opacity-80 shrink-0 mt-1" />
          <div>
             <h3 className="font-bold text-lg uppercase tracking-wide opacity-90 mb-1">Clinical Summary</h3>
             <p className="font-medium text-[15px] leading-relaxed">{mockRecs.summary}</p>
             <div className="mt-4 inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg text-sm font-bold">
                <TriangleAlert className="w-4 h-4" />
                See Doctor: {mockRecs.when_to_see_doctor}
             </div>
          </div>
       </div>

       {/* 2x2 Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Foods to Eat */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 shadow-sm">
             <div className="flex items-center gap-2 text-emerald-800 mb-4 pb-3 border-b border-emerald-100">
               <Apple className="w-5 h-5" />
               <h4 className="font-bold">Foods to Eat</h4>
             </div>
             <div className="flex flex-col gap-3">
               {mockRecs.foods_to_eat.map((f, i) => (
                 <div key={i} className="flex gap-3 group relative cursor-help">
                   <span className="text-2xl mt-0.5">{f.emoji}</span>
                   <div>
                     <p className="font-bold text-slate-800 text-sm">{f.item}</p>
                     <p className="text-xs text-slate-600 font-medium leading-snug">{f.reason}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Foods to Avoid */}
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 shadow-sm">
             <div className="flex items-center gap-2 text-red-800 mb-4 pb-3 border-b border-red-100">
               <TriangleAlert className="w-5 h-5" />
               <h4 className="font-bold">Foods to Limit</h4>
             </div>
             <div className="flex flex-col gap-3">
               {mockRecs.foods_to_avoid.map((f, i) => (
                 <div key={i} className="flex gap-3 group">
                   <span className="text-2xl mt-0.5 grayscale opacity-70">{f.emoji}</span>
                   <div>
                     <p className="font-bold text-slate-800 text-sm">{f.item}</p>
                     <p className="text-xs text-slate-600 font-medium leading-snug">{f.reason}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Lifestyle */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 shadow-sm">
             <div className="flex items-center gap-2 text-blue-800 mb-4 pb-3 border-b border-blue-100">
               <Dumbbell className="w-5 h-5" />
               <h4 className="font-bold">Lifestyle Changes</h4>
             </div>
             <div className="flex flex-col gap-3">
               {mockRecs.lifestyle_changes.map((l, i) => (
                 <div key={i}>
                   <div className="flex justify-between items-center bg-white border border-blue-50 px-3 py-1.5 rounded-lg mb-1 shadow-sm">
                      <p className="font-bold text-[#0F172A] text-sm">{l.action}</p>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{l.frequency}</span>
                   </div>
                   <p className="text-xs text-slate-600 font-medium leading-snug px-1">{l.reason}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* Supplements */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 shadow-sm">
             <div className="flex items-center gap-2 text-amber-800 mb-4 pb-3 border-b border-amber-100">
               <Pill className="w-5 h-5" />
               <h4 className="font-bold">Supplements</h4>
             </div>
             <div className="flex flex-col gap-3">
               {mockRecs.supplements.map((s, i) => (
                 <div key={i} className="bg-white border border-amber-50 rounded-xl p-3 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-400"></div>
                   <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-[#0F172A] text-sm">{s.name}</p>
                      <span className="text-[10px] font-bold text-white bg-amber-500 px-2 py-0.5 rounded-full">{s.dosage}</span>
                   </div>
                   <p className="text-xs text-slate-600 font-medium mb-1">{s.reason}</p>
                   {s.note && <p className="text-[10px] text-amber-700 font-bold bg-amber-50/50 inline-block px-2 py-1 rounded">Note: {s.note}</p>}
                 </div>
               ))}
             </div>
          </div>

       </div>
    </div>
  );
}
