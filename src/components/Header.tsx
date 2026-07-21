import React from 'react';
import AppLogo from './AppLogo';
import { Sun, Moon, Bookmark, Calendar, Menu, Search, BookMarked } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  bookmarksCount: number;
  onJumpToBookmarks: () => void;
  onToggleMobileMenu?: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export default function Header({
  darkMode,
  onToggleDarkMode,
  bookmarksCount,
  onJumpToBookmarks,
  onToggleMobileMenu,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  // Format current date in Hindi style
  const formattedDate = React.useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    try {
      return new Date().toLocaleDateString('hi-IN', options);
    } catch {
      return new Date().toDateString();
    }
  }, []);

  return (
    <header id="app-header" className="sticky top-0 z-45 w-full bg-blue-900 text-white shadow-md border-b border-blue-800 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* LHS: Logo and Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 -ml-2 rounded-lg text-white hover:bg-blue-800 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="मेन्यू खोलें"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Compact visual custom SVG logo */}
          <div className="hover:scale-105 transition-transform">
            <AppLogo size="sm" className="shadow-md cursor-pointer ring-1 ring-amber-400" />
          </div>

          <div className="flex flex-col justify-center select-none">
            <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight leading-none text-white whitespace-nowrap">
              RAJASTHAN EDUCATION
            </h1>
            <span className="text-[10px] sm:text-xs font-bold text-amber-300 dark:text-amber-400 mt-0.5 tracking-widest font-sans uppercase">
              NATHU • LIVE APP
            </span>
          </div>
        </div>

        {/* Center: Search notes bar (Desktop only) */}
        <div className="hidden lg:flex items-center relative w-72 xl:w-96">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-blue-300 dark:text-slate-500" />
          <input
            type="text"
            placeholder="नोट्स और टॉपिक खोजें..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-blue-950/60 text-white pl-9 pr-4 py-2 rounded-xl text-sm border border-blue-800 placeholder-blue-300 focus:outline-hidden focus:ring-1 focus:ring-amber-400 dark:bg-slate-950 dark:border-slate-800 dark:placeholder-slate-600"
          />
        </div>

        {/* RHS: Date widget, bookmark jump, dark mode */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Calendar Widget (Hidden on small mobile) */}
          <div className="hidden md:flex items-center gap-1.5 bg-blue-950/40 dark:bg-slate-800/40 px-3 py-1.5 rounded-lg border border-blue-800 dark:border-slate-700">
            <Calendar className="w-4 h-4 text-amber-300 dark:text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-blue-100 dark:text-slate-300 font-sans whitespace-nowrap">
              {formattedDate}
            </span>
          </div>

          {/* Dark Mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-blue-950/50 hover:bg-blue-800/60 text-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-blue-800 dark:border-slate-700 transition-all cursor-pointer"
            title={darkMode ? 'लाइट मोड' : 'डार्क मोड'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-300" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-300" />
            )}
          </button>

          {/* Bookmarks Counter Button */}
          <button
            onClick={onJumpToBookmarks}
            className="relative p-2 rounded-xl bg-blue-950/50 hover:bg-blue-800/60 text-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-blue-800 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            title="बुकमार्क किए गए नोट्स"
          >
            <Bookmark className="w-5 h-5" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-blue-950 animate-bounce">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
