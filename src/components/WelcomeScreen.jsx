import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Music, Heart, Star, Compass } from 'lucide-react';
import SunshineAvatar from './SunshineAvatar';

export default function WelcomeScreen({ onStart, sound }) {
  const { playPop, playStarCatch } = sound;

  const handleStart = () => {
    playStarCatch();
    onStart();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-8 overflow-hidden select-none">
      {/* Decorative Floating Elements in Background */}
      <div className="absolute top-8 left-8 text-3xl md:text-5xl opacity-40 animate-floatSlow pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-20 right-12 text-4xl md:text-6xl opacity-40 animate-float pointer-events-none">
        ☁️
      </div>
      <div className="absolute bottom-16 left-12 text-3xl opacity-50 animate-float pointer-events-none">
        🌸
      </div>
      <div className="absolute top-1/3 left-6 text-2xl opacity-60 animate-bounce pointer-events-none">
        ⭐
      </div>
      <div className="absolute top-1/2 right-8 text-3xl opacity-60 animate-bounce pointer-events-none">
        💜
      </div>
      <div className="absolute bottom-28 right-16 text-2xl opacity-40 animate-floatSlow pointer-events-none">
        🎵
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full flex flex-col items-center"
      >
        {/* Animated Sunshine Mascot */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4"
        >
          <SunshineAvatar size="hero" withShades={true} isDancing={true} />
        </motion.div>

        {/* Small Invitation Pill */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#35234F] shadow-playful mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-sunshine animate-ping" />
          <span className="font-heading font-bold text-xs md:text-sm text-hobiText uppercase tracking-wider">
            Special Invitation for Naba
          </span>
          <span className="text-sm">💌</span>
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl text-hobiText tracking-tight leading-none"
        >
          HEY NABAAA!
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl bg-gradient-to-r from-warmOrange via-dreamyPurple to-pink-500 bg-clip-text text-transparent mt-2"
        >
          Welcome to Hobi World ☀️
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-hobiText-muted max-w-lg mt-4 font-medium px-2"
        >
          A little universe full of sunshine, music, tiny challenges and a BIG birthday surprise prepared by your big brother.
        </motion.p>

        {/* Story Mission Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="card-playful p-4 md:p-5 my-6 bg-white/90 max-w-lg w-full text-left flex items-start gap-3.5 border-2 border-[#35234F]"
        >
          <div className="text-3xl p-2 rounded-2xl bg-amber-100 border border-sunshine shrink-0">
            💎
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm md:text-base text-hobiText">
              The Sunshine Crystal Quest
            </h4>
            <p className="text-xs md:text-sm text-hobiText-muted mt-0.5">
              The magical Sunshine Crystal has lost its power! Complete 5 fun missions, collect sunshine stars, and restore the light to unlock your grand celebration!
            </p>
          </div>
        </motion.div>

        {/* Main CTA Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="btn-playful px-8 sm:px-12 py-4 rounded-3xl bg-gradient-to-r from-sunshine via-warmOrange to-pink-400 text-[#35234F] font-heading font-bold text-lg sm:text-xl border-3 border-[#35234F] shadow-playful-hover flex items-center gap-3 cursor-pointer"
        >
          <span>LET'S GO, NABAAAA!</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
