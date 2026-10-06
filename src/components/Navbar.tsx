import React, { useState } from 'react';
import {
  Search,
  Download,
  Moon,
  Sun,
  X,
  Bookmark,
  Share2,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenIOSGuide: () => void;
  savedCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  onOpenIOSGuide,
  savedCount,
  activeTab,
  setActiveTab,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleShare = () => {
    const siteUrl = 'https://vibestudio.github.io/';
    if (navigator.share) {
      navigator.share({
        title: 'VibeStudio – Modern App Store',
        text: 'Download high-performance Android APKs from VibeStudio!',
        url: siteUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(siteUrl);
      alert('VibeStudio link copied: ' + siteUrl);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors w-full border-b ${
        isDarkMode
          ? 'bg-[#090b12]/95 border-white/[0.08] text-white'
          : 'bg-white/95 border-slate-200/90 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* VibeStudio Branding */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setActiveTab('explore');
                setSearchQuery('');
              }}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-[2px] shadow-sm group-hover:scale-105 transition-transform">
                <div
                  className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                    isDarkMode ? 'bg-[#0b0d14]' : 'bg-[#0a0c13]'
                  }`}
                >
                  <span className="font-extrabold text-sm sm:text-base text-cyan-400 font-['Space_Grotesk',sans-serif]">
                    V
                  </span>
                </div>
              </div>

              <div>
                <span
                  className={`font-extrabold text-base sm:text-lg tracking-tight font-['Space_Grotesk',sans-serif] block leading-none ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  VibeStudio
                </span>
                <span className="text-[10px] sm:text-[11px] text-indigo-500 dark:text-cyan-400 font-semibold leading-none block mt-1 tracking-tight">
                  vibestudio.github.io
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search apps, Bangla keyboards, tools..."
                className={`w-full pl-9 pr-8 py-2 border rounded-xl text-xs focus:outline-none focus:border-indigo-500 transition-all ${
                  isDarkMode
                    ? 'bg-[#121524] border-white/[0.08] text-white placeholder-slate-400 focus:bg-[#15192c]'
                    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className={`sm:hidden p-2 rounded-xl transition-colors ${
                isDarkMode ? 'text-slate-300 hover:bg-white/[0.06]' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-[#121524] text-slate-300 hover:text-white border-white/[0.08] hover:bg-[#161a2e]'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
              }`}
              title="Share vibestudio.github.io"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Wishlist Pill */}
            <button
              onClick={() => setActiveTab(activeTab === 'saved' ? 'explore' : 'saved')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-rose-500/15 text-rose-500 border-rose-500/30'
                  : isDarkMode
                  ? 'bg-[#121524] text-slate-300 border-white/[0.08] hover:bg-[#161a2e]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Saved Apps"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden md:inline">Saved</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500 text-white font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#121524] border-white/[0.08] text-amber-400 hover:bg-[#181d33]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* PWA Install Button */}
            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-xs shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install</span>
              </button>
            )}

            {!isInstalled && !isInstallable && isIOS && (
              <button
                onClick={onOpenIOSGuide}
                className={`px-2.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  isDarkMode
                    ? 'border-white/[0.08] text-slate-200 hover:bg-white/[0.06]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                iOS
              </button>
            )}

          </div>

        </div>

        {/* Mobile Search Drawer */}
        {mobileSearchOpen && (
          <div className="sm:hidden pb-3 pt-1">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search apps, keyboards..."
                autoFocus
                className={`w-full pl-9 pr-8 py-2 border rounded-xl text-xs focus:outline-none focus:border-indigo-500 ${
                  isDarkMode
                    ? 'bg-[#121524] border-white/[0.08] text-white placeholder-slate-400'
                    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
