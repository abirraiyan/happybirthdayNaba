import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Utensils, Music, Smile, RefreshCw, X } from 'lucide-react';

export default function HobiPet({ isOpen, onClose, happiness = 80, onInteract, sound }) {
  const [petAction, setPetAction] = useState('idle'); // 'idle' | 'eating' | 'dancing' | 'petting' | 'sleeping'
  const [actionMessage, setActionMessage] = useState('Pet is happy and purring! ☀️');

  if (!isOpen) return null;

  const { playPop, playStarCatch } = sound;

  const handleAction = (type, label, msg) => {
    playStarCatch();
    setPetAction(type);
    setActionMessage(msg);
    onInteract(type);

    setTimeout(() => {
      setPetAction('idle');
    }, 1800);
  };

  // Pet mood based on happiness level
  const getMood = () => {
    if (happiness >= 90) return { label: 'Ecstatic Sunshine! 🌟', color: 'text-amber-500' };
    if (happiness >= 70) return { label: 'Super Happy! 💖', color: 'text-pink-500' };
    if (happiness >= 40) return { label: 'Playful & Cozy 🐾', color: 'text-purple-500' };
    return { label: 'Hungry & Sleepy 🥺', color: 'text-gray-500' };
  };

  const mood = getMood();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-md w-full my-6 card-playful bg-[#FFFDF7] border-4 border-[#35234F] p-6 text-center shadow-2xl"
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
          <span className="text-xs font-bold uppercase tracking-wider text-dreamyPurple bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            Hobi World Companion
          </span>
          <h2 className="text-2xl font-heading font-bold text-hobiText mt-2">
            Hobi's Little Pet: Sunshine Bun 🐾
          </h2>
          <p className="text-xs text-hobiText-muted mt-0.5">
            Feed, cuddle, and play with Naba's cute companion!
          </p>
        </div>

        {/* Happiness Meter */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-purple-200 mb-4 text-left">
          <div className="flex items-center justify-between text-xs font-heading font-bold mb-1.5">
            <span className="flex items-center gap-1 text-hobiText">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Happiness Level</span>
            </span>
            <span className={mood.color}>{happiness}% • {mood.label}</span>
          </div>

          <div className="w-full h-3.5 bg-gray-200 rounded-full border border-[#35234F]/30 overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${happiness}%` }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 shadow-inner"
            />
          </div>
        </div>

        {/* Cute Animated Pet Character Screen */}
        <div className="relative w-full h-52 rounded-3xl bg-gradient-to-b from-sky-100 via-pink-50 to-amber-50 border-3 border-[#35234F] flex flex-col items-center justify-center overflow-hidden shadow-inner my-2">
          {/* Reaction Particles */}
          <AnimatePresence>
            {petAction === 'eating' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1.2, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute top-6 z-20 text-3xl"
              >
                🍓✨ YUM! ✨🍪
              </motion.div>
            )}
            {petAction === 'dancing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1.2, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute top-6 z-20 text-3xl"
              >
                🎶💖 GROOVY! 💖🎶
              </motion.div>
            )}
            {petAction === 'petting' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1.2, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute top-6 z-20 text-3xl"
              >
                💕 PURR PURR! 💕
              </motion.div>
            )}
          </AnimatePresence>

          {/* Adorable Pet Mascot Illustration */}
          <motion.div
            animate={
              petAction === 'dancing'
                ? { y: [0, -18, 0], rotate: [-8, 8, -8], scale: [1, 1.1, 1] }
                : petAction === 'eating'
                ? { scaleY: [1, 1.1, 0.95, 1], scaleX: [1, 0.95, 1.05, 1] }
                : petAction === 'petting'
                ? { rotate: [-4, 4, -4], scale: [1, 1.08, 1] }
                : { y: [0, -6, 0] }
            }
            transition={{ duration: 0.6, repeat: Infinity }}
            className="relative cursor-pointer"
            onClick={() => handleAction('pet', 'Pet', 'You cuddled Sunshine Bun! Soft and happy! 💕')}
          >
            {/* Ears */}
            <div className="absolute -top-10 inset-x-0 flex justify-center gap-6">
              <div className="w-5 h-12 bg-white border-2 border-[#35234F] rounded-full origin-bottom rotate-[-15deg] p-1 shadow-sm">
                <div className="w-2.5 h-8 bg-pink-200 rounded-full mx-auto" />
              </div>
              <div className="w-5 h-12 bg-white border-2 border-[#35234F] rounded-full origin-bottom rotate-[15deg] p-1 shadow-sm">
                <div className="w-2.5 h-8 bg-pink-200 rounded-full mx-auto" />
              </div>
            </div>

            {/* Head & Body */}
            <div className="w-28 h-24 rounded-full bg-white border-3 border-[#35234F] shadow-playful flex flex-col items-center justify-center relative p-2">
              {/* Little Sunshine Flower clip */}
              <div className="absolute -top-1 right-2 text-sm">
                🌸
              </div>

              {/* Eyes */}
              <div className="flex items-center gap-5 mt-2">
                {petAction === 'petting' ? (
                  <>
                    <div className="text-sm font-bold text-[#35234F]">^</div>
                    <div className="text-sm font-bold text-[#35234F]">^</div>
                  </>
                ) : (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#35234F] relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#35234F] relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                    </div>
                  </>
                )}
              </div>

              {/* Blushing Cheeks & Cute Mouth */}
              <div className="flex items-center justify-between w-3/4 mt-1">
                <div className="w-3 h-2 bg-pink-300 rounded-full opacity-80" />
                <div className="text-xs font-bold text-[#35234F] -mt-1">ω</div>
                <div className="w-3 h-2 bg-pink-300 rounded-full opacity-80" />
              </div>
            </div>

            {/* Little Paws */}
            <div className="flex justify-center gap-6 -mt-2">
              <div className="w-5 h-4 bg-white border-2 border-[#35234F] rounded-full" />
              <div className="w-5 h-4 bg-white border-2 border-[#35234F] rounded-full" />
            </div>
          </motion.div>

          <p className="text-xs font-heading font-bold text-hobiText mt-2">
            {actionMessage}
          </p>
        </div>

        {/* Action Buttons: Feed, Play, Pet */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <button
            onClick={() => handleAction('feed', 'Feed', 'Nom nom nom! Sunshine Bun loved the strawberry treat! 🍓')}
            className="btn-playful p-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-[#35234F] flex flex-col items-center justify-center gap-1 text-xs font-heading font-bold"
          >
            <span className="text-xl">🍓</span>
            <span>Feed Treat (+12)</span>
          </button>

          <button
            onClick={() => handleAction('dance', 'Play', 'Dance party with J-Hope rhythm beats! 🎶')}
            className="btn-playful p-2.5 rounded-2xl bg-pink-100 hover:bg-pink-200 border-2 border-[#35234F] flex flex-col items-center justify-center gap-1 text-xs font-heading font-bold"
          >
            <span className="text-xl">⚽</span>
            <span>Play Music (+15)</span>
          </button>

          <button
            onClick={() => handleAction('pet', 'Cuddle', 'Warm brother-sister hugs and gentle pats! 💕')}
            className="btn-playful p-2.5 rounded-2xl bg-purple-100 hover:bg-purple-200 border-2 border-[#35234F] flex flex-col items-center justify-center gap-1 text-xs font-heading font-bold"
          >
            <span className="text-xl">💖</span>
            <span>Cuddle (+10)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
