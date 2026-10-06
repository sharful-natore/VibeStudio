import React, { useState, useEffect } from 'react';
import { AppItem } from '../types/app';
import {
  X,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface ApkDownloadModalProps {
  app: AppItem | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  app,
  onClose,
  isDarkMode,
}) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speed, setSpeed] = useState('7.2 MB/s');

  useEffect(() => {
    if (!app) return;
    setProgress(0);
    setIsCompleted(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }
        const inc = Math.floor(Math.random() * 25) + 20;
        return Math.min(100, prev + inc);
      });
    }, 280);

    return () => clearInterval(interval);
  }, [app]);

  useEffect(() => {
    if (isCompleted && app) {
      const timer = setTimeout(() => {
        window.open(app.downloadUrl, '_blank');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, app]);

  if (!app) return null;

  const handleManualTrigger = () => {
    window.open(app.downloadUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-md border rounded-3xl p-6 sm:p-7 shadow-2xl transition-colors ${
          isDarkMode
            ? 'bg-[#0f1220] border-white/[0.08] text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors cursor-pointer ${
            isDarkMode
              ? 'hover:bg-white/[0.08] text-slate-400 hover:text-white'
              : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Title & Icon */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.color} p-[2px] shrink-0 shadow-md`}>
            <div
              className={`w-full h-full rounded-[14px] flex items-center justify-center text-3xl ${
                isDarkMode ? 'bg-[#0b0d16]' : 'bg-slate-950 text-white'
              }`}
            >
              {app.iconSymbol || '📦'}
            </div>
          </div>

          <div>
            <h3
              className={`font-extrabold text-base leading-tight font-['Space_Grotesk',sans-serif] ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {isCompleted ? 'APK Download Ready!' : 'Downloading ' + app.title.split(' ')[0]}
            </h3>
            <p className="text-xs text-indigo-500 dark:text-cyan-400 font-semibold mt-0.5">
              {app.version} • {app.size}
            </p>
          </div>
        </div>

        {/* Progress Box */}
        <div
          className={`mb-5 p-4 rounded-2xl border ${
            isDarkMode
              ? 'bg-[#141728] border-white/[0.08]'
              : 'bg-slate-50 border-slate-200/80'
          }`}
        >
          <div
            className={`flex items-center justify-between text-xs font-mono mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <span>{isCompleted ? '100% Downloaded' : `${progress}% • ${speed}`}</span>
            <span>{app.size}</span>
          </div>

          {/* Animated Progress Bar */}
          <div
            className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 ${
              isDarkMode ? 'bg-[#0a0c14]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-200 ${
                isCompleted
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-400 animate-pulse'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-500 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified safe by {app.developer}</span>
          </div>
        </div>

        {/* Status & Actions */}
        {isCompleted ? (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>Direct APK file transfer started automatically!</span>
            </div>

            <button
              onClick={handleManualTrigger}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Tap here if download didn't start</span>
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs flex items-center gap-2 font-medium">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-500 shrink-0" />
            <span>Connecting to GitHub release server...</span>
          </div>
        )}

        {/* Android Installation Tip */}
        <div
          className={`mt-4 pt-3.5 border-t text-left text-[11px] ${
            isDarkMode ? 'border-white/[0.08] text-slate-400' : 'border-slate-100 text-slate-500'
          }`}
        >
          When the download completes, tap the notification on your phone and select <strong>Install</strong>.
        </div>

      </div>
    </div>
  );
};
