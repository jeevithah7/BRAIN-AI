import { Grid, FileText, MessageSquare, User, BarChart2, Power } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-[72px] bg-[#0F172A] flex flex-col items-center py-8 h-screen sticky top-0 shrink-0">
      {/* Logo Placeholder */}
      <div className="mb-12 relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 absolute -translate-x-2"></div>
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 absolute translate-x-2"></div>
      </div>

      {/* Nav Icons */}
      <div className="flex flex-col space-y-8 flex-grow mt-4">
        {/* Active Item */}
        <div className="relative group flex justify-center w-full">
          <div className="absolute inset-y-0 w-12 bg-white/20 rounded-xl"></div>
          <Grid className="text-white w-5 h-5 relative z-10" />
        </div>
        
        <div className="group flex justify-center w-full cursor-pointer">
          <FileText className="text-white/50 group-hover:text-white transition-colors w-5 h-5" />
        </div>
        
        <div className="group flex justify-center w-full cursor-pointer">
          <MessageSquare className="text-white/50 group-hover:text-white transition-colors w-5 h-5" />
        </div>
        
        <div className="group flex justify-center w-full cursor-pointer">
          <User className="text-white/50 group-hover:text-white transition-colors w-5 h-5" />
        </div>
        
        <div className="group flex justify-center w-full cursor-pointer">
          <BarChart2 className="text-white/50 group-hover:text-white transition-colors w-5 h-5" />
        </div>
      </div>

      {/* Bottom Power Icon */}
      <div className="mt-auto group flex justify-center w-full cursor-pointer">
        <Power className="text-white/50 group-hover:text-white transition-colors w-5 h-5" />
      </div>
    </aside>
  );
}
