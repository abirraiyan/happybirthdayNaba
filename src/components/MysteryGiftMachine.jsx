import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, X, CheckCircle2, Trophy, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/birthdayConfig';
import { fireStarBurst, fireCelebrationConfetti } from './Confetti';

export default function MysteryGiftMachine({ isOpen, onClose, unlockedIds = [], onUnlock, sound }) {
  const [openingBox, setOpeningBox] = useState(null);
  const [revealedGift, setRevealedGift] = useState(null);

  if (!isOpen) return null;

  const { playGiftOpen, playMatchSuccess } = sound;
  const collectibles = BIRTHDAY_CONFIG.collectibles;

  const handleOpenMysteryBox = (boxIndex) => {
    if (openingBox !== null) return;
    setOpeningBox(boxIndex);
    playGiftOpen();

    setTimeout(() => {
      // Pick a random collectible from list
      const randomItem = collectibles[Math.floor(Math.random() * collectibles.length)];
      onUnlock(randomItem.id);
      setRevealedGift(randomItem);
      setOpeningBox(null);
      playMatchSuccess();
      fireCelebrationConfetti();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-xl w-full my-6 card-playful bg-[#FFFDF7] border-4 border-[#35234F] p-6 text-center shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white border-2 border-[#35234F] flex items-center justify-center text-[#35234F] hover:bg-rose-50 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            Interactive Surprise Machine
          </span>
          <h2 className="text-2xl font-heading font-bold text-hobiText mt-2">
            Mystery Gift Machine 🎰🎁
          </h2>
          <p className="text-xs text-hobiText-muted mt-0.5">
            Tap any mystery capsule to unbox a random virtual reward & birthday blessing!
          </p>
        </div>

        {/* 3 Clickable Mystery Boxes */}
        <div className="grid grid-cols-3 gap-3 my-4">
          {[
            { id: 0, name: 'Sunshine Box', emoji: '🎁', color: 'from-amber-200 to-yellow-300' },
            { id: 1, name: 'Rainbow Box', emoji: '✨', color: 'from-pink-200 to-purple-300' },
            { id: 2, name: 'Hope Box', emoji: '💖', color: 'from-sky-200 to-indigo-300' },
          ].map((box) => (
            <motion.button
              key={box.id}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={openingBox === box.id ? { rotate: [-10, 10, -10, 10, 0], scale: 1.1 } : {}}
              transition={{ duration: 0.25 }}
              onClick={() => handleOpenMysteryBox(box.id)}
              className={`p-4 rounded-3xl border-3 border-[#35234F] bg-gradient-to-br ${box.color} shadow-playful flex flex-col items-center justify-center gap-1.5 cursor-pointer relative overflow-hidden`}
            >
              <span className="text-4xl filter drop-shadow animate-float">
                {openingBox === box.id ? '💫' : '🎁'}
              </span>
              <span className="font-heading font-bold text-xs text-[#35234F]">
                {openingBox === box.id ? 'Unboxing...' : box.name}
              </span>
              <span className="text-[10px] font-bold text-[#35234F]/70">
                Tap to Open!
              </span>
            </motion.button>
          ))}
        </div>

        {/* Revealed Gift Modal / Banner */}
        <AnimatePresence>
          {revealedGift && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 border-2 border-sunshine my-4 text-center"
            >
              <div className="text-4xl animate-bounce mb-1">
                {revealedGift.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-white/80 px-2 py-0.5 rounded-full border border-purple-200">
                {revealedGift.rarity} Item Unlocked!
              </span>
              <h4 className="font-heading font-bold text-lg text-hobiText mt-1">
                {revealedGift.name}
              </h4>
              <p className="text-xs text-hobiText font-medium mt-0.5">
                {revealedGift.desc}
              </p>
              <p className="text-[11px] text-pink-600 font-bold mt-1">
                "Naba, you're a true shining star! Keep collecting happy memories!"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Naba's Unlocked Virtual Collectibles Inventory */}
        <div className="mt-4 pt-3 border-t-2 border-dashed border-[#35234F]/10 text-left">
          <div className="flex items-center justify-between text-xs font-heading font-bold text-hobiText mb-2">
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-dreamyPurple" />
              <span>Naba's Virtual Trophy Case</span>
            </span>
            <span className="text-dreamyPurple-dark font-bold">
              {unlockedIds.length} / {collectibles.length} Collected
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {collectibles.map((item) => {
              const isUnlocked = unlockedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  title={`${item.name} (${item.rarity})`}
                  className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-1 transition-all ${
                    isUnlocked
                      ? 'bg-amber-50 border-[#35234F] shadow-sm'
                      : 'bg-gray-100 border-dashed border-gray-300 opacity-40'
                  }`}
                >
                  <span className="text-2xl">{isUnlocked ? item.icon : '❓'}</span>
                  <span className="text-[8px] font-bold truncate max-w-full text-center mt-0.5 text-hobiText">
                    {isUnlocked ? item.name : 'Secret'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
