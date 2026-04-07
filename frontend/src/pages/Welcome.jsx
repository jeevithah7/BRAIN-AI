import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden rounded-[24px] bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] min-h-[600px] mt-2 mb-8">
      {/* Radial Gradient Pulse Background */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent blur-3xl pointer-events-none"
      />

      <div className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center">
        {/* Simple Health icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, bounce: 0.5, type: "spring" }}
          className="w-16 h-16 bg-blue-50 text-[#3B6FE8] rounded-full flex items-center justify-center mb-8 shadow-sm"
        >
           <Activity className="w-8 h-8" />
        </motion.div>

        {/* Staggered Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[44px] md:text-[52px] font-bold text-[#0F172A] leading-tight tracking-tight mb-6"
        >
          Welcome<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] to-[#3B6FE8]">Your Health Insights Start Here</span>
        </motion.h1>
        
        {/* Subtext Delay */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-[18px] text-slate-500 font-medium mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Upload your medical report to get a complete body analysis and personalized recommendations powered by AI.
        </motion.p>

        {/* CTA Bounce & Shimmer Glow */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.4, type: "spring", bounce: 0.5 }}
        >
          <Link 
            to="/upload" 
            className="group relative flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-[#1A2E4C] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-pulse transition-all hover:scale-[1.03] active:scale-[0.97] overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
            <span className="relative z-20 flex items-center gap-2">
               Get Started
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Small trust indicators */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-8 border-t border-slate-100/50 w-full opacity-80"
        >
           <div className="flex items-center gap-2 text-sm text-slate-500 font-medium tracking-wide">
              <FileText className="w-4 h-4 text-[#F5A623]" />
              Supports PDF, PNG, JPG
           </div>
           <span className="text-slate-300 hidden md:inline">•</span>
           <div className="flex items-center gap-2 text-sm text-slate-500 font-medium tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#3B6FE8]" />
              Private & Secure
           </div>
           <span className="text-slate-300 hidden md:inline">•</span>
           <div className="flex items-center gap-2 text-sm text-slate-500 font-medium tracking-wide">
              <Activity className="w-4 h-4 text-emerald-500" />
              Instant Analysis
           </div>
        </motion.div>
      </div>
    </div>
  );
}
