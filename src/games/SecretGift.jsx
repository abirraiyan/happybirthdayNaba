import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift, Star, Sparkles, Heart, CheckCircle2, ChevronRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/birthdayConfig';
import { fireCelebrationConfetti, firePurpleHearts } from '../components/Confetti';
import SunshineAvatar from '../components/SunshineAvatar';

export default function SecretGift({
  onComplete,
  onBack,
  sound,
  openedGifts = [],
  onOpenBox,
  isAlreadyCompleted,
  onGoToFinale
}) {
  const [activeRevealedBox, setActiveRevealedBox] = useState(null);
  const { playGiftOpen, playMissionComplete } = sound;

  const boxes = BIRTHDAY_CONFIG.giftBoxes;
  const allOpened = boxes.every(b => openedGifts.includes(b.id));

  const handleBoxClick = (box) => {
    playGiftOpen();
    firePurpleHearts();
    onOpenBox(box.id);
    setActiveRevealedBox(box);

    const willBeAllOpened = boxes.every(b => b.id === box.id || openedGifts.includes(b.id));
    if (willBeAllOpened && !allOpened) {
      setTimeout(() => {
        playMissionComplete();
        fireCelebrationConfetti();
        onComplete(5);
      }, 700);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center">
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
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 border-2 border-sky-300 text-xs md:text-sm font-heading font-bold">
            <Gift className="w-4 h-4" />
            <span>Boxes: {openedGifts.length} / 3 Opened</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sky-200 to-indigo-200 border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold shadow-playful">
            <Star className="w-4 h-4 text-indigo-700 fill-indigo-700" />
            <span>Reward: +30 Stars</span>
          </div>
        </div>
      </div>

      {/* Main Secret Chamber */}
      <div className="w-full card-playful p-4 md:p-8 bg-gradient-to-b from-[#FFF9EC] via-sky-50 to-purple-50 relative text-center">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-300">
            Mission 05 • Mystery Surprise
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText mt-2">
            The Secret Birthday Gift 🎁✨
          </h2>
          <p className="text-xs md:text-sm text-hobiText-muted max-w-md mx-auto mt-1">
            Three mystical treasure boxes are hidden inside Hobi World. Tap each box to unwrap its message and awaken the final crystal element!
          </p>
        </div>

        {/* 3 Gift Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-6">
          {boxes.map((box) => {
            const isOpened = openedGifts.includes(box.id);

            return (
              <motion.div
                key={box.id}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => handleBoxClick(box)}
                className={`card-playful p-5 flex flex-col items-center justify-between cursor-pointer transition-all ${
                  isOpened
                    ? 'bg-gradient-to-br from-white to-amber-50 ring-2 ring-sunshine'
                    : 'bg-white hover:bg-yellow-50'
                }`}
              >
                <div className="relative my-4">
                  {/* Gift Icon / Opened illustration */}
                  <motion.div
                    animate={isOpened ? { rotate: [0, -5, 5, 0] } : { y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl md:text-6xl filter drop-shadow-md"
                  >
                    {isOpened ? box.illustration : '🎁'}
                  </motion.div>

                  {isOpened && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-[#35234F] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="text-center w-full">
                  <h3 className="font-heading font-bold text-base md:text-lg text-hobiText">
                    {box.title}
                  </h3>
                  <p className="text-xs text-hobiText-muted mt-1">
                    {isOpened ? 'Unlocked & Read' : box.teaser}
                  </p>
                </div>

                <button
                  className={`btn-playful mt-4 w-full py-2 rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-1.5 border-2 border-[#35234F] ${
                    isOpened
                      ? 'bg-cream text-hobiText'
                      : 'bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isOpened ? 'Read Again' : 'Unwrap Box!'}</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* RESTORED SUNSHINE CRYSTAL BANNER (When all 3 are opened) */}
        {allOpened && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 border-3 border-[#35234F] shadow-playful"
          >
            <div className="text-5xl md:text-6xl animate-pulse mb-2">💎✨☀️✨💎</div>
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-hobiText">
              YOU RESTORED THE SUNSHINE!
            </h3>
            <p className="text-sm md:text-base text-hobiText-muted max-w-lg mx-auto mt-2">
              All 3 treasures have been revealed, and the final crystal element is blazing with golden light! The whole Hobi World is ready to celebrate your birthday!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button
                onClick={onGoToFinale}
                className="btn-playful px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-heading font-bold text-base md:text-lg border-2 border-[#35234F] shadow-playful flex items-center gap-2 animate-bounce"
              >
                <span>Enter Grand Birthday Finale! 🎂🎉</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* POPUP MODAL FOR REVEALED BOX */}
      <AnimatePresence>
        {activeRevealedBox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="card-playful p-6 md:p-8 bg-white max-w-md w-full text-center relative border-3 border-[#35234F]"
            >
              <div className="text-5xl mb-3 animate-bounce">
                {activeRevealedBox.content.sparkleEmoji}
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-dreamyPurple bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                {activeRevealedBox.title}
              </span>

              <h3 className="font-heading font-bold text-xl md:text-2xl text-hobiText mt-3">
                {activeRevealedBox.content.headline}
              </h3>

              <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-[#FFF9EC] to-amber-50 border-2 border-dashed border-[#35234F]/20 text-sm md:text-base text-hobiText font-medium leading-relaxed">
                "{activeRevealedBox.content.text}"
              </div>

              <button
                onClick={() => setActiveRevealedBox(null)}
                className="btn-playful w-full py-3 rounded-xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-sm border-2 border-[#35234F]"
              >
                Keep Shining! ☀️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
