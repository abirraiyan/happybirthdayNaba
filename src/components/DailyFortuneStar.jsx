import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, X, RefreshCw, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/birthdayConfig';
import { fireStarBurst } from './Confetti';

export default function DailyFortuneStar({ isOpen, onClose, onReveal, sound }) {
  const [currentFortuneIndex, setCurrentFortuneIndex] = useState(0);
  const [isCracked, setIsCracked] = useState(false);

  if (!isOpen) return null;

  const { playPop, playStarCatch } = sound;
  const fortunes = BIRTHDAY_CONFIG.fortunes;

  const handleCrackStar = () => {
    playStarCatch();
    fireStarBurst(0.5, 0.4);
    setIsCracked(true);
    onReveal();
  };

  const handleNextFortune = () => {
    playPop();
    setIsCracked(false);
    setCurrentFortuneIndex((prev) => (prev + 1) % fortunes.length);
    setTimeout(() => {
      handleCrackStar();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-md w-full my-6 card-playful bg-[#FFFDF7] border-4 border-[#35234F] p-6 text-center shadow-2xl overflow-hidden"
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
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Hobi's Lucky Star
          </span>
          <h2 className="text-2xl font-heading font-bold text-hobiText mt-2">
            Daily Happiness Fortune ⭐
          </h2>
          <p className="text-xs text-hobiText-muted mt-0.5">
            Tap the glowing lucky star to reveal your daily sunshine motivational message!
          </p>
        </div>

        {/* Lucky Star Interactive Element */}
        <div className="my-6 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCrackStar}
            className="cursor-pointer relative"
          >
            {/* Ambient Star Glow */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-yellow-300 rounded-full blur-xl pointer-events-none"
            />

            {/* Big Shiny Star */}
            <motion.div
              animate={isCracked ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : { y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10 text-7xl select-none filter drop-shadow-md"
            >
              ⭐
            </motion.div>
          </motion.div>

          <span className="text-xs font-heading font-bold text-hobiText mt-3 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-300">
            {isCracked ? 'Fortune Revealed! ✨' : 'Tap Star to Crack Open! 💫'}
          </span>
        </div>

        {/* Revealed Motivational Message */}
        <AnimatePresence>
          {isCracked && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 border-2 border-sunshine my-4 relative text-center shadow-sm"
            >
              <div className="text-2xl mb-1">💌✨</div>
              <h4 className="font-heading font-bold text-sm text-dreamyPurple uppercase tracking-wider mb-2">
                Today's Sunshine Blessing for Naba
              </h4>
              <p className="font-body font-medium text-sm md:text-base text-hobiText leading-relaxed">
                "{fortunes[currentFortuneIndex]}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={handleNextFortune}
            className="btn-playful px-6 py-2.5 rounded-xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-xs md:text-sm border-2 border-[#35234F] flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Draw Another Lucky Star ✨</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
