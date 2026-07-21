export type ActiveTab = 
  | 'home' 
  | 'history' 
  | 'geography' 
  | 'culture' 
  | 'reasoning' 
  | 'quiz' 
  | 'pdfs' 
  | 'bookmarks' 
  | 'about';

export interface NoteItem {
  id: string;
  category: 'history' | 'geography' | 'culture' | 'reasoning';
  title: string;
  englishTitle: string;
  content: string[];
  bulletPoints?: string[];
  keyFacts?: { label: string; value: string }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PDFItem {
  id: string;
  title: string;
  size: string;
  pages: number;
  subject: string;
  chapters: { title: string; content: string[] }[];
}

export interface Bookmark {
  id: string;
  type: 'note' | 'pdf';
  title: string;
  category: string;
  timestamp: number;
}
