import React, { useState, useEffect, useMemo } from 'react';
import { AppItem, SortOption } from './types/app';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryFilters } from './components/CategoryFilters';
import { AppCard } from './components/AppCard';
import { AppDetailDrawer } from './components/AppDetailDrawer';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { IOSGuideModal } from './components/IOSGuideModal';
import { DeveloperFooter } from './components/DeveloperFooter';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  Sparkles,
  Search,
  Bookmark,
  WifiOff,
  TrendingUp,
} from 'lucide-react';

// Reliable app catalog data with VibeStudio developer branding
const INITIAL_APPS: AppItem[] = [
  {
    id: "likhon-keyboard",
    title: "Likhon Bangla Keyboard (লিখন বাংলা কীবোর্ড)",
    subtitle: "AI Smart Bangla & English Keyboard (এআই স্মার্ট বাংলা ও ইংরেজি কীবোর্ড)",
    version: "v2.4.0",
    size: "18.5 MB",
    category: "Keyboards & Productivity",
    rating: 4.9,
    reviewsCount: "14.8K",
    downloads: "250K+",
    featured: true,
    badge: "Featured #1",
    downloadUrl: "https://github.com/shorifbd24/likhon-keyboard/releases/download/v2.4.0/likhon_keyboard_v2.4.0.apk",
    developer: "VibeStudio",
    updatedDate: "October 2026",
    minAndroid: "Android 7.0+",
    color: "from-indigo-600 via-blue-600 to-cyan-500",
    iconSymbol: "⌨️",
    features: [
      "Integrated AI Assistant for Bangla & English Proofreading, Grammar Fix, Tone Change & Translation.",
      "All Popular Layouts: Avro Phonetic, Jatiyo, Probhat, Unijoy & Gboard.",
      "Frosted Liquid Glass & Custom Photo Wallpaper Themes.",
      "100% Offline & Private (Zero keylogging, local Room DB memory).",
      "Tri-Calendar Date Tool (Bangla Academy, Gregorian & UmAlQura Hijri dates in 1-tap).",
      "Offline Voice Typing, Glide Gesture Typing, and Smart Clipboard Manager."
    ],
    releaseNotes: "v2.4.0 Release Notes:\n• Upgraded AI Grammar & Proofreading engine with faster response times.\n• Introduced Liquid Glass Frosted Glass themes and dynamic wallpaper color extraction.\n• Updated Bangla Academy 2026 calendar algorithm for 100% precision.\n• Performance optimizations for low-memory devices and reduced latency.",
    screenshots: [
      {
        "title": "AI Assistant & Proofreading",
        "desc": "Grammar fix, tone changer, and instant Bangla-English translation directly inside your keyboard.",
        "gradient": "from-blue-900 to-slate-900",
        "icon": "sparkles"
      },
      {
        "title": "Avro, Jatiyo & Probhat Layouts",
        "desc": "Switch effortlessly between phonetic typing and traditional official layouts.",
        "gradient": "from-indigo-900 to-purple-950",
        "icon": "keyboard"
      },
      {
        "title": "Frosted Liquid Glass Themes",
        "desc": "Beautiful translucent glassmorphic themes with full photo wallpaper customization.",
        "gradient": "from-cyan-900 to-blue-950",
        "icon": "palette"
      },
      {
        "title": "Tri-Calendar & Voice Typing",
        "desc": "Instant 1-tap view of Bangla Academy, Gregorian & Hijri dates + accurate offline voice input.",
        "gradient": "from-emerald-900 to-teal-950",
        "icon": "calendar"
      }
    ],
    tags: ["Bangla", "AI Assistant", "Avro", "Jatiyo", "Probhat", "Offline", "Keyboard"]
  },
  {
    id: "toolsmate",
    title: "ToolsMate",
    subtitle: "All-in-One Smart Utility Toolkit",
    version: "v1.0.0",
    size: "8.2 MB",
    category: "Utilities & Tools",
    rating: 4.7,
    reviewsCount: "8.3K",
    downloads: "80K+",
    featured: true,
    badge: "Top Utility",
    downloadUrl: "https://github.com/shorifbd24/toolsmate/releases/download/v1.0.0/toolsmate_v1.0.0.apk",
    developer: "VibeStudio",
    updatedDate: "September 2026",
    minAndroid: "Android 6.0+",
    color: "from-emerald-500 via-teal-600 to-cyan-600",
    iconSymbol: "🛠️",
    features: [
      "Unit & Currency Converter with real-time exchange rates.",
      "QR Code & Barcode Scanner with History.",
      "Smart Compass, Speedometer & Device Sensor Monitor.",
      "Clean, ad-free UI with dark mode support."
    ],
    releaseNotes: "v1.0.0 Initial Release:\n• Launched 25+ essential daily micro-utilities in a single lightweight APK.\n• Offline QR scanner with instant copy and URL launch.\n• High-precision sensor monitor (GPS, Accelerometer, Magnetometer).",
    screenshots: [
      {
        "title": "Unit & Live Currency Converter",
        "desc": "Convert currencies and physical units instantly with offline cache.",
        "gradient": "from-emerald-950 to-slate-900",
        "icon": "repeat"
      },
      {
        "title": "QR & Barcode Scanner",
        "desc": "Lightning fast camera scanning with history export.",
        "gradient": "from-teal-950 to-cyan-950",
        "icon": "qr-code"
      }
    ],
    tags: ["Converter", "QR Scanner", "Compass", "Utilities", "Speedometer"]
  },
  {
    id: "financenote",
    title: "Finance Note",
    subtitle: "Smart Expense & Budget Manager",
    version: "v1.2.0",
    size: "11.4 MB",
    category: "Finance",
    rating: 4.8,
    reviewsCount: "11.1K",
    downloads: "120K+",
    featured: true,
    badge: "Finance Essential",
    downloadUrl: "https://github.com/shorifbd24/financenote/releases/download/v1.2.0/financenote_v1.2.0.apk",
    developer: "VibeStudio",
    updatedDate: "August 2026",
    minAndroid: "Android 7.0+",
    color: "from-amber-500 via-orange-600 to-rose-600",
    iconSymbol: "📊",
    features: [
      "Instant income and daily expense tracking with category charts.",
      "Monthly budget limits with smart overspend alerts.",
      "Offline local SQLite database with JSON/CSV export option.",
      "Biometric PIN/Fingerprint lock for private financial data."
    ],
    releaseNotes: "v1.2.0 Release Notes:\n• CSV/JSON data backup & cloud export.\n• Enhanced monthly budget forecasting with category breakdown.\n• Fingerprint & PIN security lock improvements.",
    screenshots: [
      {
        "title": "Visual Expense Analytics",
        "desc": "Intuitive ring charts and monthly income vs expense breakdown.",
        "gradient": "from-orange-950 to-amber-950",
        "icon": "pie-chart"
      }
    ],
    tags: ["Finance", "Budget", "Expense Tracker", "SQLite", "Biometric"]
  },
  {
    id: "devpad-code",
    title: "DevPad Code Editor",
    subtitle: "Lightweight Mobile IDE & Markdown Notes",
    version: "v1.5.0",
    size: "14.2 MB",
    category: "Utilities & Tools",
    rating: 4.8,
    reviewsCount: "6.4K",
    downloads: "45K+",
    featured: false,
    badge: "Dev Tool",
    downloadUrl: "https://github.com/shorifbd24/likhon-keyboard/releases/download/v2.4.0/likhon_keyboard_v2.4.0.apk",
    developer: "VibeStudio",
    updatedDate: "September 2026",
    minAndroid: "Android 8.0+",
    color: "from-violet-600 via-purple-600 to-pink-600",
    iconSymbol: "⚡",
    features: [
      "Syntax highlighting for JavaScript, Python, HTML/CSS, JSON & Markdown.",
      "Built-in web preview for HTML/JS projects.",
      "GitHub Gist sync and local folder file tree access.",
      "Distraction-free dark mode with custom font support."
    ],
    releaseNotes: "v1.5.0: Added live HTML/CSS web preview, auto-brackets closing, and line numbers customization.",
    screenshots: [
      {
        "title": "Syntax Highlighting & Autocomplete",
        "desc": "Crisp code editor with multi-language highlighting on mobile.",
        "gradient": "from-violet-950 to-purple-950",
        "icon": "code"
      }
    ],
    tags: ["Code Editor", "IDE", "Developer", "Markdown", "GitHub"]
  },
  {
    id: "audiopulse",
    title: "AudioPulse Music Player",
    subtitle: "FLAC/MP3 Player with 10-Band EQ & Lyric Sync",
    version: "v2.1.0",
    size: "9.8 MB",
    category: "Media & Audio",
    rating: 4.6,
    reviewsCount: "9.2K",
    downloads: "95K+",
    featured: false,
    badge: "Hi-Res Audio",
    downloadUrl: "https://github.com/shorifbd24/toolsmate/releases/download/v1.0.0/toolsmate_v1.0.0.apk",
    developer: "VibeStudio",
    updatedDate: "July 2026",
    minAndroid: "Android 7.0+",
    color: "from-cyan-500 via-blue-600 to-indigo-700",
    iconSymbol: "🎵",
    features: [
      "Lossless FLAC, WAV, and MP3 audio playback engine.",
      "10-Band Graphic Equalizer with bass boost & virtualizer.",
      "Synchronized LRC lyrics viewer with auto-scroll.",
      "Sleep timer & gapless playback mode."
    ],
    releaseNotes: "v2.1.0: Lyric sync improvements, dynamic theme matching album art colors, sleep timer shortcut.",
    screenshots: [
      {
        "title": "10-Band Equalizer",
        "desc": "Fine-tune bass, treble, and acoustic profiles with zero distortion.",
        "gradient": "from-cyan-950 to-blue-950",
        "icon": "sliders"
      }
    ],
    tags: ["Music", "Audio Player", "Equalizer", "FLAC", "Lyrics"]
  }
];

export default function App() {
  const isOnline = useOnlineStatus();
  const [apps, setApps] = useState<AppItem[]>(INITIAL_APPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('rating');
  
  // Navigation tabs: 'explore' | 'trending' | 'saved'
  const [activeNavTab, setActiveNavTab] = useState('explore');

  // Modals & Drawers state
  const [selectedAppDetail, setSelectedAppDetail] = useState<AppItem | null>(null);
  const [downloadingApp, setDownloadingApp] = useState<AppItem | null>(null);
  const [isIOSGuideOpen, setIsIOSGuideOpen] = useState(false);

  // Theme state: STRICT DEFAULT LIGHT THEME!
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('vibestudio_theme');
    return saved === 'dark'; // False (Light Mode) by default unless user previously toggled to dark
  });

  // Saved / Wishlist IDs
  const [savedAppIds, setSavedAppIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vibestudio_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Apply Light/Dark class
  useEffect(() => {
    localStorage.setItem('vibestudio_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Save wishlist changes
  useEffect(() => {
    localStorage.setItem('vibestudio_wishlist', JSON.stringify(savedAppIds));
  }, [savedAppIds]);

  // Load external apps.json if available
  useEffect(() => {
    fetch('./apps.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApps(data);
        }
      })
      .catch(() => {
        // Fallback already pre-loaded
      });
  }, []);

  const handleToggleSave = (appId: string) => {
    setSavedAppIds((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  // Derive categories list dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['All', ...Array.from(set)];
  }, [apps]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [apps]);

  // Featured Apps (Hero carousel)
  const featuredApps = useMemo(() => {
    return apps.filter((a) => a.featured) || apps.slice(0, 3);
  }, [apps]);

  // Filtered & Sorted Apps
  const filteredApps = useMemo(() => {
    let list = [...apps];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.developer.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))) ||
          (a.features && a.features.some((f) => f.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      list = list.filter(
        (a) => a.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Saved/Wishlist filter
    if (activeNavTab === 'saved') {
      list = list.filter((a) => savedAppIds.includes(a.id));
    }

    // Sorting
    list.sort((a, b) => {
      if (activeNavTab === 'trending' || selectedSort === 'rating') {
        return b.rating - a.rating;
      }
      if (selectedSort === 'downloads') {
        const getNum = (str?: string) => parseInt(str?.replace(/[^0-9]/g, '') || '0', 10);
        return getNum(b.downloads) - getNum(a.downloads);
      }
      if (selectedSort === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (selectedSort === 'size') {
        const parseSize = (s: string) => parseFloat(s) || 0;
        return parseSize(a.size) - parseSize(b.size);
      }
      return 0;
    });

    return list;
  }, [apps, searchQuery, selectedCategory, selectedSort, activeNavTab, savedAppIds]);

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden ${isDarkMode ? 'dark bg-[#090b12] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} flex flex-col justify-between transition-colors duration-200 font-['Plus_Jakarta_Sans',sans-serif]`}>
      
      {/* Offline Toast */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 text-xs font-bold py-1 px-3 text-center flex items-center justify-center gap-2 shadow-sm z-50">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline mode: Viewing cached VibeStudio apps.</span>
        </div>
      )}

      {/* Header Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenIOSGuide={() => setIsIOSGuideOpen(true)}
        savedCount={savedAppIds.length}
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pb-20 sm:pb-12 overflow-hidden box-border">
        
        {/* PWA Install Banner */}
        <PWAInstallBanner onOpenIOSGuide={() => setIsIOSGuideOpen(true)} isDarkMode={isDarkMode} />

        {/* Hero Spotlight Banner (Only on 'explore' tab when not searching) */}
        {activeNavTab === 'explore' && !searchQuery && (
          <HeroCarousel
            featuredApps={featuredApps}
            onSelectApp={(app) => setSelectedAppDetail(app)}
            onDownloadApk={(app) => setDownloadingApp(app)}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Category Filters Bar */}
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          categoryCounts={categoryCounts}
          totalCount={apps.length}
          activeNavTab={activeNavTab}
          setActiveNavTab={setActiveNavTab}
          isDarkMode={isDarkMode}
        />

        {/* Wishlist Header View */}
        {activeNavTab === 'saved' && (
          <div
            className={`my-3 p-4 rounded-2xl border flex items-center justify-between shadow-sm transition-colors ${
              isDarkMode
                ? 'bg-[#101322] border-white/[0.08] text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div>
              <h2
                className={`text-base font-bold flex items-center gap-1.5 font-['Space_Grotesk',sans-serif] ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                <Bookmark className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Saved Apps ({filteredApps.length})</span>
              </h2>
              <p
                className={`text-xs mt-0.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Bookmarked APKs ready for quick access.
              </p>
            </div>
            <button
              onClick={() => setActiveNavTab('explore')}
              className="px-3.5 py-1.5 rounded-xl text-xs text-indigo-500 dark:text-cyan-400 font-bold border border-indigo-500/20 hover:bg-indigo-500/10 transition-colors cursor-pointer"
            >
              Browse All
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
          <h2
            className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 font-['Space_Grotesk',sans-serif] ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {activeNavTab === 'trending' ? (
              <>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Top Ranked Applications</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : selectedCategory === 'All'
                    ? 'All Applications'
                    : selectedCategory}
                </span>
              </>
            )}
            <span className="text-xs text-slate-400 font-normal">
              ({filteredApps.length})
            </span>
          </h2>
        </div>

        {/* Apps Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredApps.map((app, index) => (
              <AppCard
                key={app.id}
                app={app}
                rank={activeNavTab === 'trending' ? index + 1 : undefined}
                onSelectApp={(a) => setSelectedAppDetail(a)}
                onDownloadApk={(a) => setDownloadingApp(a)}
                isSaved={savedAppIds.includes(app.id)}
                onToggleSave={handleToggleSave}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        ) : (
          /* Empty Results State */
          <div
            className={`my-10 p-6 rounded-2xl border text-center max-w-sm mx-auto shadow-sm ${
              isDarkMode
                ? 'bg-[#101322] border-white/[0.08] text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Search className="w-5 h-5 text-indigo-500" />
            </div>
            <h3
              className={`font-bold text-sm mb-1 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              No applications found
            </h3>
            <p
              className={`text-xs mb-3 leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {searchQuery
                ? `No apps matching "${searchQuery}".`
                : activeNavTab === 'saved'
                ? 'Your wishlist is empty. Tap the bookmark icon to save.'
                : 'No apps found in this category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setActiveNavTab('explore');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Developer Footer */}
      <DeveloperFooter isDarkMode={isDarkMode} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        savedCount={savedAppIds.length}
        isDarkMode={isDarkMode}
      />

      {/* App Detail Sliding Drawer */}
      <AppDetailDrawer
        app={selectedAppDetail}
        onClose={() => setSelectedAppDetail(null)}
        onDownloadApk={(app) => {
          setSelectedAppDetail(null);
          setDownloadingApp(app);
        }}
        isSaved={selectedAppDetail ? savedAppIds.includes(selectedAppDetail.id) : false}
        onToggleSave={handleToggleSave}
        isDarkMode={isDarkMode}
      />

      {/* APK Download Simulator Modal */}
      <ApkDownloadModal
        app={downloadingApp}
        onClose={() => setDownloadingApp(null)}
        isDarkMode={isDarkMode}
      />

      {/* iOS Installation Guide Modal */}
      <IOSGuideModal
        isOpen={isIOSGuideOpen}
        onClose={() => setIsIOSGuideOpen(false)}
      />

    </div>
  );
}
