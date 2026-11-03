import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Star, Award, RotateCcw, HelpCircle, ChevronRight } from 'lucide-react';
import { QUIZ_QUESTIONS, prepareQuizSession, getFanRanking } from '../data/quizQuestions';
import { fireCelebrationConfetti } from '../components/Confetti';

export default function HobiQuiz({ onComplete, onBack, sound, isAlreadyCompleted }) {
  // Generate randomized questions and independently shuffled options for this session
  const [sessionQuestions, setSessionQuestions] = useState(() => prepareQuizSession(QUIZ_QUESTIONS, 15));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { playCorrect, playWrong, playMissionComplete } = sound;

  const currentQ = sessionQuestions[currentIndex];

  // Handle option selection using option's unique ID and correctness
  const handleSelectOption = useCallback((option) => {
    if (hasAnswered) return;

    setSelectedOptionId(option.id);
    setHasAnswered(true);

    if (option.isCorrect) {
      setScore(s => s + 1);
      playCorrect();
    } else {
      playWrong();
    }
  }, [hasAnswered, playCorrect, playWrong]);

  // Navigate to next question
  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex(c => c + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    } else {
      // Completed all 15 questions
      setIsFinished(true);
      playMissionComplete();
      fireCelebrationConfetti();
      onComplete(3, { quizBestScore: score });
    }
  }, [currentIndex, sessionQuestions.length, playMissionComplete, onComplete, score]);

  // Reset quiz session with brand new independent Fisher-Yates shuffles
  const handleRestart = useCallback(() => {
    setSessionQuestions(prepareQuizSession(QUIZ_QUESTIONS, 15));
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  }, []);

  const ranking = getFanRanking(score);

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center">
      {/* Top Header Controls */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="btn-playful flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Mission</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-dreamyPurple-dark border-2 border-purple-300 text-xs md:text-sm font-heading font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>Q: {currentIndex + 1} / {sessionQuestions.length}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold shadow-playful">
            <Star className="w-4 h-4 text-purple-700 fill-purple-700" />
            <span>Score: {score}</span>
          </div>
        </div>
      </div>

      {/* Main Quiz Board */}
      <div className="w-full card-playful p-4 md:p-8 bg-gradient-to-b from-[#FFF9EC] via-white to-purple-50 relative">
        {!isFinished && currentQ ? (
          <div>
            {/* Question Header */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-dreamyPurple bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                Trivia Question {currentIndex + 1}
              </span>
              <h2 className="text-lg md:text-2xl font-heading font-bold text-hobiText mt-3 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* 4 Shuffled Options (A, B, C, D dynamically mapped) */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOptionId === option.id;
                const isOptionCorrect = option.isCorrect;

                let btnStyle = "bg-white border-gray-200 hover:border-dreamyPurple hover:bg-purple-50 text-hobiText";

                if (hasAnswered) {
                  if (isOptionCorrect) {
                    btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-100 border-rose-500 text-rose-900";
                  } else {
                    btnStyle = "bg-gray-50 border-gray-200 opacity-50 text-gray-500";
                  }
                }

                return (
                  <motion.button
                    key={option.id}
                    whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleSelectOption(option)}
                    disabled={hasAnswered}
                    className={`p-3.5 md:p-4 rounded-2xl border-2 text-left font-body font-medium text-sm md:text-base flex items-center justify-between transition-all shadow-sm ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-cream border border-[#35234F]/20 flex items-center justify-center font-heading font-bold text-xs shrink-0 text-[#35234F]">
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <span>{option.text}</span>
                    </div>

                    {hasAnswered && isOptionCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !isOptionCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation Card & Next Button */}
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-amber-50 border-2 border-sunshine mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1">
                    <span>💡 Hobi Fact:</span>
                  </div>
                  <p className="text-xs md:text-sm text-hobiText font-medium mt-0.5">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="btn-playful px-6 py-2.5 rounded-xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-xs md:text-sm border-2 border-[#35234F] flex items-center gap-1 shrink-0"
                >
                  <span>{currentIndex + 1 === sessionQuestions.length ? 'View Results 🌟' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          /* FINAL RESULTS AND RANKING CARD */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center p-4 md:p-6"
          >
            <div className="text-5xl md:text-6xl animate-bounce mb-3">👑💜✨</div>
            <span className="text-xs font-bold uppercase tracking-widest text-dreamyPurple bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              Official Fan Ranking
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-hobiText mt-2">
              {ranking.title}
            </h2>

            <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50 border-2 border-purple-300 max-w-md w-full">
              <div className="text-3xl mb-1">🏅</div>
              <p className="font-heading font-bold text-base text-hobiText">
                Final Score: {score} / {sessionQuestions.length} Correct
              </p>
              <p className="text-xs md:text-sm text-hobiText-muted mt-1">
                {ranking.desc}
              </p>
            </div>

            <div className="my-2 px-4 py-2 rounded-xl bg-purple-100 border-2 border-purple-300 flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
              <span className="font-heading font-bold text-sm text-[#35234F]">
                {isAlreadyCompleted ? 'Mission Already Completed (+0 Stars)' : '+25 Sunshine Stars Earned!'}
              </span>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRestart}
                className="btn-playful px-5 py-2.5 rounded-xl bg-white border-2 border-[#35234F] font-heading font-bold text-xs md:text-sm flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={onBack}
                className="btn-playful px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-heading font-bold text-xs md:text-sm border-2 border-[#35234F]"
              >
                Back to Dashboard 🚀
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
