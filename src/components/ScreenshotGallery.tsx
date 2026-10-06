import React, { useRef, useState } from 'react';
import { ScreenshotItem } from '../types/app';
import { ChevronLeft, ChevronRight, Maximize2, X, Smartphone, Sparkles } from 'lucide-react';

interface ScreenshotGalleryProps {
  screenshots: ScreenshotItem[];
  isDarkMode?: boolean;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({
  screenshots,
  isDarkMode,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<ScreenshotItem | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section className="my-6 w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3
              className={`text-sm sm:text-base font-extrabold font-['Space_Grotesk',sans-serif] flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span>অ্যাপ স্ক্রিনশট গ্যালারি</span>
              <span className="text-xs font-normal text-slate-400">
                ({screenshots.length} Images)
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              আনুভূমিকভাবে সোয়াইপ বা স্ক্রল করে প্রতিটি ফিচার প্রিভিউ দেখুন
            </p>
          </div>
        </div>

        {/* Desktop Arrow Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#121524] border-white/[0.08] text-slate-300 hover:text-white hover:bg-[#181d33]'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-[#121524] border-white/[0.08] text-slate-300 hover:text-white hover:bg-[#181d33]'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Reel */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth w-full"
      >
        {screenshots.map((screen, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(screen)}
            className={`group relative flex-none w-[180px] sm:w-[210px] aspect-[9/19] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 snap-start border shadow-md hover:shadow-xl hover:-translate-y-1 ${
              isDarkMode
                ? 'bg-[#0f111d] border-white/[0.1] hover:border-indigo-400/50'
                : 'bg-slate-900 border-slate-200/90 hover:border-indigo-300'
            }`}
          >
            {/* Screenshot Real Image */}
            {screen.imageUrl ? (
              <img
                src={screen.imageUrl}
                alt={screen.title || `Likhon Screenshot ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs">
                No Preview
              </div>
            )}

            {/* Gradient Overlay & Title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              {/* Top Tag */}
              <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 font-mono">
                  #{idx + 1}
                </span>

                <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div>
                <p className="text-white font-bold text-xs leading-tight drop-shadow-md">
                  {screen.title || `Screenshot ${idx + 1}`}
                </p>
                {screen.desc && (
                  <p className="text-white/75 text-[10px] line-clamp-1 mt-0.5 drop-shadow-sm">
                    {screen.desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full max-h-[92vh] flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Frame & Image */}
            <div className="w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[78vh] object-contain mx-auto"
              />
            </div>

            {/* Caption */}
            <div className="mt-3 text-center text-white px-4">
              <h4 className="font-bold text-sm sm:text-base">{selectedImage.title}</h4>
              {selectedImage.desc && (
                <p className="text-xs text-slate-300 mt-1">{selectedImage.desc}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
