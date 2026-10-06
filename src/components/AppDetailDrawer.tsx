import React, { useState } from 'react';
import { AppItem, ScreenshotItem } from '../types/app';
import { QRCodeSvg } from './QRCodeSvg';
import {
  X,
  Download,
  Star,
  ShieldCheck,
  Share2,
  Bookmark,
  QrCode,
  ArrowLeft,
  Smartphone,
  Lock,
  FileText,
  Layers,
  Sparkles,
} from 'lucide-react';

interface AppDetailDrawerProps {
  app: AppItem | null;
  onClose: () => void;
  onDownloadApk: (app: AppItem) => void;
  isSaved: boolean;
  onToggleSave: (appId: string) => void;
  isDarkMode?: boolean;
}

export const AppDetailDrawer: React.FC<AppDetailDrawerProps> = ({
  app,
  onClose,
  onDownloadApk,
  isSaved,
  onToggleSave,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'qrcode'>('overview');
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem | null>(null);

  if (!app) return null;

  const handleShare = () => {
    const siteUrl = 'https://vibestudio.github.io/';
    if (navigator.share) {
      navigator.share({
        title: `${app.title} on VibeStudio`,
        text: `Download ${app.title} (${app.version}) APK directly from VibeStudio!`,
        url: siteUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(siteUrl);
      alert(`Link to ${app.title} copied: ${siteUrl}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity duration-200">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div
        className={`relative w-full max-w-2xl h-full border-l shadow-2xl overflow-y-auto flex flex-col justify-between z-10 transition-transform duration-200 ${
          isDarkMode
            ? 'bg-[#0a0c14] border-white/[0.08] text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          {/* Top Sticky Header */}
          <div
            className={`sticky top-0 z-20 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 border-b ${
              isDarkMode
                ? 'bg-[#0a0c14]/95 border-white/[0.08]'
                : 'bg-white/95 border-slate-200/80'
            }`}
          >
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                isDarkMode
                  ? 'hover:bg-white/[0.08] text-slate-300'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab(activeTab === 'qrcode' ? 'overview' : 'qrcode')}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  activeTab === 'qrcode'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : isDarkMode
                    ? 'border-white/[0.08] text-slate-300 hover:bg-white/[0.06]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title="Scan QR to download on mobile"
              >
                <QrCode className="w-4 h-4" />
              </button>

              <button
                onClick={handleShare}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-white/[0.08] text-slate-300 hover:bg-white/[0.06]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title="Share App"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleSave(app.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-rose-500/15 text-rose-500 border-rose-500/30'
                    : isDarkMode
                    ? 'border-white/[0.08] text-slate-300 hover:bg-white/[0.06]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title={isSaved ? 'In Saved' : 'Save App'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-white/[0.08] text-slate-400 hover:text-white'
                    : 'border-slate-200 text-slate-400 hover:text-slate-700'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* App Header Presentation */}
          <div
            className={`p-6 pb-4 border-b ${
              isDarkMode
                ? 'bg-gradient-to-b from-[#111424] to-[#0a0c14] border-white/[0.08]'
                : 'bg-gradient-to-b from-slate-50 to-white border-slate-200/80'
            }`}
          >
            <div className="flex items-start gap-4">
              
              {/* App Icon */}
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${app.color} p-[2px] shrink-0 shadow-lg`}>
                <div
                  className={`w-full h-full rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl ${
                    isDarkMode ? 'bg-[#0b0d16]' : 'bg-slate-950 text-white'
                  }`}
                >
                  {app.iconSymbol || '📱'}
                </div>
              </div>

              {/* Title & Author */}
              <div className="flex-1 min-w-0">
                <h1
                  className={`text-xl sm:text-2xl font-extrabold leading-tight font-['Space_Grotesk',sans-serif] ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {app.title}
                </h1>

                <p className="text-xs sm:text-sm text-indigo-500 dark:text-cyan-400 font-bold mt-1">
                  By {app.developer} • {app.category}
                </p>

                <p
                  className={`text-xs mt-1 line-clamp-1 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {app.subtitle}
                </p>
              </div>

            </div>

            {/* Metrics Strip */}
            <div
              className={`mt-5 grid grid-cols-4 gap-2 text-center py-3 px-3 rounded-2xl border ${
                isDarkMode
                  ? 'bg-[#121524] border-white/[0.08]'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div
                  className={`flex items-center justify-center gap-1 font-bold text-xs sm:text-sm ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <span>{app.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rating</div>
              </div>

              <div>
                <div
                  className={`font-bold text-xs sm:text-sm ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {app.downloads || '100K+'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Downloads</div>
              </div>

              <div>
                <div
                  className={`font-bold text-xs sm:text-sm font-mono ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {app.size}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">File Size</div>
              </div>

              <div>
                <div
                  className={`font-bold text-xs sm:text-sm font-mono ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {app.version}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Version</div>
              </div>
            </div>

            {/* Direct APK Download Button */}
            <div className="mt-4">
              <button
                onClick={() => onDownloadApk(app)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all transform active:scale-98 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download APK ({app.size})</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className={`flex border-b px-6 ${
              isDarkMode
                ? 'border-white/[0.08] bg-[#0d101c]'
                : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-500 dark:text-cyan-400'
                  : isDarkMode
                  ? 'border-transparent text-slate-400 hover:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Screenshots & Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'features'
                  ? 'border-indigo-500 text-indigo-500 dark:text-cyan-400'
                  : isDarkMode
                  ? 'border-transparent text-slate-400 hover:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Features & Release Notes
            </button>
            <button
              onClick={() => setActiveTab('qrcode')}
              className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'qrcode'
                  ? 'border-indigo-500 text-indigo-500 dark:text-cyan-400'
                  : isDarkMode
                  ? 'border-transparent text-slate-400 hover:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Mobile QR Code
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <>
                {/* Screenshots Carousel */}
                {app.screenshots && app.screenshots.length > 0 && (
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-indigo-400" />
                      <span>Interface & Feature Previews</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {app.screenshots.map((screen, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedScreenshot(screen)}
                          className={`rounded-2xl bg-gradient-to-br ${
                            screen.gradient || 'from-slate-800 to-slate-900'
                          } p-4 text-white border border-white/10 shadow-md cursor-pointer hover:scale-[1.02] transition-transform`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
                            <Sparkles className="w-4 h-4 text-cyan-300" />
                          </div>
                          <h4 className="font-bold text-sm text-white mb-1">{screen.title}</h4>
                          <p className="text-xs text-white/80 leading-relaxed">{screen.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About this App */}
                <div>
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>About this App</span>
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {app.subtitle}
                  </p>
                </div>

                {/* Privacy & Safety Badges */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isDarkMode
                      ? 'bg-[#121524] border-white/[0.08]'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% Verified APK by VibeStudio</span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Clean signature, zero ads, no telemetry, and safe offline storage.
                  </p>
                </div>
              </>
            )}

            {/* FEATURES TAB */}
            {activeTab === 'features' && (
              <div className="space-y-5">
                {/* Feature Bullet Points */}
                {app.features && app.features.length > 0 && (
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Key Features</span>
                    </h3>
                    <div className="space-y-2.5">
                      {app.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed ${
                            isDarkMode
                              ? 'bg-[#121524] border-white/[0.08] text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Release Notes */}
                {app.releaseNotes && (
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <Lock className="w-4 h-4 text-indigo-400" />
                      <span>Release Notes ({app.version})</span>
                    </h3>
                    <pre
                      className={`p-4 rounded-2xl border font-mono text-xs whitespace-pre-wrap leading-relaxed ${
                        isDarkMode
                          ? 'bg-[#121524] border-white/[0.08] text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {app.releaseNotes}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* QR CODE TAB */}
            {activeTab === 'qrcode' && (
              <div className="text-center py-4 space-y-4">
                <div className="p-4 bg-white rounded-3xl inline-block shadow-lg border border-slate-200 mx-auto">
                  <QRCodeSvg value={app.downloadUrl} size={180} />
                </div>
                <div>
                  <h4
                    className={`font-bold text-sm ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Scan with Your Phone
                  </h4>
                  <p
                    className={`text-xs mt-1 max-w-xs mx-auto ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Point your camera or QR scanner at the code to download the APK directly on Android.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Drawer Bottom Bar */}
        <div
          className={`p-4 border-t flex items-center justify-between gap-3 ${
            isDarkMode ? 'border-white/[0.08] bg-[#0c0f1c]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="text-xs">
            <span
              className={`font-bold block ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {app.title}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">{app.size}</span>
          </div>

          <button
            onClick={() => onDownloadApk(app)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Install APK</span>
          </button>
        </div>

      </div>

      {/* Screenshot Lightbox Modal */}
      {selectedScreenshot && (
        <div
          onClick={() => setSelectedScreenshot(null)}
          className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-md w-full rounded-3xl p-6 text-white bg-gradient-to-br ${
              selectedScreenshot.gradient || 'from-slate-900 to-indigo-950'
            } border border-white/20 shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base">{selectedScreenshot.title}</h3>
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-white/90 leading-relaxed mb-6">
              {selectedScreenshot.desc}
            </p>
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="w-full py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-white/90"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
