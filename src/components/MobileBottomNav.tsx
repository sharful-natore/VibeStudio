import React from 'react';
import { Sparkles, TrendingUp, Bookmark } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  isDarkMode?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  isDarkMode,
}) => {
  return (
    <nav
      className={`fixed bottom-0 inset-x-0 z-40 sm:hidden backdrop-blur-md px-4 py-2 transition-colors border-t ${
        isDarkMode
          ? 'bg-[#090b12]/95 border-white/[0.08]'
          : 'bg-white/95 border-slate-200/80'
      }`}
    >
      <div className="flex items-center justify-around">
        {/* Explore Store */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 py-1 px-4 transition-colors ${
            activeTab === 'explore'
              ? isDarkMode
                ? 'text-cyan-400 font-bold'
                : 'text-indigo-600 font-bold'
              : isDarkMode
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">Store</span>
        </button>

        {/* Top Rated */}
        <button
          onClick={() => setActiveTab('trending')}
          className={`flex flex-col items-center gap-1 py-1 px-4 transition-colors ${
            activeTab === 'trending'
              ? isDarkMode
                ? 'text-cyan-400 font-bold'
                : 'text-indigo-600 font-bold'
              : isDarkMode
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px]">Top Rated</span>
        </button>

        {/* Wishlist / Saved */}
        <button
          onClick={() => setActiveTab('saved')}
          className={`relative flex flex-col items-center gap-1 py-1 px-4 transition-colors ${
            activeTab === 'saved'
              ? isDarkMode
                ? 'text-cyan-400 font-bold'
                : 'text-indigo-600 font-bold'
              : isDarkMode
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px]">Saved</span>
          {savedCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
