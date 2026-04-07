import { clsx } from "clsx";
import { AlertCircle } from 'lucide-react';

export default function ResultsTable({ results }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Extracted Test Parameters</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">Test Name</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4">Unit</th>
              <th className="px-6 py-4">Reference Range</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((item, idx) => {
              const isNormal = item.status === 'NORMAL';
              const isHigh = item.status === 'HIGH';
              const isLow = item.status === 'LOW';
              const isCritical = item.status === 'CRITICAL' || item.status === 'URGENT';
              
              return (
                <tr key={idx} className={clsx(
                  "hover:bg-slate-50 transition-colors",
                  isCritical && "bg-red-50/50"
                )}>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.test_name}
                    {isCritical && <AlertCircle className="inline-block w-4 h-4 ml-2 text-red-500" />}
                  </td>
                  <td className={clsx(
                    "px-6 py-4 font-bold text-lg",
                    isNormal ? "text-emerald-600" : isCritical ? "text-red-700" : "text-yellow-600"
                  )}>
                    {item.value}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                  <td className="px-6 py-4 text-slate-500">{item.reference_range}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-3 py-1 text-xs font-semibold rounded-full",
                      isNormal && "bg-emerald-100 text-emerald-800",
                      (isHigh || isLow) && !isCritical && "bg-yellow-100 text-yellow-800",
                      isCritical && "bg-red-100 text-red-800 border border-red-200"
                    )}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
