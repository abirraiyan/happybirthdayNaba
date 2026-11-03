import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, Heart, Sparkles, PartyPopper, Cake, ArrowLeft, Mail, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG, calculateAge } from '../data/birthdayConfig';
import SunshineAvatar from '../components/SunshineAvatar';
import BirthdayLetter from '../components/BirthdayLetter';
import { fireCelebrationConfetti, firePurpleHearts, fireStarBurst } from '../components/Confetti';

export default function BirthdayFinale({
  progress,
  onBackToDashboard,
  sound,
  onBlowCandle,
  onBlowAllCandles,
  onRelightCandles
}) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const { playCelebration, playPop, playStarCatch } = sound;

  const { stars, blownCandleIndices = [] } = progress;
  const { recipientName, senderName, finale, dateOfBirth } = BIRTHDAY_CONFIG;
  const dynamicAge = calculateAge(dateOfBirth);

  const TOTAL_CANDLES = 12;
  const allCandlesBlown = blownCandleIndices.length >= TOTAL_CANDLES;

  // Auto trigger celebratory sound & confetti on first open
  useEffect(() => {
    playCelebration();
    fireCelebrationConfetti();
    const timer = setTimeout(() => {
      firePurpleHearts();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCandleClick = (index) => {
    if (!blownCandleIndices.includes(index)) {
      playPop();
      onBlowCandle(index);
      fireStarBurst(0.5, 0.45);

      if (blownCandleIndices.length + 1 >= TOTAL_CANDLES) {
        setTimeout(() => {
          playCelebration();
          fireCelebrationConfetti();
        }, 300);
      }
    }
  };

  const handleBlowAll = () => {
    playCelebration();
    onBlowAllCandles();
    fireCelebrationConfetti();
  };

  const handleOpenLetter = () => {
    playStarCatch();
    setIsLetterOpen(true);
  };

  return (
    <div className="min-h-screen py-6 md:py-10 px-4 flex flex-col items-center relative overflow-hidden select-none">
      {/* Floating Birthday Balloons in Background */}
      <div className="absolute top-10 left-6 text-4xl md:text-6xl animate-float pointer-events-none opacity-60">🎈</div>
      <div className="absolute top-16 right-8 text-4xl md:text-6xl animate-floatSlow pointer-events-none opacity-60">🎈</div>
      <div className="absolute bottom-20 left-12 text-3xl md:text-5xl animate-floatSlow pointer-events-none opacity-50">🎈</div>
      <div className="absolute bottom-28 right-12 text-3xl md:text-5xl animate-float pointer-events-none opacity-50">🎈</div>

      {/* Top Header Navigation */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 z-20">
        <button
          onClick={onBackToDashboard}
          className="btn-playful flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => {
            playCelebration();
            fireCelebrationConfetti();
          }}
          className="btn-playful flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sunshine to-pink-300 border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold shadow-playful"
        >
          <PartyPopper className="w-4 h-4" />
          <span>Shoot Confetti! 🎉</span>
        </button>
      </div>

      {/* Main Celebration Stage Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl card-playful p-6 md:p-10 bg-gradient-to-b from-[#FFFDF7] via-pink-50 to-amber-50 border-3 border-[#35234F] shadow-2xl text-center relative z-10"
      >
        {/* Animated Dancing Sunshine Mascot */}
        <div className="flex justify-center -mt-2 mb-3">
          <SunshineAvatar size="large" withShades={true} isDancing={true} />
        </div>

        {/* Champion Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 border-2 border-[#35234F] shadow-playful mb-3">
          <Award className="w-4 h-4 text-purple-700" />
          <span className="font-heading font-bold text-xs md:text-sm text-[#35234F] uppercase tracking-wider">
            Birthday Sunshine Champion • {dynamicAge} Years of Magic 👑
          </span>
        </div>

        {/* Main Headings */}
        <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl text-hobiText leading-tight">
          HAPPY BIRTHDAY, {recipientName.toUpperCase()}! 🎂
        </h1>

        <div className="space-y-1 mt-3 max-w-lg mx-auto">
          <p className="text-base sm:text-lg md:text-xl font-heading font-bold text-warmOrange">
            "You did it! You brought the sunshine back to Hobi World."
          </p>
          <p className="text-xs sm:text-sm md:text-base text-hobiText-muted font-medium">
            "Keep smiling, keep dancing, and keep being your amazing self. ☀️💜"
          </p>
        </div>

        {/* 12 CANDLES CHALLENGE SECTION */}
        <div className="my-7 p-4 sm:p-6 rounded-3xl bg-white/80 border-3 border-[#35234F] shadow-playful relative flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-md mb-2">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-pink-700 bg-pink-100 px-3 py-0.5 rounded-full border border-pink-300">
              The 12 Candles Challenge
            </span>
            <span className="text-xs font-bold text-hobiText font-mono">
              {blownCandleIndices.length} / {TOTAL_CANDLES} Blown
            </span>
          </div>

          {/* Row of 12 Candles */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 my-2 z-10 px-2">
            {[...Array(TOTAL_CANDLES)].map((_, i) => {
              const isBlown = blownCandleIndices.includes(i);

              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => handleCandleClick(i)}
                  className="flex flex-col items-center cursor-pointer select-none group"
                >
                  <div className="h-6 flex items-end justify-center mb-0.5">
                    {!isBlown ? (
                      <motion.div
                        animate={{ scale: [1, 1.25, 0.95, 1], y: [0, -2, 0] }}
                        transition={{ duration: 0.5 + (i % 3) * 0.1, repeat: Infinity }}
                        className="w-3 h-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-white rounded-full blur-[0.5px] shadow-glow-sun"
                      />
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [1, 0], y: -8 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs text-gray-400"
                      >
                        💨
                      </motion.span>
                    )}
                  </div>

                  <div className={`w-3.5 h-8 rounded-t-sm border border-[#35234F] flex flex-col items-center justify-end pb-0.5 shadow-sm transition-all ${
                    isBlown
                      ? 'bg-gray-200 opacity-60'
                      : i % 2 === 0
                      ? 'bg-gradient-to-b from-pink-300 to-rose-400'
                      : 'bg-gradient-to-b from-yellow-300 to-amber-400'
                  }`}>
                    <span className="text-[8px] font-bold text-white leading-none">
                      {i + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cake Body */}
          <div className="w-full max-w-sm h-24 bg-gradient-to-b from-pink-200 via-pink-100 to-amber-100 rounded-3xl border-3 border-[#35234F] shadow-playful flex flex-col items-center justify-center p-2 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl border-b-2 border-pink-300" />
            <div className="text-2xl select-none">🍓🍰🎂🍰🍓</div>
            <span className="font-heading font-bold text-xs text-[#35234F] mt-1">
              {allCandlesBlown ? 'All 12 Candles Blown! Wishes Granted! 🌟' : 'Tap each candle to blow it out! 🌬️'}
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            {!allCandlesBlown ? (
              <button
                onClick={handleBlowAll}
                className="btn-playful px-4 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 border-2 border-[#35234F] text-xs font-heading font-bold"
              >
                Blow Out All 12 Candles! 🌬️
              </button>
            ) : (
              <button
                onClick={onRelightCandles}
                className="btn-playful px-4 py-1.5 rounded-xl bg-yellow-100 hover:bg-yellow-200 border-2 border-[#35234F] text-xs font-heading font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight Candles ✨</span>
              </button>
            )}
          </div>
        </div>

        {/* Completed Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto my-5 text-left">
          <div className="p-3 rounded-2xl bg-white border-2 border-[#35234F] shadow-sm flex flex-col items-center text-center">
            <span className="text-2xl mb-1">⭐</span>
            <span className="font-heading font-bold text-sm text-hobiText">{stars} Stars</span>
            <span className="text-[10px] text-hobiText-muted">Collected</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border-2 border-[#35234F] shadow-sm flex flex-col items-center text-center">
            <span className="text-2xl mb-1">💎</span>
            <span className="font-heading font-bold text-sm text-hobiText">100% Restored</span>
            <span className="text-[10px] text-hobiText-muted">Sunshine Crystal</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white border-2 border-[#35234F] shadow-sm flex flex-col items-center text-center">
            <span className="text-2xl mb-1">🏆</span>
            <span className="font-heading font-bold text-sm text-hobiText">5/5 Missions</span>
            <span className="text-[10px] text-hobiText-muted">Mastered</span>
          </div>
        </div>

        {/* MAIN CALL TO ACTION: OPEN BROTHER'S LETTER */}
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenLetter}
            className="btn-playful px-8 sm:px-10 py-4 rounded-3xl bg-gradient-to-r from-sunshine via-warmOrange to-pink-400 text-[#35234F] font-heading font-bold text-base sm:text-lg border-3 border-[#35234F] shadow-playful-hover flex items-center justify-center gap-2.5 mx-auto animate-pulse"
          >
            <Mail className="w-5 h-5 fill-current" />
            <span>OPEN A LETTER FROM YOUR BROTHER ❤️</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Birthday Letter Modal Component */}
      <BirthdayLetter
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        onReplayCelebration={() => {
          playCelebration();
          fireCelebrationConfetti();
        }}
      />
    </div>
  );
}
