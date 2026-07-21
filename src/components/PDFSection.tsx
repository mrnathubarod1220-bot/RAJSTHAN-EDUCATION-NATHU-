import React, { useState, useMemo } from 'react';
import { PDFItem } from '../types';
import { pdfLibrary } from '../data';
import { FileText, Download, BookOpen, Search, ZoomIn, ZoomOut, ArrowLeft, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Eye, Moon, Sun, Library } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PDFSectionProps {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, type: 'note' | 'pdf', title: string, category: string) => void;
}

export default function PDFSection({ bookmarkedIds, onToggleBookmark }: PDFSectionProps) {
  const [selectedPDF, setSelectedPDF] = useState<PDFItem | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<number>(18); // Default reader font size
  const [readerTheme, setReaderTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [pdfSearchQuery, setPdfSearchQuery] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const activePDF = selectedPDF;

  // Filter Chapters inside the reader based on local search query
  const filteredChapterContent = useMemo(() => {
    if (!activePDF) return [];
    const currentChapter = activePDF.chapters[activeChapterIndex];
    if (!pdfSearchQuery) return currentChapter.content;

    return currentChapter.content.filter((line) =>
      line.toLowerCase().includes(pdfSearchQuery.toLowerCase())
    );
  }, [activePDF, activeChapterIndex, pdfSearchQuery]);

  const handleDownload = (pdf: PDFItem) => {
    if (downloadingId) return; // Wait for previous download to finish

    setDownloadingId(pdf.id);
    setDownloadProgress((prev) => ({ ...prev, [pdf.id]: 0 }));

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const current = prev[pdf.id] || 0;
        if (current >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          alert(`📁 '${pdf.title}' सफलतापूर्वक डाउनलोड हो गया है! अब आप इसे ऑफलाइन या ऑनलाइन कभी भी पढ़ सकते हैं।`);
          return prev;
        }
        return { ...prev, [pdf.id]: current + 20 };
      });
    }, 300);
  };

  const readerThemeClasses = {
    light: 'bg-amber-50/40 text-slate-900 border-amber-100',
    dark: 'bg-slate-900 text-slate-100 border-slate-800',
    sepia: 'bg-orange-50 text-amber-950 border-orange-100',
  };

  return (
    <div id="pdf-section-root" className="w-full">
      <AnimatePresence mode="wait">
        {!activePDF ? (
          /* Main Library PDF List */
          <motion.div
            key="library-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {pdfLibrary.map((pdf) => {
              const isBookmarked = bookmarkedIds.includes(pdf.id);
              const progress = downloadProgress[pdf.id];
              const isDownloading = downloadingId === pdf.id;

              return (
                <div
                  key={pdf.id}
                  className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Header line info */}
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-sans">
                        {pdf.subject}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono flex items-center gap-1">
                        📁 {pdf.size} | 📃 {pdf.pages} पेज
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                      {pdf.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-sans">
                      हस्तलिखित नोट्स पीडीएफ ई-बुक - ऑफलाइन या ऑनलाइन पढ़ने के लिए उपलब्ध।
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onToggleBookmark(pdf.id, 'pdf', pdf.title, pdf.subject)}
                      className="p-2 rounded-lg border border-gray-100 hover:border-gray-200 text-gray-400 hover:text-amber-500 dark:border-slate-700 dark:hover:bg-slate-700 transition-colors"
                      title="बुकमार्क करें"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex gap-2 flex-1 justify-end">
                      {/* Read Button */}
                      <button
                        onClick={() => {
                          setSelectedPDF(pdf);
                          setActiveChapterIndex(0);
                          setPdfSearchQuery('');
                        }}
                        className="px-4 py-2 text-sm font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-slate-700 dark:text-blue-300 dark:hover:bg-slate-650 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>पढ़ें (Read)</span>
                      </button>

                      {/* Download Button */}
                      <button
                        disabled={isDownloading}
                        onClick={() => handleDownload(pdf)}
                        className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                          isDownloading
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        <span>{isDownloading ? `${progress}%` : 'डाउनलोड'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Downloading Progress Bar */}
                  {progress !== undefined && progress < 100 && (
                    <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* Immersive PDF Reader Viewer */
          <motion.div
            key="pdf-reader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`rounded-2xl border p-4 md:p-6 shadow-2xl transition-colors duration-200 ${readerThemeClasses[readerTheme]}`}
          >
            {/* Top Toolbar controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-4 border-gray-200/50 dark:border-slate-800">
              <button
                onClick={() => setSelectedPDF(null)}
                className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>पुस्तकालय लौटें</span>
              </button>

              <div className="flex items-center gap-3">
                {/* Font sizing buttons */}
                <div className="flex items-center gap-1.5 border border-gray-200 dark:border-slate-800 rounded-lg p-1 bg-white dark:bg-slate-850 shadow-2xs">
                  <button
                    onClick={() => setFontSize((f) => Math.max(12, f - 2))}
                    className="p-1 rounded-md text-gray-550 hover:bg-gray-100 dark:hover:bg-slate-800"
                    title="फ़ॉन्ट छोटा करें"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold px-1 select-none">
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => setFontSize((f) => Math.min(32, f + 2))}
                    className="p-1 rounded-md text-gray-550 hover:bg-gray-100 dark:hover:bg-slate-800"
                    title="फ़ॉन्ट बड़ा करें"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Paper Themes selection */}
                <div className="flex items-center gap-1 border border-gray-200 dark:border-slate-800 rounded-lg p-1 bg-white dark:bg-slate-850">
                  <button
                    onClick={() => setReaderTheme('light')}
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      readerTheme === 'light'
                        ? 'bg-amber-100 text-amber-900 shadow-2xs'
                        : 'text-gray-500'
                    }`}
                  >
                    सफेद
                  </button>
                  <button
                    onClick={() => setReaderTheme('sepia')}
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      readerTheme === 'sepia'
                        ? 'bg-amber-200 text-amber-950 shadow-2xs'
                        : 'text-gray-500'
                    }`}
                  >
                    सेपिया
                  </button>
                  <button
                    onClick={() => setReaderTheme('dark')}
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      readerTheme === 'dark'
                        ? 'bg-slate-850 text-white shadow-2xs'
                        : 'text-gray-500'
                    }`}
                  >
                    काला
                  </button>
                </div>
              </div>
            </div>

            {/* Document Header Panel */}
            <div className="mb-4">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {activePDF.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                {activePDF.subject} • {activePDF.chapters[activeChapterIndex].title}
              </p>
            </div>

            {/* Interactive Document Search */}
            <div className="relative mb-5 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="इस अध्याय के मुख्य पाठ खोजें..."
                value={pdfSearchQuery}
                onChange={(e) => setPdfSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border border-gray-200 bg-white dark:bg-slate-850 dark:border-slate-700 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* Immersive Document Content Frame */}
            <div className="min-h-[350px] p-4 md:p-6 rounded-xl border border-dashed bg-white/70 dark:bg-slate-950/40 backdrop-blur-xs shadow-inner leading-relaxed">
              <div className="space-y-4" style={{ fontSize: `${fontSize}px` }}>
                {filteredChapterContent.length > 0 ? (
                  filteredChapterContent.map((paragraph, index) => (
                    <p key={index} className="indent-4 md:indent-8 font-sans">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    खोज परिणाम में कोई वाक्यांश या शब्द नहीं मिला।
                  </div>
                )}
              </div>
            </div>

            {/* Document Chapter Paging Controls footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50 dark:border-slate-800">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => {
                  setActiveChapterIndex((idx) => Math.max(0, idx - 1));
                  setPdfSearchQuery('');
                }}
                className="px-3.5 py-1.5 rounded-lg text-sm font-bold bg-white dark:bg-slate-850 border border-gray-200 dark:border-slate-750 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>पिछला अध्याय</span>
              </button>

              <span className="text-xs font-bold font-mono text-gray-500">
                अध्याय {activeChapterIndex + 1} / {activePDF.chapters.length}
              </span>

              <button
                disabled={activeChapterIndex === activePDF.chapters.length - 1}
                onClick={() => {
                  setActiveChapterIndex((idx) => Math.min(activePDF.chapters.length - 1, idx + 1));
                  setPdfSearchQuery('');
                }}
                className="px-3.5 py-1.5 rounded-lg text-sm font-bold bg-white dark:bg-slate-850 border border-gray-200 dark:border-slate-750 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>अगला अध्याय</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
