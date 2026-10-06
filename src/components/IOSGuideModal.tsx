import React from 'react';
import { X, Share, PlusSquare, Smartphone } from 'lucide-react';

interface IOSGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSGuideModal: React.FC<IOSGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="font-extrabold text-lg text-white">Install VibeStudio on iOS</h3>
          <p className="text-xs text-slate-400 mt-1">
            Follow these two simple steps in Safari browser:
          </p>
        </div>

        <div className="space-y-3 text-xs text-slate-200">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
              <Share className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">1. Tap Share Button</p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Tap the Share icon in the Safari bottom navigation bar.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
              <PlusSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">2. Add to Home Screen</p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Scroll down and tap <strong>Add to Home Screen</strong>.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
