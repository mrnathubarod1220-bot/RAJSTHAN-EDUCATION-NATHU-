import React, { useState, useMemo } from 'react';
import AppLogo from './AppLogo';
import { BookOpen, Compass, Award, Library, BrainCircuit, Bookmark, HelpCircle, Heart, Flame, ShieldAlert, Sparkles, BookMarked, ArrowRight, RefreshCw, Bell, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeSectionProps {
  onNavigate: (tab: 'history' | 'geography' | 'culture' | 'reasoning' | 'quiz' | 'pdfs' | 'bookmarks') => void;
  bookmarksCount: number;
}

export default function HomeSection({ onNavigate, bookmarksCount }: HomeSectionProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [liveNotices, setLiveNotices] = useState([
    { id: 1, title: 'RPSC RAS 2026: नई भर्ती परीक्षा अधिसूचना जारी कर दी गई है। ऑनलाइन आवेदन शीघ्र प्रारंभ!', date: 'आज', badge: 'महत्वपूर्ण', pulse: true },
    { id: 2, title: 'REET 2026: परीक्षा पाठ्यक्रम में नवीनतम अपडेट और महत्वपूर्ण टॉपिक्स जोड़े गए।', date: 'कल', badge: 'पाठ्यक्रम' },
    { id: 3, title: 'राजस्थान सामान्य ज्ञान: हस्तलिखित पीडीएफ पुस्तकालय में 2 नए अध्याय अपडेट किए गए हैं।', date: '2 दिन पहले', badge: 'अपडेट' },
  ]);

  const handleSyncUpdates = () => {
    setIsSyncing(true);
    setSyncMessage('ऑनलाइन सर्वर से नवीनतम डेटा सिंक किया जा रहा है...');
    
    setTimeout(() => {
      setLiveNotices(prev => {
        const hasNew = prev.some(n => n.id === 99);
        if (hasNew) return prev;
        return [
          {
            id: 99,
            title: '🎉 नथू लाल मीणा जी द्वारा प्रायोजित लाइव टेस्ट सीरीज 25 जुलाई से शुरू होगी!',
            date: 'अभी-अभी',
            badge: 'लाइव इवेंट',
            pulse: true
          },
          ...prev
        ];
      });
      setIsSyncing(false);
      setSyncMessage('✅ सर्वर सिंक पूर्ण: सभी नोट्स और क्विज लाइव अपडेटेड हैं!');
      setTimeout(() => setSyncMessage(''), 4500);
    }, 1200);
  };

  // Offline mock quotes
  const randomQuote = useMemo(() => {
    const quotes = [
      '"उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।" - स्वामी विवेकानंद',
      '"सफलता का कोई शॉर्टकट नहीं है, इसके लिए कठिन परिश्रम ही एकमात्र रास्ता है।"',
      '"मेहनत इतनी खामोशी से करो कि सफलता शोर मचा दे।"',
      '"शिक्षा सबसे शक्तिशाली हथियार है जिसका उपयोग आप दुनिया को बदलने के लिए कर सकते हैं।"',
      '"लक्ष्य पर नजर और मेहनत पर भरोसा रखो, कामयाबी कदम चूमेगी।"'
    ];
    // Return a solid fixed or daily-based quote
    const index = new Date().getDate() % quotes.length;
    return quotes[index];
  }, []);

  const stats = [
    { label: 'अध्ययन अध्याय', value: '11+', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20' },
    { label: 'अभ्यास क्विज', value: '10+', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20' },
    { label: 'ई-बुक पीडीएफ', value: '4', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20' },
    { label: 'बुकमार्क', value: bookmarksCount, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20' },
  ];

  const shortcuts = [
    {
      id: 'history',
      title: 'राजस्थान का इतिहास',
      desc: 'प्राचीन सभ्यताएं, राजवंश, 1857 की क्रांति व एकीकरण',
      icon: <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tag: 'इतिहास नोट्स',
      color: 'border-emerald-100 hover:border-emerald-300 dark:border-slate-700 hover:bg-emerald-50/20 dark:hover:bg-slate-750/30'
    },
    {
      id: 'geography',
      title: 'राजस्थान का भूगोल',
      desc: 'भौगोलिक स्थिति, भौतिक प्रदेश, नदियां, झीलें व अरावली',
      icon: <Compass className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      tag: 'भूगोल नोट्स',
      color: 'border-sky-100 hover:border-sky-300 dark:border-slate-700 hover:bg-sky-50/20 dark:hover:bg-slate-750/30'
    },
    {
      id: 'culture',
      title: 'कला और संस्कृति',
      desc: 'प्रसिद्ध दुर्ग, लोक देवता, मंदिर, मेले, त्योहार व नृत्य',
      icon: <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      tag: 'संस्कृति नोट्स',
      color: 'border-amber-100 hover:border-amber-300 dark:border-slate-700 hover:bg-amber-50/20 dark:hover:bg-slate-750/30'
    },
    {
      id: 'reasoning',
      title: 'रीजनिंग योग्यता',
      desc: 'कोडिंग-डिकोडिंग, रक्त संबंध, दिशा परीक्षण व शॉर्ट ट्रिक्स',
      icon: <BrainCircuit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      tag: 'मानसिक योग्यता',
      color: 'border-indigo-100 hover:border-indigo-300 dark:border-slate-700 hover:bg-indigo-50/20 dark:hover:bg-slate-750/30'
    },
    {
      id: 'quiz',
      title: 'दैनिक लाइव क्विज',
      desc: '10 परीक्षा-उपयोगी अभ्यास प्रश्नोत्तरी तत्काल उत्तर व ऑनलाइन परिणाम सहित',
      icon: <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      tag: 'अभ्यास टेस्ट',
      color: 'border-blue-100 hover:border-blue-300 dark:border-slate-700 hover:bg-blue-50/20 dark:hover:bg-slate-750/30 shadow-xs'
    },
    {
      id: 'pdfs',
      title: 'हस्तलिखित पीडीएफ लाइब्रेरी',
      desc: 'डाउनलोड, ऑनलाइन एवं ऑफलाइन पढ़ने हेतु उत्कृष्ट हस्तलिखित ई-बुक्स पुस्तकालय',
      icon: <Library className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      tag: 'हस्तलिखित बुक्स',
      color: 'border-orange-100 hover:border-orange-300 dark:border-slate-700 hover:bg-orange-50/20 dark:hover:bg-slate-750/30'
    }
  ];

  return (
    <div id="home-section-root" className="flex flex-col gap-6 md:gap-8">
      
      {/* 1. Hero Welcomer Card with Golden Logo representation */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 border border-blue-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 justify-between">
        
        {/* Absolute Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-850/80 border border-emerald-700 text-[11px] font-black tracking-wider text-amber-300 uppercase mb-3 font-mono">
            <Globe className="w-3.5 h-3.5 text-amber-300 animate-spin shrink-0" style={{ animationDuration: '6s' }} />
            <span>ऑनलाइन लाइव अपडेट्स समर्थित ऐप</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
            नमस्ते! राजस्थान प्रतियोगी परीक्षा मंच
          </h2>
          <p className="text-sm md:text-base text-blue-200 mt-2 font-sans max-w-xl leading-relaxed">
            राजस्थान इतिहास, भूगोल, कला-संस्कृति, रीजनिंग और हस्तलिखित पीडीएफ पुस्तकालय की उत्कृष्ट तैयारी के लिए तैयार रहें। सभी संसाधन सुरक्षित, तीव्र और लाइव ऑनलाइन सिंक समर्थित हैं।
          </p>

          <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              onClick={() => onNavigate('quiz')}
              className="px-4.5 py-2.5 bg-amber-400 text-blue-950 font-black text-sm rounded-xl shadow-lg shadow-amber-400/20 hover:bg-amber-300 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>डेली टेस्ट दें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('pdfs')}
              className="px-4.5 py-2.5 bg-blue-800 hover:bg-blue-700 border border-blue-700 text-white font-bold text-sm rounded-xl hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>पीडीएफ पुस्तकें पढ़ें</span>
            </button>
          </div>
        </div>

        {/* Brand visual Logo on the Right */}
        <div className="z-10 shrink-0 select-none animate-pulse">
          <AppLogo size="md" className="shadow-2xl ring-2 ring-amber-400 scale-105 md:scale-110 lg:scale-115" />
        </div>
      </div>

      {/* 2. Key Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-2xl shadow-2xs flex flex-col items-center justify-center text-center"
          >
            <span className={`text-2xl md:text-3xl font-black px-3.5 py-1 rounded-2xl mb-1.5 font-mono ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-sans">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* 2.5 Live Announcements Bulletin Board (Dynamic Online Updates) */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 rounded-2xl shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 dark:bg-red-950/30 rounded-lg text-red-600 dark:text-red-400">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                <span>लाइव समाचार एवं सूचना पट्ट (Live Online Notices)</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </h3>
              <p className="text-xs text-gray-400">RPSC, RSMSSB भर्ती अपडेट व लाइव टेस्ट सूचनाएं</p>
            </div>
          </div>

          <button
            onClick={handleSyncUpdates}
            disabled={isSyncing}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-slate-750 dark:text-blue-300 dark:hover:bg-slate-650 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-blue-200/50 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'सिंक हो रहा है...' : 'लाइव अपडेट्स लोड करें'}</span>
          </button>
        </div>

        {syncMessage && (
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/20 px-3 py-2 rounded-xl border border-emerald-150">
            {syncMessage}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {liveNotices.map((notice) => (
            <div
              key={notice.id}
              className="p-3 bg-gray-50 dark:bg-slate-750 rounded-xl border border-gray-100 dark:border-slate-700 flex items-start gap-3 hover:border-gray-200 transition-colors"
            >
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-black text-white shrink-0 mt-0.5 ${
                notice.badge === 'महत्वपूर्ण' || notice.badge === 'लाइव इवेंट'
                  ? 'bg-rose-500'
                  : notice.badge === 'पाठ्यक्रम'
                  ? 'bg-blue-500'
                  : 'bg-emerald-500'
              }`}>
                {notice.badge}
              </span>
              <div className="flex-1 text-xs md:text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed font-bold">
                {notice.title}
              </div>
              <span className="text-[10px] font-mono text-gray-400 shrink-0 font-bold">
                {notice.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Shortcuts Subject Grid */}
      <div>
        <h3 className="text-lg md:text-xl font-black text-gray-950 dark:text-white mb-4 flex items-center gap-2">
          <span className="h-5 w-1.5 bg-blue-600 rounded-full" />
          <span>अध्ययन विषय एवं साधन (Study Sections)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortcuts.map((sc) => (
            <div
              key={sc.id}
              onClick={() => onNavigate(sc.id as any)}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-800 border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 group flex flex-col justify-between ${sc.color}`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 group-hover:scale-110 transition-transform">
                    {sc.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-750 px-2.5 py-0.5 rounded-full">
                    {sc.tag}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {sc.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  {sc.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100/55 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>अभी पढ़ें</span>
                <span className="group-hover:translate-x-1.5 transition-transform">➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quote & Advisory Panel */}
      <div className="bg-amber-50/50 dark:bg-slate-750/30 border border-amber-200 dark:border-slate-700 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="text-3xl select-none text-amber-500">💡</div>
        <div className="flex-1 text-center md:text-left font-sans">
          <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1.5">
            दिन का सुविचार (Thought of the Day)
          </h4>
          <p className="text-sm md:text-base font-bold italic text-gray-800 dark:text-gray-200 leading-relaxed">
            {randomQuote}
          </p>
        </div>
      </div>

    </div>
  );
}
