import { HeartPulse, AlertTriangle, CheckCircle, ActivitySquare } from 'lucide-react';

export default function SummaryCards({ results }) {
  const total = results.length;
  const normal = results.filter(r => r.status === 'NORMAL').length;
  const high = results.filter(r => r.status === 'HIGH').length;
  const low = results.filter(r => r.status === 'LOW').length;
  const critical = results.filter(r => r.status === 'CRITICAL' || r.status === 'URGENT').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Total Tests</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{total}</p>
        </div>
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
          <ActivitySquare className="text-slate-600 w-6 h-6" />
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Normal</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{normal}</p>
        </div>
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
          <CheckCircle className="text-emerald-500 w-6 h-6" />
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">High / Low</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{high + low}</p>
        </div>
        <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
          <HeartPulse className="text-yellow-500 w-6 h-6" />
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Critical Alerts</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{critical}</p>
        </div>
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
          <AlertTriangle className="text-red-500 w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
