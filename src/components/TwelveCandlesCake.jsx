import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Sparkles, X, RotateCcw, PartyPopper, Heart } from 'lucide-react';
import { fireCelebrationConfetti, fireStarBurst } from './Confetti';

export default function TwelveCandlesCake({
  isOpen,
  onClose,
  blownCandleIndices = [],
  onBlowCandle,
  onBlowAll,
  onRelight,
  sound
}) {
  if (!isOpen) return null;

  const { playPop, playCelebration, playStarCatch } = sound;
  const TOTAL_CANDLES = 12;
  const allBlown = blownCandleIndices.length >= TOTAL_CANDLES;

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
    onBlowAll();
    fireCelebrationConfetti();
  };

  const handleRelight = () => {
    playStarCatch();
    onRelight();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-xl w-full my-6 card-playful bg-[#FFFDF7] border-4 border-[#35234F] p-5 md:p-8 text-center shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white border-2 border-[#35234F] flex items-center justify-center text-[#35234F] hover:bg-rose-50 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            Special 12th Birthday Milestone
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText mt-2">
            The 12 Candles Challenge 🎂✨
          </h2>
          <p className="text-xs text-hobiText-muted mt-0.5">
            12 glowing candles for 12 radiant years! Click or tap each candle to make a wish and blow them out!
          </p>
        </div>

        {/* Candles Progress Counter */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-sunshine text-xs font-heading font-bold text-hobiText mb-4">
          <Sparkles className="w-3.5 h-3.5 text-warmOrange" />
          <span>Candles Blown: {blownCandleIndices.length} / {TOTAL_CANDLES}</span>
        </div>

        {/* 12-Candle Interactive Cake Stage */}
        <div className="my-4 py-4 px-2 rounded-3xl bg-gradient-to-b from-sky-50 via-pink-50 to-amber-50 border-3 border-[#35234F] shadow-inner relative flex flex-col items-center">
          {/* Row of 12 Candles arranged across the cake top */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 mb-1 z-10 px-2">
            {[...Array(TOTAL_CANDLES)].map((_, i) => {
              const isBlown = blownCandleIndices.includes(i);

              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => handleCandleClick(i)}
                  className="flex flex-col items-center cursor-pointer select-none group"
                >
                  {/* Candle Flame or Smoke Puff */}
                  <div className="h-6 flex items-end justify-center mb-0.5">
                    {!isBlown ? (
                      <motion.div
                        animate={{ scale: [1, 1.3, 0.9, 1], y: [0, -2, 0] }}
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

                  {/* Candle Stick */}
                  <div className={`w-3.5 h-9 rounded-t-sm border border-[#35234F] flex flex-col items-center justify-end pb-0.5 shadow-sm transition-all ${
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

          {/* Birthday Cake Body */}
          <div className="w-full max-w-md h-28 bg-gradient-to-b from-pink-200 via-pink-100 to-amber-100 rounded-3xl border-3 border-[#35234F] shadow-playful flex flex-col items-center justify-center p-3 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl border-b-2 border-pink-300" />
            <div className="text-3xl select-none">🍓🎂🍰🎂🍓</div>
            <span className="font-heading font-bold text-sm text-[#35234F] mt-1">
              {allBlown ? 'ALL 12 CANDLES BLOWN! MAKE A WISH! 🌟' : 'Tap candles to blow them out! 🌬️'}
            </span>
          </div>
        </div>

        {/* All Blown Celebration Card */}
        <AnimatePresence>
          {allBlown && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 border-2 border-sunshine my-3 text-center"
            >
              <div className="text-4xl animate-bounce mb-1">🎉✨👑✨🎉</div>
              <h4 className="font-heading font-bold text-lg text-hobiText">
                HAPPY 12TH BIRTHDAY, NABA!
              </h4>
              <p className="text-xs text-hobiText font-medium mt-1">
                May all your 12 wishes come true! You brought so much joy into the world, little sunshine!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {!allBlown ? (
            <button
              onClick={handleBlowAll}
              className="btn-playful px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-heading font-bold text-xs md:text-sm border-2 border-[#35234F] flex items-center gap-1.5"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Blow Out All 12 Candles! 🌬️</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="btn-playful px-6 py-2.5 rounded-xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-xs md:text-sm border-2 border-[#35234F] flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Relight Candles ✨</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
