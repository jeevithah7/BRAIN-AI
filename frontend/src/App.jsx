import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import UploadScreen from './pages/UploadScreen';
import LoadingBuffer from './pages/LoadingBuffer';
import FindingsPreview from './pages/FindingsPreview';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans font-medium overflow-hidden">
        <div className="flex-grow flex flex-col px-4 sm:px-8 py-4 max-h-screen overflow-x-hidden overflow-y-auto w-full max-w-7xl mx-auto">
          <Topbar />
          
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/upload" element={<UploadScreen />} />
            <Route path="/loading" element={<LoadingBuffer />} />
            <Route path="/preview" element={<FindingsPreview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
