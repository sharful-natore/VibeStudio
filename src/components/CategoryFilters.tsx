import React from 'react';
import { SortOption } from '../types/app';
import {
  ArrowUpDown,
  Sparkles,
  TrendingUp,
  Layers,
  Keyboard,
  Wrench,
  DollarSign,
  Music,
} from 'lucide-react';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  categoryCounts,
  totalCount,
  activeNavTab,
  setActiveNavTab,
  isDarkMode,
}) => {
  const getCategoryIcon = (cat: string, isSelected: boolean) => {
    const iconClass = "w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110";
    switch (cat.toLowerCase()) {
      case 'all':
        return <Layers className={`${iconClass} ${isSelected ? 'text-white' : 'text-indigo-400'}`} />;
      case 'keyboards & productivity':
      case 'keyboards':
        return <Keyboard className={`${iconClass} ${isSelected ? 'text-white' : 'text-cyan-400'}`} />;
      case 'utilities & tools':
      case 'tools':
        return <Wrench className={`${iconClass} ${isSelected ? 'text-white' : 'text-amber-400'}`} />;
      case 'finance':
        return <DollarSign className={`${iconClass} ${isSelected ? 'text-white' : 'text-emerald-400'}`} />;
      case 'media & audio':
        return <Music className={`${iconClass} ${isSelected ? 'text-white' : 'text-rose-400'}`} />;
      default:
        return <Sparkles className={`${iconClass} ${isSelected ? 'text-white' : 'text-indigo-400'}`} />;
    }
  };

  return (
    <div
      className={`py-2 sm:py-3 border-b mb-4 w-full max-w-full overflow-hidden transition-colors ${
        isDarkMode ? 'border-white/[0.08]' : 'border-slate-200/80'
      }`}
    >
      {/* Top Controls: Switcher & Sort */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2.5">
        
        {/* Segmented Pill Toggle */}
        <div
          className={`inline-flex p-1 rounded-xl border ${
            isDarkMode
              ? 'bg-[#101322] border-white/[0.08]'
              : 'bg-slate-100 border-slate-200/80'
          }`}
        >
          <button
            onClick={() => setActiveNavTab('explore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              activeNavTab === 'explore'
                ? isDarkMode
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-white text-slate-900 shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Explore All</span>
          </button>

          <button
            onClick={() => setActiveNavTab('trending')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              activeNavTab === 'trending'
                ? isDarkMode
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-white text-slate-900 shadow-sm'
                : isDarkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Top Rated</span>
          </button>
        </div>

        {/* Minimal Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <label
            className={`flex items-center gap-1 font-semibold text-[11px] ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <ArrowUpDown className="w-3 h-3 text-indigo-400" />
            <span>Sort By:</span>
          </label>
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as SortOption)}
            className={`text-xs rounded-xl px-3 py-1.5 focus:outline-none font-semibold cursor-pointer shadow-sm border transition-colors ${
              isDarkMode
                ? 'bg-[#121524] text-slate-200 border-white/[0.08] focus:border-indigo-500'
                : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500'
            }`}
          >
            <option value="rating">Top Rated (Highest)</option>
            <option value="downloads">Most Downloaded</option>
            <option value="name">App Name (A-Z)</option>
            <option value="size">Size (Smallest)</option>
          </select>
        </div>
      </div>

      {/* Modern Filter Chips Horizontal Rail */}
      <div className="flex items-center gap-2 overflow-x-auto w-full pb-1.5 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          const count = cat.toLowerCase() === 'all' ? totalCount : categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`filter-pill group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 border cursor-pointer active:scale-95 ${
                isSelected
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 text-white border-indigo-400/50 shadow-md shadow-indigo-600/35 ring-1 ring-indigo-400/30'
                    : 'bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-slate-900 shadow-md shadow-slate-900/15'
                  : isDarkMode
                  ? 'bg-[#121524] text-slate-300 border-white/[0.08] hover:border-indigo-500/40 hover:bg-[#161a2e] hover:text-white'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
              }`}
            >
              {getCategoryIcon(cat, isSelected)}
              <span className="font-medium tracking-tight">{cat}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : isDarkMode
                    ? 'bg-white/[0.06] text-slate-400 group-hover:text-slate-200'
                    : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
