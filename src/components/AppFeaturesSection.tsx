import React from 'react';
import {
  Sparkles,
  Keyboard,
  Palette,
  ShieldCheck,
  Calendar,
  Mic,
  Zap,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface AppFeaturesSectionProps {
  isDarkMode?: boolean;
}

export const AppFeaturesSection: React.FC<AppFeaturesSectionProps> = ({ isDarkMode }) => {
  const featureList = [
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      color: "from-indigo-600/20 to-blue-600/20 text-indigo-400 border-indigo-500/30",
      title: "ইন্টিগ্রেটেড এআই অ্যাসিস্ট্যান্ট",
      subtitle: "AI Assistant & Proofreading",
      description:
        "বাংলা ও ইংরেজি লেখার বানান ও ব্যাকরণ সংশোধন, লেখার ভাব (Formal, Polite, Casual) পরিবর্তন এবং রিয়েল-টাইম দ্বিমুখী অনুবাদ সরাসরি কীবোর্ডের ভেতরেই ১-ট্যাপে সম্পন্ন হয়।",
    },
    {
      icon: <Keyboard className="w-5 h-5 text-cyan-400" />,
      color: "from-cyan-600/20 to-teal-600/20 text-cyan-400 border-cyan-500/30",
      title: "সকল জনপ্রিয় লেআউট",
      subtitle: "Avro, Jatiyo, Probhat & Unijoy",
      description:
        "অভ্র ফোনেটিক (Avro Phonetic), সরকারি জাতীয় (Jatiyo), প্রভাত (Probhat), ইউনিজয় (Unijoy) এবং স্ট্যান্ডার্ড জীবোর্ড লেআউট — যেকোনোটিতে সহজেই সুইচ করার পূর্ণ স্বাধীনতা।",
    },
    {
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      color: "from-pink-600/20 to-purple-600/20 text-pink-400 border-pink-500/30",
      title: "লিকুইড ফ্রস্টেড গ্লাস থিম",
      subtitle: "Frosted Glass & Wallpaper Themes",
      description:
        "অত্যাধুনিক ট্রান্সলুসেন্ট গ্লাস স্টাইল, ম্যাটেরিয়াল ইউ ডায়নামিক কালার প্যালেট এবং নিজের পছন্দের যেকোনো ফটো ওয়ালপেপার দিয়ে পার্সোনালাইজড কীবোর্ড ডিজাইন।",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      color: "from-emerald-600/20 to-teal-600/20 text-emerald-400 border-emerald-500/30",
      title: "১০০% অফলাইন ও ব্যক্তিগত",
      subtitle: "Zero Keylogging, Total Privacy",
      description:
        "জিরো কি-লগিং গ্যারান্টি। কোনো ডেটা সার্ভারে বা ইন্টারনেটে পাঠানো হয় না। সমস্ত ব্যক্তিগত শব্দ ও সেটিংস ফোনের লোকাল Room DB মেমোরিতে এনক্রিপ্ট হয়ে থাকে।",
    },
    {
      icon: <Calendar className="w-5 h-5 text-amber-400" />,
      color: "from-amber-600/20 to-orange-600/20 text-amber-400 border-amber-500/30",
      title: "ট্রাই-ক্যালেন্ডার ডেট টুল",
      subtitle: "Bangla, Gregorian & Hijri Dates",
      description:
        "বাংলা একাডেমি অনুমোদিত সংশোধিত বঙ্গাব্দ ক্যালেন্ডার, ইংরেজি তারিখ এবং উম্মুল কুরা হিজরি ক্যালেন্ডার তারিখ যেকোনো টেক্সট ফিল্ডে ১-ট্যাপে ইনসার্ট করার অনন্য সুবিধা।",
    },
    {
      icon: <Mic className="w-5 h-5 text-rose-400" />,
      color: "from-rose-600/20 to-red-600/20 text-rose-400 border-rose-500/30",
      title: "ভয়েস টাইপিং ও ক্লিপবোর্ড",
      subtitle: "Offline Voice & Smart Clipboard",
      description:
        "দ্রুত অফলাইন বাংলা ভয়েস টাইপিং, মসৃণ গ্লাইড জেসচার টাইপিং এবং কপি করা গুরুত্বপূর্ণ টেক্সট পিন করে রাখার জন্য ইন্টিগ্রেটেড স্মার্ট ক্লিপবোর্ড ম্যানেজার।",
    },
  ];

  return (
    <section className="my-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3
              className={`text-sm sm:text-base font-extrabold font-['Space_Grotesk',sans-serif] ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              মূল ফিচার ও সুবিধাসমূহ (Key Features)
            </h3>
            <p className="text-[11px] text-slate-400">
              লিখন বাংলা কীবোর্ড কেন দেশের সেরা ও সবচেয়ে নিরাপদ কীবোর্ড
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>v2.4.0 Verified</span>
        </span>
      </div>

      {/* Grid of Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {featureList.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 shadow-sm ${
              isDarkMode
                ? 'bg-[#111422] border-white/[0.08] hover:border-indigo-500/40 hover:bg-[#15192c]'
                : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  0{idx + 1}
                </span>
              </div>

              <h4
                className={`font-bold text-sm sm:text-base leading-snug font-['Space_Grotesk',sans-serif] ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                {item.title}
              </h4>

              <p className="text-[11px] font-semibold text-indigo-500 dark:text-cyan-400 mt-0.5">
                {item.subtitle}
              </p>

              <p
                className={`text-xs mt-2.5 leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {item.description}
              </p>
            </div>

            <div
              className={`mt-4 pt-2.5 border-t flex items-center gap-1.5 text-[11px] font-medium text-emerald-500 ${
                isDarkMode ? 'border-white/[0.06]' : 'border-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>সম্পূর্ণ প্রস্তুত ও টেস্টেড</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
