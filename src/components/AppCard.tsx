import React from 'react';
import { AppItem } from '../types/app';
import { Download, Star, Bookmark, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  rank?: number;
  onSelectApp: (app: AppItem) => void;
  onDownloadApk: (app: AppItem) => void;
  isSaved: boolean;
  onToggleSave: (appId: string) => void;
  isDarkMode?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  rank,
  onSelectApp,
  onDownloadApk,
  isSaved,
  onToggleSave,
  isDarkMode,
}) => {
  return (
    <div
      onClick={() => onSelectApp(app)}
      className={`app-card group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer active:scale-[0.99] hover:-translate-y-0.5 border ${
        isDarkMode
          ? 'bg-[#111422] border-white/[0.08] hover:border-indigo-500/50 hover:bg-[#15192c] shadow-[0_6px_25px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_35px_-5px_rgba(99,102,241,0.25)] text-white'
          : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-md shadow-sm text-slate-900'
      }`}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start gap-3.5">
          
          {/* Optional Rank Number for Trending */}
          {rank !== undefined && (
            <span
              className={`font-extrabold text-sm font-['Space_Grotesk',sans-serif] pt-1 ${
                isDarkMode ? 'text-slate-500' : 'text-slate-300'
              }`}
            >
              #{rank}
            </span>
          )}

          {/* Squircle App Logo */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${app.color} p-[2px] shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200 overflow-hidden`}
          >
            {app.logoUrl ? (
              <img
                src={app.logoUrl}
                alt={app.title}
                className="w-full h-full object-cover rounded-[14px]"
              />
            ) : (
              <div
                className={`w-full h-full rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl ${
                  isDarkMode ? 'bg-[#0b0d14]' : 'bg-slate-950 text-white'
                }`}
              >
                {app.iconSymbol || '⌨️'}
              </div>
            )}
          </div>

          {/* Title, Author & Wishlist Bookmark */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <h3
                className={`font-extrabold text-sm sm:text-base transition-colors truncate font-['Space_Grotesk',sans-serif] ${
                  isDarkMode
                    ? 'text-white group-hover:text-indigo-300'
                    : 'text-slate-900 group-hover:text-indigo-600'
                }`}
              >
                {app.title}
              </h3>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(app.id);
                }}
                title={isSaved ? 'Remove from Saved' : 'Save App'}
                className={`p-1 transition-colors shrink-0 cursor-pointer ${
                  isSaved
                    ? 'text-rose-500'
                    : isDarkMode
                    ? 'text-slate-500 hover:text-rose-400'
                    : 'text-slate-400 hover:text-rose-500'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Author & Category */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-indigo-500 dark:text-cyan-400 font-bold flex items-center gap-0.5 truncate">
                <span>VibeStudio</span>
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0 inline" />
              </span>
              <span className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>•</span>
              <span
                className={`text-[11px] truncate font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {app.category}
              </span>
            </div>

            {/* Badges / Rating Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-2 text-xs flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 font-bold px-2 py-0.5 rounded-md text-[11px] border ${
                  isDarkMode
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-amber-50 text-amber-700 border-amber-300/60'
                }`}
              >
                <span>{app.rating}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>

              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                  isDarkMode
                    ? 'bg-white/[0.07] border border-white/[0.08] text-slate-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200/60'
                }`}
              >
                {app.size}
              </span>

              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                  isDarkMode
                    ? 'bg-white/[0.07] border border-white/[0.08] text-slate-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                {app.version}
              </span>
            </div>
          </div>

        </div>

        {/* Light Brief Description */}
        <p
          className={`text-xs line-clamp-2 mt-3 leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {app.subtitle}
        </p>

        {/* Mini Screenshot Thumbnails Strip */}
        {app.screenshots && app.screenshots.length > 0 && (
          <div className="flex items-center gap-2 mt-3 overflow-hidden">
            {app.screenshots.slice(0, 4).map((screen, idx) => (
              <div
                key={idx}
                className="w-12 h-20 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shrink-0 bg-slate-900 shadow-xs"
              >
                {screen.imageUrl ? (
                  <img
                    src={screen.imageUrl}
                    alt={screen.title || `Screenshot ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800" />
                )}
              </div>
            ))}
            <div
              className={`text-[10px] font-semibold px-2 py-1 rounded-md ${
                isDarkMode ? 'text-slate-400 bg-white/5' : 'text-slate-500 bg-slate-100'
              }`}
            >
              +{app.screenshots.length} Screenshots
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div
        className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 ${
          isDarkMode ? 'border-white/[0.08]' : 'border-slate-100'
        }`}
      >
        <span
          className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
            isDarkMode
              ? 'text-slate-400 group-hover:text-indigo-300'
              : 'text-slate-500 group-hover:text-indigo-600'
          }`}
        >
          <span>View Screenshots & Features</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownloadApk(app);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-sm shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>APK</span>
        </button>
      </div>

    </div>
  );
};
