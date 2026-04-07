import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingBuffer() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Reading your medical data...",
    "Extracting key health parameters...",
    "Preparing your personalized insights..."
  ];

  useEffect(() => {
    // Progress bar physics 0 -> 100 over 3 seconds
    const duration = 3000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + (100 / steps);
      });
    }, intervalTime);

    // Swap messages array over time
    const msgTimer1 = setTimeout(() => setMessageIndex(1), 1000);
    const msgTimer2 = setTimeout(() => setMessageIndex(2), 2000);
    
    // Auto Navigate after 3.2s
    const navTimer = setTimeout(() => {
      navigate('/preview');
    }, duration + 200);

    return () => {
      clearInterval(timer);
      clearTimeout(msgTimer1);
      clearTimeout(msgTimer2);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }}
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")` }}
      className="fixed inset-0 z-50 bg-[#0D1B2A] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6">
        
        {/* SVG ECG Animation */}
        <div className="w-[280px] h-24 mb-10 opacity-80 relative">
           <svg viewBox="0 0 280 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
             <motion.polyline 
               stroke="#3B6FE8" 
               strokeWidth="2.5" 
               fill="none" 
               points="0,20 40,20 50,20 60,10 70,35 85,5 95,20 120,20 125,15 130,25 135,5 150,30 160,20 280,20"
               strokeLinejoin="round"
               strokeLinecap="round"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{ pathLength: { duration: 1.5, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
             />
             <motion.polyline 
               stroke="#F5A623" 
               strokeWidth="1.5" 
               fill="none" 
               points="0,20 40,20 50,20 60,10 70,35 85,5 95,20 120,20 125,15 130,25 135,5 150,30 160,20 280,20"
               strokeLinejoin="round"
               strokeLinecap="round"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 0.5 }}
               transition={{ pathLength: { delay: 0.2, duration: 1.5, repeat: Infinity, ease: "linear" } }}
             />
           </svg>
           {/* Ambient Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-[#3B6FE8]/20 blur-xl rounded-full"></div>
        </div>

        <h1 className="text-[32px] md:text-[40px] font-bold text-white text-center leading-tight mb-4 tracking-tight drop-shadow-lg">
          Analyzing report for <span className="text-[#F5A623]">James Johnson</span>...
        </h1>
        
        <div className="h-8 flex items-center justify-center mb-10 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p 
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[#94A3B8] font-medium text-lg text-center"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-sm flex flex-col items-center">
            <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden shadow-inner mb-3 border border-slate-700/50">
               <div 
                 className="h-full bg-gradient-to-r from-[#3B6FE8] to-[#60A5FA] rounded-full shadow-[0_0_12px_rgba(59,111,232,0.8)]"
                 style={{ width: `${Math.min(100, Math.max(0, progress))}%`, transition: 'width 30ms linear' }}
               />
            </div>
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
              This usually takes a few seconds
            </p>
        </div>
      </div>
    </motion.div>
  );
}
