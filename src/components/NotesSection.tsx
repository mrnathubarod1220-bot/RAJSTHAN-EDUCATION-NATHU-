import React, { useState, useMemo } from 'react';
import { NoteItem } from '../types';
import { allNotes } from '../data';
import { Search, BookMarked, Bookmark, BookmarkCheck, BookOpen, Share2, Clipboard, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface NotesSectionProps {
  categoryFilter?: 'history' | 'geography' | 'culture' | 'reasoning' | null;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, type: 'note' | 'pdf', title: string, category: string) => void;
}

export default function NotesSection({ categoryFilter, bookmarkedIds, onToggleBookmark }: NotesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'history' | 'geography' | 'culture' | 'reasoning'>(
    categoryFilter || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync with prop when prop changes
  React.useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
      setActiveNote(null);
    }
  }, [categoryFilter]);

  const categories = [
    { id: 'all', label: 'सभी विषय', color: 'bg-blue-600 text-white' },
    { id: 'history', label: 'राजस्थान इतिहास', color: 'bg-emerald-600 text-white' },
    { id: 'geography', label: 'राजस्थान भूगोल', color: 'bg-sky-600 text-white' },
    { id: 'culture', label: 'कला और संस्कृति', color: 'bg-amber-600 text-white' },
    { id: 'reasoning', label: 'रीजनिंग नोट्स', color: 'bg-indigo-600 text-white' },
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'history': return 'इतिहास (History)';
      case 'geography': return 'भूगोल (Geography)';
      case 'culture': return 'कला-संस्कृति (Art & Culture)';
      case 'reasoning': return 'रीजनिंग (Reasoning)';
      default: return 'सामान्य ज्ञान';
    }
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'history': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      case 'geography': return 'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800';
      case 'culture': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
      case 'reasoning': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
    }
  };

  const filteredNotes = useMemo(() => {
    return allNotes.filter((note) => {
      const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.some((para) => para.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (note.bulletPoints && note.bulletPoints.some((pt) => pt.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyText = (note: NoteItem) => {
    const textToCopy = `${note.title}\n\n${note.content.join('\n')}\n\nमहत्वपूर्ण बिंदु:\n${note.bulletPoints?.map(b => `• ${b}`).join('\n') || ''}\n\n- RAJASTHAN EDUCATION NATHU App`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div id="notes-section-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar - Category Filter & Note List (LHS) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2 pb-1 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setActiveNote(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-xs cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400 dark:ring-blue-500'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:border-slate-700 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="नोट्स खोजें (जैसे: कालीबंगा, अरावली, कोडिंग)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-base"
          />
        </div>

        {/* Note Cards List */}
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[600px] pr-1">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => {
              const isBookmarked = bookmarkedIds.includes(note.id);
              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex justify-between items-start ${
                    activeNote?.id === note.id
                      ? 'bg-blue-50/70 border-blue-400 dark:bg-blue-950/20 dark:border-blue-500/50 shadow-md ring-1 ring-blue-300 dark:ring-blue-800'
                      : 'bg-white hover:bg-gray-50/50 border-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-750 shadow-xs'
                  }`}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getCategoryBadgeColor(note.category)}`}>
                        {getCategoryLabel(note.category)}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {note.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 font-mono">
                      {note.englishTitle}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {note.content[0]}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(note.id, 'note', note.title, note.category);
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      title={isBookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क करें'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeNote?.id === note.id ? 'text-blue-500 translate-x-1' : 'text-gray-400'}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
              <BookOpen className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">कोई नोट्स नहीं मिले। कृपया सर्च कीवर्ड बदलें।</p>
            </div>
          )}
        </div>
      </div>

      {/* Note Content View (RHS) */}
      <div className="lg:col-span-7">
        {activeNote ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm sticky top-4"
          >
            {/* Note Header Details */}
            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-gray-150 dark:border-slate-700 pb-4 mb-4">
              <div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryBadgeColor(activeNote.category)}`}>
                  {getCategoryLabel(activeNote.category)}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mt-2.5 leading-snug">
                  {activeNote.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">
                  {activeNote.englishTitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onToggleBookmark(activeNote.id, 'note', activeNote.title, activeNote.category)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    bookmarkedIds.includes(activeNote.id)
                      ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
                  }`}
                  title="बुकमार्क सहेजें"
                >
                  {bookmarkedIds.includes(activeNote.id) ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => handleCopyText(activeNote)}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                  title="कॉपी करें"
                >
                  <Clipboard className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    alert('इस ऑफलाइन नोट का लिंक कॉपी कर लिया गया है। आप इसे शेयर कर सकते हैं!');
                  }}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                  title="शेयर करें"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {copiedId === activeNote.id && (
              <div className="mb-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                ✅ नोट्स कॉपी कर लिए गए हैं!
              </div>
            )}

            {/* Note Key Facts Panel */}
            {activeNote.keyFacts && activeNote.keyFacts.length > 0 && (
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-750 dark:to-slate-750 rounded-xl p-4 border border-blue-100 dark:border-slate-700">
                <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> वन-लाइनर तथ्य (Quick Facts)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeNote.keyFacts.map((fact, index) => (
                    <div key={index} className="flex justify-between items-center text-sm border-b border-blue-100/50 dark:border-slate-700/50 pb-1.5 last:border-b-0">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{fact.label}:</span>
                      <span className="text-gray-900 dark:text-white font-bold">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Detailed Content (Large Hindi Fonts) */}
            <div className="space-y-4 text-gray-800 dark:text-gray-200 leading-relaxed text-lg font-sans">
              {activeNote.content.map((paragraph, index) => (
                <p key={index} className="indent-4 md:indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bullet Points Highlights */}
            {activeNote.bulletPoints && activeNote.bulletPoints.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-150 dark:border-slate-700">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  मुख्य परीक्षा-उपयोगी बिंदु (Key Exam Points)
                </h3>
                <ul className="space-y-2.5">
                  {activeNote.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-base text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500 dark:text-blue-400 mt-1 select-none font-bold">▶</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50/50 dark:bg-slate-800/40 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 p-12 text-center h-[500px]">
            <BookOpen className="w-16 h-16 text-gray-300 dark:text-slate-600 mb-4 animate-bounce" />
            <h3 className="text-lg font-extrabold text-gray-800 dark:text-gray-300 mb-1">
              अध्ययन के लिए कोई विषय चुनें
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
              बाएँ मेनू से किसी भी अध्याय पर क्लिक करके उसके विस्तृत नोट्स और वन-लाइनर तथ्य यहाँ पढ़ें।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
