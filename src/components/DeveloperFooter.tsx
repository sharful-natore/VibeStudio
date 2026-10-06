import React from 'react';
import { Mail, MessageCircle, Github, Heart, ShieldCheck, ExternalLink } from 'lucide-react';

interface DeveloperFooterProps {
  isDarkMode?: boolean;
}

export const DeveloperFooter: React.FC<DeveloperFooterProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={`mt-16 border-t py-10 px-4 sm:px-6 lg:px-8 text-xs transition-colors ${
        isDarkMode
          ? 'bg-[#080910] border-white/[0.08] text-slate-400'
          : 'bg-white border-slate-200/80 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b ${
            isDarkMode ? 'border-white/[0.08]' : 'border-slate-200/80'
          }`}
        >
          {/* Brand Info */}
          <div className="space-y-2.5 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px]">
                <div
                  className={`w-full h-full rounded-[6px] flex items-center justify-center font-bold text-white font-['Space_Grotesk',sans-serif] ${
                    isDarkMode ? 'bg-[#0b0d14]' : 'bg-[#0a0c13]'
                  }`}
                >
                  V
                </div>
              </div>
              <span
                className={`font-extrabold text-base font-['Space_Grotesk',sans-serif] ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                VibeStudio
              </span>
              <span className="text-[10px] text-indigo-500 dark:text-cyan-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                vibestudio.github.io
              </span>
            </div>
            <p className="leading-relaxed max-w-sm text-slate-500 dark:text-slate-400">
              Handcrafted, high-performance Android applications and offline productivity tools. Built with zero tracking and full privacy by default.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-500 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Malware-Free Signed APK Releases</span>
            </div>
          </div>

          {/* Direct GitHub Releases */}
          <div>
            <h4
              className={`font-bold uppercase tracking-wider text-[11px] mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Featured Release
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/shorifbd24/likhon-keyboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>Likhon Bangla Keyboard (v2.4.0)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shorifbd24/likhon-keyboard/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1 text-slate-500 dark:text-slate-400"
                >
                  <span>All Release Notes & APKs</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Contact & Profile */}
          <div>
            <h4
              className={`font-bold uppercase tracking-wider text-[11px] mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Developer Info
            </h4>
            <p className="mb-3 text-slate-500 dark:text-slate-400">
              Created by <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-900'}>VibeStudio</strong>
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/shorifbd24"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className={`p-2.5 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-white/[0.06] text-slate-300 hover:text-white border-white/[0.08] hover:bg-white/[0.12]'
                    : 'bg-slate-100 text-slate-700 hover:text-indigo-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="mailto:connect.shariful@gmail.com"
                title="Email Developer"
                className={`p-2.5 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-white/[0.06] text-slate-300 hover:text-rose-400 border-white/[0.08] hover:bg-white/[0.12]'
                    : 'bg-slate-100 text-slate-700 hover:text-rose-500 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/?text=Hello%20VibeStudio%20Developer"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Developer"
                className={`p-2.5 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-white/[0.06] text-slate-300 hover:text-emerald-400 border-white/[0.08] hover:bg-white/[0.12]'
                    : 'bg-slate-100 text-slate-700 hover:text-emerald-500 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-2 text-[11px]">
          <p>© {new Date().getFullYear()} VibeStudio. All releases hosted under open-source licenses.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> for Android & PWA Users
          </p>
        </div>

      </div>
    </footer>
  );
};
