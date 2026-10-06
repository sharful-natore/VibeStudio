import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, X } from 'lucide-react';

interface PWAInstallBannerProps {
  onOpenIOSGuide: () => void;
  isDarkMode?: boolean;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onOpenIOSGuide, isDarkMode }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-3 sm:p-4 shadow-sm my-2.5 transition-all w-full max-w-full border ${
        isDarkMode
          ? 'bg-[#101322] border-white/[0.08] text-white'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        
        {/* Left Side: VibeStudio Squircle & Prompt */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px] shrink-0">
            <div
              className={`w-full h-full rounded-[9px] flex items-center justify-center font-bold text-xs text-white ${
                isDarkMode ? 'bg-[#0b0d14]' : 'bg-slate-950'
              }`}
            >
              V
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3
                className={`font-bold text-xs sm:text-sm truncate ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Install VibeStudio PWA
              </h3>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-indigo-500/10 text-indigo-500 dark:text-cyan-400">
                Offline Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              Install to home screen for instant 1-tap APK downloads.
            </p>
          </div>
        </div>

        {/* Right Side: Install Button & Dismiss */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {isInstallable && (
            <button
              onClick={install}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          )}

          {isIOS && (
            <button
              onClick={onOpenIOSGuide}
              className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-colors ${
                isDarkMode
                  ? 'border-white/[0.08] text-slate-200 hover:bg-white/[0.06]'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              iOS
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
