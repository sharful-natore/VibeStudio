import React, { useState, useEffect } from 'react';
import { AppItem } from '../types/app';
import {
  Download,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface HeroCarouselProps {
  featuredApps: AppItem[];
  onSelectApp: (app: AppItem) => void;
  onDownloadApk: (app: AppItem) => void;
  isDarkMode?: boolean;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  featuredApps,
  onSelectApp,
  onDownloadApk,
  isDarkMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredApps.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredApps.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredApps.length]);

  if (!featuredApps || featuredApps.length === 0) return null;

  const activeApp = featuredApps[currentIndex] || featuredApps[0];

  return (
    <section
      className={`hero-card w-full max-w-full overflow-hidden rounded-2xl sm:rounded-3xl my-3.5 transition-all duration-300 relative box-border ${
        isDarkMode
          ? 'bg-[#101322] border border-indigo-500/25 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(99,102,241,0.15)] text-white'
          : 'bg-white border border-slate-200/90 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] text-slate-900'
      }`}
    >
      {/* Decorative ambient aura in dark mode */}
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_65%)]" />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 p-4 sm:p-6">
        
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            {/* Spotlight / Featured Tag */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm shrink-0 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 text-white shadow-indigo-600/30'
                  : 'bg-indigo-600 text-white shadow-indigo-600/20'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <Sparkles className="w-3 h-3 text-cyan-200" />
              <span>{activeApp.badge || 'Featured App'}</span>
            </span>

            {/* Category Badge */}
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg truncate ${
                isDarkMode
                  ? 'bg-white/[0.06] text-slate-300 border border-white/[0.08]'
                  : 'bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {activeApp.category}
            </span>
          </div>

          {/* Rating Pill */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border shrink-0 ${
              isDarkMode
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-amber-50 text-amber-700 border-amber-300/60'
            }`}
          >
            <span>{activeApp.rating}</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
        </div>

        {/* App Title & Description */}
        <div className="flex items-start gap-3.5 sm:gap-5 my-2">
          {/* App Squircle Icon */}
          <div
            onClick={() => onSelectApp(activeApp)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${activeApp.color} p-[2px] shrink-0 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200`}
          >
            <div
              className={`w-full h-full rounded-[14px] flex items-center justify-center text-3xl sm:text-4xl ${
                isDarkMode ? 'bg-[#0c0e18]' : 'bg-slate-950 text-white'
              }`}
            >
              {activeApp.iconSymbol || '📱'}
            </div>
          </div>

          {/* Title & Description Details */}
          <div className="flex-1 min-w-0">
            <h2
              onClick={() => onSelectApp(activeApp)}
              className={`text-base sm:text-lg lg:text-xl font-extrabold truncate cursor-pointer transition-colors font-['Space_Grotesk',sans-serif] ${
                isDarkMode
                  ? 'text-white hover:text-indigo-300'
                  : 'text-slate-900 hover:text-indigo-600'
              }`}
            >
              {activeApp.title}
            </h2>
            
            <p className="text-xs text-indigo-500 dark:text-cyan-400 font-bold flex items-center gap-1.5 mt-0.5">
              <span>By VibeStudio</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span className="text-slate-400 dark:text-slate-600 font-normal">•</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Verified APK</span>
              </span>
            </p>

            {/* Light brief description */}
            <p
              className={`text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {activeApp.subtitle}
            </p>

            {/* Highlighted Key Features Tags */}
            {activeApp.tags && activeApp.tags.length > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 mt-2.5 flex-wrap">
                {activeApp.tags.slice(0, 4).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      isDarkMode
                        ? 'bg-white/[0.05] text-slate-300 border border-white/[0.06]'
                        : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Compact Footer: Size, Version & Action Buttons */}
        <div
          className={`mt-4 pt-3.5 border-t flex items-center justify-between gap-3 flex-wrap ${
            isDarkMode ? 'border-white/[0.08]' : 'border-slate-100'
          }`}
        >
          {/* Size & Version Badges */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span
              className={`font-mono px-2.5 py-1 rounded-lg text-xs font-semibold ${
                isDarkMode
                  ? 'bg-white/[0.07] border border-white/[0.08] text-slate-200'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {activeApp.version}
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span
              className={`font-mono px-2.5 py-1 rounded-lg text-xs font-semibold ${
                isDarkMode
                  ? 'bg-white/[0.07] border border-white/[0.08] text-slate-200'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {activeApp.size}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectApp(activeApp)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border active:scale-95 ${
                isDarkMode
                  ? 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border-white/[0.1]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Details</span>
            </button>

            <button
              onClick={() => onDownloadApk(activeApp)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </button>
          </div>
        </div>

      </div>

      {/* Slide Navigation Dots Bar */}
      {featuredApps.length > 1 && (
        <div
          className={`px-4 sm:px-6 py-2 flex items-center justify-between border-t ${
            isDarkMode
              ? 'bg-black/35 border-white/[0.06]'
              : 'bg-slate-50/80 border-slate-100'
          }`}
        >
          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {featuredApps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? isDarkMode
                      ? 'w-6 bg-gradient-to-r from-indigo-400 to-cyan-400'
                      : 'w-6 bg-indigo-600'
                    : isDarkMode
                    ? 'w-1.5 bg-white/20 hover:bg-white/40'
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + featuredApps.length) % featuredApps.length)
              }
              className={`p-1 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-white/10'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Previous App"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % featuredApps.length)
              }
              className={`p-1 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-white/10'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Next App"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
