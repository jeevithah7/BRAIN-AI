import { useState } from 'react';
import SummaryCards from './SummaryCards';
import ResultsTable from './ResultsTable';
import UploadDropzone from './UploadDropzone';
import { Stethoscope } from 'lucide-react';

export default function Dashboard() {
  const [results, setResults] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Patient Dashboard</h2>
          <p className="text-slate-500 mt-1">Upload and analyze your latest blood test reports.</p>
        </div>
      </div>
      
      {!results && !isUploading && (
        <UploadDropzone setResults={setResults} setIsUploading={setIsUploading} setRecommendations={setRecommendations} />
      )}
      
      {isUploading && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
          <h3 className="text-lg font-medium text-slate-900">Analyzing Report...</h3>
          <p className="text-slate-500 mt-2 text-center max-w-md">Our AI is extracting parameters and analyzing them against reference ranges. This may take a few seconds.</p>
        </div>
      )}

      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SummaryCards results={results} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
               <ResultsTable results={results} />
            </div>
            
            <div className="space-y-6">
              {recommendations && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                   <h3 className="text-lg font-bold flex items-center mb-4 text-emerald-700">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Lifestyle Recommendations
                   </h3>
                   <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-2">Foods to Eat</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                           {recommendations.foods_to_eat?.map((food, i) => <li key={i}>{food}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-2">Foods to Avoid</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                           {recommendations.foods_to_avoid?.map((food, i) => <li key={i}>{food}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-2">When to See a Doctor</h4>
                        <p className="text-sm text-slate-600 bg-red-50 p-3 rounded-lg border border-red-100">{recommendations.when_to_see_doctor}</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => { setResults(null); setRecommendations(null); }}
              className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
