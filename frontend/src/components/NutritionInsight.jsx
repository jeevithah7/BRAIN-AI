import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { patientData } from '../data/patientData';

export default function NutritionInsight() {
  const data = [
    { name: 'Carbohydrates', value: patientData.nutrition.carbs, color: '#8b5cf6' }, // Purple
    { name: 'Proteins', value: patientData.nutrition.protein, color: '#f59e0b' },    // Yellow/Amber
    { name: 'Fats', value: patientData.nutrition.fats, color: '#2563eb' }            // Blue
  ];

  return (
    <div className="bg-white rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mt-2">
      <h3 className="font-bold text-[#0F172A] text-lg mb-6">Nutrition Insight</h3>
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
        {/* Donut Chart */}
        <div className="w-32 h-32 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={60}
                stroke="none"
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Inner circle decor */}
          <div className="absolute inset-0 m-auto w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50/50">
            <span className="text-xl">🍒</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-grow w-full">
          <div className="mb-6">
            <p className="text-[28px] font-bold text-[#0F172A] leading-tight flex items-baseline">
              {patientData.calories.toLocaleString()} <span className="text-sm font-medium text-slate-500 ml-1">kcal</span>
            </p>
            <p className="text-[13px] text-[#94A3B8] font-medium mt-1">Calories Consumed Today</p>
          </div>

          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="text-[#0F172A] font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
