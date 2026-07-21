import React, { useState, useEffect } from 'react';
import { ActiveTab, Bookmark } from './types';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import NotesSection from './components/NotesSection';
import QuizSection from './components/QuizSection';
import PDFSection from './components/PDFSection';
import BookmarksSection from './components/BookmarksSection';
import AboutSection from './components/AboutSection';
import AppLogo from './components/AppLogo';
import { 
  Home, 
  BookOpen, 
  Compass, 
  Sparkles, 
  BrainCircuit, 
  Award, 
  Library, 
  BookmarkCheck, 
  Info, 
  Menu, 
  X, 
  Search,
  BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // 1. Initial Load: Load Bookmarks and Theme from localStorage
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('rajasthan_education_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Bookmarks setup
    const savedBookmarks = localStorage.getItem('rajasthan_education_nathu_bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Error loading bookmarks', e);
      }
    }
  }, []);

  // 2. Persist Bookmarks to localStorage
  const handleToggleBookmark = (id: string, type: 'note' | 'pdf', title: string, category: string) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === id);
      let updated: Bookmark[];
      
      if (exists) {
        updated = prev.filter((b) => b.id !== id);
      } else {
        const newBookmark: Bookmark = {
          id,
          type,
          title,
          category,
          timestamp: Date.now()
        };
        updated = [...prev, newBookmark];
      }
      
      localStorage.setItem('rajasthan_education_nathu_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveBookmarkDirectly = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      localStorage.setItem('rajasthan_education_nathu_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // 3. Persist Theme Switch
  const handleToggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rajasthan_education_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rajasthan_education_theme', 'light');
    }
  };

  // Helper lists of sidebar/drawer options
  const navItems = [
    { id: 'home', label: 'गृह पृष्ठ (Home)', icon: <Home className="w-5 h-5" /> },
    { id: 'history', label: 'राजस्थान इतिहास', icon: <BookOpen className="w-5 h-5 text-emerald-500" /> },
    { id: 'geography', label: 'राजस्थान भूगोल', icon: <Compass className="w-5 h-5 text-sky-500" /> },
    { id: 'culture', label: 'कला और संस्कृति', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    { id: 'reasoning', label: 'रीजनिंग नोट्स', icon: <BrainCircuit className="w-5 h-5 text-indigo-500" /> },
    { id: 'quiz', label: 'दैनिक अभ्यास क्विज', icon: <Award className="w-5 h-5 text-blue-500" /> },
    { id: 'pdfs', label: 'हस्तलिखित लाइब्रेरी', icon: <Library className="w-5 h-5 text-orange-500" /> },
    { id: 'bookmarks', label: 'बुकमार्क्स पुस्तकालय', icon: <BookmarkCheck className="w-5 h-5 text-purple-500" /> },
    { id: 'about', label: 'ऐप के बारे में (About)', icon: <Info className="w-5 h-5 text-gray-500" /> },
  ];

  // Mobile navigation shortcuts
  const mobileBottomBarItems = [
    { id: 'home', label: 'होम', icon: <Home className="w-5 h-5" /> },
    { id: 'history', label: 'इतिहास', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'quiz', label: 'क्विज', icon: <Award className="w-5 h-5" /> },
    { id: 'pdfs', label: 'पीडीएफ', icon: <Library className="w-5 h-5" /> },
    { id: 'about', label: 'सपोर्ट', icon: <Info className="w-5 h-5" /> },
  ];

  // Quick navigation handlers for bookmarks list item jumps
  const handleNavigateToNote = (id: string, category: string) => {
    // Set active tab to match the category tab
    setActiveTab(category as ActiveTab);
  };

  const handleNavigateToPDF = (id: string) => {
    setActiveTab('pdfs');
  };

  // Safe bookmarks count tracker
  const bookmarksIds = bookmarks.map((b) => b.id);

  return (
    <div id="rajasthan-edu-app" className="min-h-screen bg-slate-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. Header component */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        bookmarksCount={bookmarks.length}
        onJumpToBookmarks={() => {
          setActiveTab('bookmarks');
          setMobileMenuOpen(false);
        }}
        onToggleMobileMenu={() => setMobileMenuOpen(true)}
        searchQuery={globalSearch}
        onSearchChange={(val) => {
          setGlobalSearch(val);
          // If searching globally, auto-jump to notes tab to show results if on home
          if (activeTab === 'home' && val) {
            setActiveTab('history');
          }
        }}
      />

      {/* 2. Main App Content Arena */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 pb-24 md:pb-8">
        
        {/* Left Column: Persistent Desktop Sidebar menu */}
        <aside className="hidden md:block md:col-span-3">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm sticky top-28 flex flex-col gap-5">
            
            {/* Small Brand Header inside Sidebar */}
            <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl shadow-xs">
              <AppLogo size="sm" className="ring-1 ring-amber-400" />
              <div className="flex flex-col">
                <span className="text-[11px] font-black tracking-tight leading-none text-white">NATHU EDUCATION</span>
                <span className="text-[8px] font-bold text-amber-300 mt-0.5 tracking-wider uppercase">LIVE APP</span>
              </div>
            </div>

            {/* Nav list */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                        : 'text-gray-600 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : ''}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Column: Tab View Render Stage */}
        <main className="col-span-1 md:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'home' && (
                <HomeSection
                  bookmarksCount={bookmarks.length}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}

              {/* History Notes */}
              {activeTab === 'history' && (
                <NotesSection
                  categoryFilter="history"
                  bookmarkedIds={bookmarksIds}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Geography Notes */}
              {activeTab === 'geography' && (
                <NotesSection
                  categoryFilter="geography"
                  bookmarkedIds={bookmarksIds}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Culture Notes */}
              {activeTab === 'culture' && (
                <NotesSection
                  categoryFilter="culture"
                  bookmarkedIds={bookmarksIds}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Reasoning Notes */}
              {activeTab === 'reasoning' && (
                <NotesSection
                  categoryFilter="reasoning"
                  bookmarkedIds={bookmarksIds}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Offline interactive daily Quiz */}
              {activeTab === 'quiz' && <QuizSection />}

              {/* Offline simulated PDF library & eReader */}
              {activeTab === 'pdfs' && (
                <PDFSection
                  bookmarkedIds={bookmarksIds}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Saved bookmarks library */}
              {activeTab === 'bookmarks' && (
                <BookmarksSection
                  bookmarks={bookmarks}
                  onRemoveBookmark={handleRemoveBookmarkDirectly}
                  onNavigateToNote={handleNavigateToNote}
                  onNavigateToPDF={handleNavigateToPDF}
                />
              )}

              {/* Developer credits support view */}
              {activeTab === 'about' && <AboutSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 3. Mobile Hamburger Slide-in Drawer Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div id="mobile-drawer-root" className="fixed inset-0 z-50 md:hidden flex">
            {/* Overlay backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Menu container list */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full p-5 flex flex-col justify-between shadow-2xl border-r border-gray-150 dark:border-slate-800"
            >
              <div>
                {/* Header of Drawer */}
                <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-150 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <AppLogo size="sm" className="ring-1 ring-amber-400" />
                    <div className="flex flex-col text-left select-none">
                      <span className="text-sm font-black text-blue-950 dark:text-white leading-none">RAJASTHAN EDUCATION</span>
                      <span className="text-[9px] font-black text-amber-500 mt-0.5 tracking-wider font-sans uppercase">NATHU • LIVE APP</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav list */}
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as ActiveTab);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Developer tagline footer in drawer */}
              <div className="border-t pt-4 border-gray-150 dark:border-slate-800 text-center text-xs text-gray-400">
                पढ़ें, अभ्यास करें, सफल बनें!
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Beautiful Native-Feeling Mobile Bottom Navigation Bar */}
      <div id="mobile-bottom-nav" className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-gray-150 dark:border-slate-800 flex items-center justify-around px-2 py-1 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {mobileBottomBarItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as ActiveTab);
                setGlobalSearch('');
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full rounded-lg transition-colors cursor-pointer ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className={`p-1 rounded-full transition-transform ${isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-sans font-bold leading-none mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
