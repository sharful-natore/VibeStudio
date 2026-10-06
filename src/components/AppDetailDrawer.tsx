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
  Maximize2,
  CheckCircle2,
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
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${app.color} p-[2px] shrink-0 shadow-lg overflow-hidden`}>
                {app.logoUrl ? (
                  <img
                    src={app.logoUrl}
                    alt={app.title}
                    className="w-full h-full object-cover rounded-[22px]"
                  />
                ) : (
                  <div
                    className={`w-full h-full rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl ${
                      isDarkMode ? 'bg-[#0b0d16]' : 'bg-slate-950 text-white'
                    }`}
                  >
                    {app.iconSymbol || '⌨️'}
                  </div>
                )}
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

                <p className="text-xs sm:text-sm text-indigo-500 dark:text-cyan-400 font-bold mt-1 flex items-center gap-1">
                  <span>By {app.developer}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-500">• {app.category}</span>
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
                  {app.downloads || '250K+'}
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
                {/* Horizontal Scrollable Screenshots Reel */}
                {app.screenshots && app.screenshots.length > 0 && (
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-between ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-indigo-400" />
                        <span>অ্যাপ স্ক্রিনশট ({app.screenshots.length} Images)</span>
                      </span>
                      <span className="text-[10px] lowercase text-slate-400">← swipe horizontally →</span>
                    </h3>

                    {/* Horizontally scrollable reel */}
                    <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory">
                      {app.screenshots.map((screen, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedScreenshot(screen)}
                          className={`group relative flex-none w-[170px] sm:w-[190px] aspect-[9/19] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 snap-start border shadow-md hover:shadow-xl hover:scale-[1.02] ${
                            isDarkMode
                              ? 'bg-slate-950 border-white/[0.1] hover:border-indigo-400/50'
                              : 'bg-slate-900 border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {screen.imageUrl ? (
                            <img
                              src={screen.imageUrl}
                              alt={screen.title || `Screenshot ${idx + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs text-white">
                              Preview
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                            <div className="flex justify-end">
                              <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Maximize2 className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                            <p className="text-white font-bold text-xs drop-shadow-md">
                              {screen.title || `Screenshot ${idx + 1}`}
                            </p>
                          </div>
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
                    {app.subtitle} — লিখন বাংলা কীবোর্ড একটি স্মার্ট, দ্রুত এবং সম্পূর্ণ অফলাইন বাংলা ও ইংরেজি কীবোর্ড। এতে রয়েছে বিল্ট-ইন এআই অ্যাসিস্ট্যান্ট, জনপ্রিয় সব লেআউট, লিকুইড ফ্রস্টেড গ্লাস থিম এবং ৩টি ভিন্ন ক্যালেন্ডারের সমন্বিত ডেট টুল।
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
                    Clean signature, zero ads, no telemetry, and safe offline storage with local Room DB.
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
                      <span>Key Features (মূল ফিচারসমূহ)</span>
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
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full max-h-[92vh] flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Frame & Image */}
            <div className="w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              {selectedScreenshot.imageUrl ? (
                <img
                  src={selectedScreenshot.imageUrl}
                  alt={selectedScreenshot.title}
                  className="w-full h-auto max-h-[78vh] object-contain mx-auto"
                />
              ) : (
                <div className="p-8 text-white text-center">No image</div>
              )}
            </div>

            {/* Caption */}
            <div className="mt-3 text-center text-white px-4">
              <h4 className="font-bold text-sm sm:text-base">{selectedScreenshot.title}</h4>
              {selectedScreenshot.desc && (
                <p className="text-xs text-slate-300 mt-1">{selectedScreenshot.desc}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
