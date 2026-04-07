import { useState, useEffect } from 'react';
import { FileText, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([
    { id: 'rpt_1', date: '2024-06-10T10:00:00Z', file_name: 'annual_blood.pdf', total_tests: 34, critical_count: 2, status: 'Action Required' },
    { id: 'rpt_2', date: '2023-11-20T09:15:00Z', file_name: 'routine_cbc.pdf', total_tests: 18, critical_count: 0, status: 'Stable' },
  ]); // Mocked data simulating Supabase response

  return (
    <div className="max-w-5xl mx-auto w-full pt-8">
      <h2 className="text-3xl font-bold text-[#0F172A] mb-8">Report History</h2>
      
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-sm">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">File Name</th>
              <th className="px-6 py-4 text-center">Markers Tested</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => navigate(`/preview?id=${row.id}`)}>
                <td className="px-6 py-5 text-[#0F172A] font-medium">{new Date(row.date).toLocaleDateString()}</td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3B6FE8] flex items-center justify-center shrink-0">
                       <FileText className="w-4 h-4" />
                     </div>
                     <span className="text-slate-600 font-medium truncate">{row.file_name}</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-center text-slate-600 font-bold">{row.total_tests}</td>
                <td className="px-6 py-5">
                   {row.status === 'Action Required' ? (
                     <div className="flex items-center gap-2 text-red-600 bg-red-50 w-max px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-red-100">
                       <AlertCircle className="w-3.5 h-3.5" /> Action Required ({row.critical_count} Critical)
                     </div>
                   ) : (
                     <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-max px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-emerald-100">
                       <CheckCircle className="w-3.5 h-3.5" /> Stable
                     </div>
                   )}
                </td>
                <td className="px-6 py-5 text-right">
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#3B6FE8] transition-colors ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
