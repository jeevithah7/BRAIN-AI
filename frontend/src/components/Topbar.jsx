import { useState } from 'react';
import { Menu, X, LayoutGrid, FileText as Document, MessageSquare, User, BarChart2, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', to: '/dashboard' },
    { icon: Document, label: 'Reports', to: '#' },
    { icon: MessageSquare, label: 'Messages', to: '#' },
    { icon: User, label: 'Profile', to: '#' },
    { icon: BarChart2, label: 'Analytics', to: '#' },
  ];

  return (
    <>
      <div className="w-full flex justify-between items-center bg-transparent py-4 px-2 mb-4">
        {/* App Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-50">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F5A623] text-white overflow-hidden shadow-sm">
             <div className="w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center relative">
               <div className="w-5 h-5 border-2 border-white rounded-full absolute -left-1"></div>
               <div className="w-5 h-5 border-2 border-white rounded-full absolute -right-1 mix-blend-overlay"></div>
             </div>
          </div>
          <span className="font-bold text-[#0F172A] text-xl tracking-tight hidden sm:block">Brain<span className="text-[#3B6FE8]">AI</span></span>
        </Link>

        {/* Hamburger Menu Icon */}
        <button 
          onClick={() => setIsOpen(true)}
          className="relative z-40 p-2.5 text-[#0F172A] bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-all active:scale-95 shadow-sm"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#0D1B2A] text-white shadow-2xl z-[101] flex flex-col pt-6 pb-8 px-6"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-white text-lg tracking-tight">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95">
                  <X className="w-6 h-6 text-slate-300" />
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;
                  return (
                    <Link 
                      key={idx}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isActive ? 'bg-white text-[#0F172A] font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'}`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              <button className="flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium mt-auto group">
                <Power className="w-5 h-5 group-hover:text-red-400" />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
