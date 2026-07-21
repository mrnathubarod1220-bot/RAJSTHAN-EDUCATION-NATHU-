import React, { useState } from 'react';
import { quizQuestions } from '../data';
import { Award, CheckCircle, XCircle, RotateCcw, AlertTriangle, ArrowRight, HelpCircle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function QuizSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<{ questionIndex: number; selectedOption: number }[]>([]);
  const [reviewMode, setReviewMode] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return; // Prevent double answering
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswersHistory((prev) => [
      ...prev,
      { questionIndex: currentQuestionIndex, selectedOption: optionIndex }
    ]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersHistory([]);
    setReviewMode(false);
  };

  // Performance rating in Hindi
  const getPerformanceFeedback = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { title: 'अति उत्कृष्ट! (Excellent)', message: 'आपने सभी प्रश्नों के सही उत्तर दिए हैं। आपकी तैयारी शत-प्रतिशत है!', color: 'text-emerald-500' };
    if (percentage >= 80) return { title: 'उत्कृष्ट! (Very Good)', message: 'बहुत बढ़िया! आपकी तैयारी शानदार है। बस निरंतर अभ्यास जारी रखें।', color: 'text-green-500' };
    if (percentage >= 60) return { title: 'अच्छा प्रयास! (Good)', message: 'अच्छा स्कोर है! थोड़ा और प्रयास करने पर आप और बेहतर कर सकते हैं।', color: 'text-blue-500' };
    return { title: 'और अधिक अभ्यास की आवश्यकता है! (Needs Study)', message: 'कोई बात नहीं! नोट्स दोबारा पढ़ें और पुनः प्रयास करें। अभ्यास ही सफलता की कुंजी है।', color: 'text-amber-500' };
  };

  const feedback = getPerformanceFeedback();

  return (
    <div id="quiz-section-root" className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {!quizFinished ? (
          /* Active Quiz Screen */
          <motion.div
            key="quiz-active"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 md:p-8 shadow-sm"
          >
            {/* Quiz Header & Tracker */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  दैनिक अभ्यास टेस्ट (LIVE PRACTICE QUIZ)
                </span>
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-0.5">
                  प्रश्न {currentQuestionIndex + 1} / {quizQuestions.length}
                </span>
              </div>
              <div className="bg-blue-50 dark:bg-slate-700 px-4 py-2 rounded-xl text-sm font-bold text-blue-800 dark:text-blue-300">
                स्कोर: {score}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-slate-700 h-2.5 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-3 mb-6">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-750';
                let icon = null;

                if (isAnswered) {
                  if (idx === currentQuestion.correctAnswer) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-300 dark:ring-emerald-800';
                    icon = <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
                  } else if (idx === selectedOption) {
                    btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 ring-2 ring-rose-300 dark:ring-rose-850';
                    icon = <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />;
                  } else {
                    btnStyle = 'border-gray-100 bg-gray-50/50 text-gray-400 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-500 pointer-events-none';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left text-base font-medium transition-all duration-200 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 flex items-center justify-center bg-gray-150 text-gray-700 dark:bg-slate-700 dark:text-gray-300 text-xs font-bold rounded-full shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Panel */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-indigo-50/50 dark:bg-slate-750 border border-indigo-100 dark:border-slate-700 p-4 rounded-xl mb-6 text-sm"
                >
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold mb-2">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>उत्तर स्पष्टीकरण (Explanation)</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans text-[15px]">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <span>{currentQuestionIndex === quizQuestions.length - 1 ? 'रिजल्ट देखें' : 'अगला प्रश्न'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        ) : (
          /* Finished Screen */
          <motion.div
            key="quiz-finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-8 shadow-sm text-center"
          >
            <div className="inline-flex p-4 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 mb-4 shadow-xs">
              <Award className="w-16 h-16" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1.5">
              परीक्षा परिणाम (Quiz Result)
            </h2>
            <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-6">
              RAJASTHAN EDUCATION NATHU APP - DAILY PRACTICE
            </p>

            {/* Score Ring Display */}
            <div className="inline-block relative mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-slate-800/40">
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{score}</span>
                <span className="text-xs font-bold text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-1 mt-1 w-12">
                  कुल {quizQuestions.length}
                </span>
              </div>
            </div>

            {/* Performance Text */}
            <div className="max-w-md mx-auto mb-8 bg-gray-50 dark:bg-slate-750/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700">
              <h3 className={`text-lg font-black ${feedback.color} mb-1`}>
                {feedback.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                {feedback.message}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-8">
              <button
                onClick={() => setReviewMode(!reviewMode)}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-6 rounded-xl border border-gray-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-650 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <Eye className="w-5 h-5" />
                <span>{reviewMode ? 'उत्तर बंद करें' : 'सभी उत्तर देखें'}</span>
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/10 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>पुनः प्रयास करें</span>
              </button>
            </div>

            {/* Answer Key Review Details */}
            {reviewMode && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-left border-t border-gray-150 dark:border-slate-700 pt-8 mt-4 space-y-6 max-w-2xl mx-auto"
              >
                <h4 className="text-base font-extrabold text-gray-900 dark:text-white mb-4">
                  प्रश्नोत्तरी समीक्षा (Answer Key Sheet)
                </h4>

                {quizQuestions.map((q, idx) => {
                  const history = answersHistory.find((h) => h.questionIndex === idx);
                  const isCorrect = history?.selectedOption === q.correctAnswer;

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-750/30">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          )}
                        </span>
                        <div>
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            प्र. {idx + 1}: {q.question}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                            {q.options.map((opt, oIdx) => {
                              let optionClass = 'text-sm text-gray-600 dark:text-gray-400';
                              if (oIdx === q.correctAnswer) {
                                optionClass = 'text-sm font-bold text-emerald-600 dark:text-emerald-400';
                              } else if (oIdx === history?.selectedOption && !isCorrect) {
                                optionClass = 'text-sm font-bold text-rose-600 dark:text-rose-400';
                              }

                              return (
                                <div key={oIdx} className="flex items-center gap-1.5">
                                  <span className="text-xs font-mono text-gray-450">({String.fromCharCode(65 + oIdx)})</span>
                                  <span className={optionClass}>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-3 pt-2.5 border-t border-gray-200/50 dark:border-slate-700/50 text-xs text-gray-550 dark:text-gray-350">
                            <span className="font-bold text-indigo-700 dark:text-indigo-400">स्पष्टीकरण:</span> {q.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
