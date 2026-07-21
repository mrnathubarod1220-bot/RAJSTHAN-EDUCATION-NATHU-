import React from 'react';
import { Bookmark } from '../types';
import { BookmarkCheck, Trash2, BookOpen, FileText, Calendar, Inbox } from 'lucide-react';
import { motion } from 'motion/react';

interface BookmarksSectionProps {
  bookmarks: Bookmark[];
  onRemoveBookmark: (id: string) => void;
  onNavigateToNote: (id: string, category: string) => void;
  onNavigateToPDF: (id: string) => void;
}

export default function BookmarksSection({
  bookmarks,
  onRemoveBookmark,
  onNavigateToNote,
  onNavigateToPDF,
}: BookmarksSectionProps) {

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'history': return 'इतिहास (History)';
      case 'geography': return 'भूगोल (Geography)';
      case 'culture': return 'कला-संस्कृति (Art & Culture)';
      case 'reasoning': return 'रीजनिंग (Reasoning)';
      case 'राजस्थान इतिहास': return 'इतिहास';
      case 'राजस्थान भूगोल': return 'भूगोल';
      case 'कला एवं संस्कृति': return 'कला-संस्कृति';
      case 'रीजनिंग नोट्स': return 'रीजनिंग';
      default: return cat;
    }
  };

  const getCategoryBadgeColor = (type: string) => {
    if (type === 'pdf') {
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
    }
    return 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
  };

  return (
    <div id="bookmarks-section-root" className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Section Description */}
        <div className="mb-2">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-amber-500" />
            <span>पसंदीदा एवं सहेजे गए नोट्स (Bookmarks Library)</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-sans">
            यहां आपके द्वारा सहेजे गए महत्वपूर्ण अध्याय और हस्तलिखित ई-बुक्स बिना इंटरनेट के हमेशा पढ़ने के लिए उपलब्ध रहेंगे।
          </p>
        </div>

        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all duration-200 flex justify-between items-start"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${getCategoryBadgeColor(bookmark.type)} uppercase font-sans`}>
                      {bookmark.type === 'pdf' ? '📖 PDF' : '📝 Note'}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400 font-sans">
                      {getCategoryLabel(bookmark.category)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                    {bookmark.title}
                  </h3>

                  {/* Saved Date */}
                  <div className="flex items-center gap-1 text-[11px] text-gray-450 dark:text-gray-400 mt-3 font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>सहेजा गया: {new Date(bookmark.timestamp).toLocaleDateString('hi-IN')}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end shrink-0">
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveBookmark(bookmark.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                    title="बुकमार्क हटाएं"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  {/* Read Button */}
                  <button
                    onClick={() => {
                      if (bookmark.type === 'pdf') {
                        onNavigateToPDF(bookmark.id);
                      } else {
                        onNavigateToNote(bookmark.id, bookmark.category);
                      }
                    }}
                    className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-slate-700 dark:text-blue-300 dark:hover:bg-slate-650 transition-colors cursor-pointer"
                    title="खोलें"
                  >
                    <BookOpen className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Bookmarks View */
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-150 dark:border-slate-700 p-8">
            <Inbox className="w-16 h-16 text-gray-300 dark:text-slate-650 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-extrabold text-gray-800 dark:text-gray-300 mb-1">
              कोई बुकमार्क नहीं मिला
            </h3>
            <p className="text-gray-500 dark:text-gray-450 text-sm max-w-xs mx-auto leading-relaxed font-sans">
              जब आप नोट्स पढ़ रहे हों या हस्तलिखित ई-बुक्स ब्राउज़ कर रहे हों, तो उन्हें बाद में आसानी से खोजने के लिए 🔖 (बुकमार्क) बटन पर क्लिक करें।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
