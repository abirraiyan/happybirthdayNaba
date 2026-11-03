import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, X, MailOpen } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/birthdayConfig';
import { firePurpleHearts, fireCelebrationConfetti } from './Confetti';

export default function BirthdayLetter({ isOpen, onClose, onReplayCelebration }) {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const { letter, recipientName, senderName } = BIRTHDAY_CONFIG;

  if (!isOpen) return null;

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpened(true);
    firePurpleHearts();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative max-w-xl w-full my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-30 w-9 h-9 rounded-full bg-white border-2 border-[#35234F] shadow-playful flex items-center justify-center text-[#35234F] hover:bg-red-50"
        >
          <X className="w-5 h-5" />
        </button>

        {!isEnvelopeOpened ? (
          /* CLOSED ENVELOPE STAGE */
          <div
            onClick={handleOpenEnvelope}
            className="card-playful p-8 md:p-12 bg-gradient-to-br from-amber-100 via-[#FFF9EC] to-pink-100 border-3 border-[#35234F] text-center cursor-pointer group shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-2 right-4 text-3xl opacity-20">✉️</div>
            <div className="text-6xl md:text-7xl mb-4 group-hover:scale-110 transition-transform">
              💌
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-dreamyPurple bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              Special Delivery for {recipientName}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText mt-3">
              A Letter From Your Brother ❤️
            </h2>
            <p className="text-xs md:text-sm text-hobiText-muted mt-2">
              Sealed with brotherly love, sunshine memories, and warmest birthday wishes. Tap to unseal!
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenEnvelope();
              }}
              className="btn-playful mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-sunshine to-pink-400 text-[#35234F] font-heading font-bold text-sm md:text-base border-2 border-[#35234F] flex items-center gap-2 mx-auto"
            >
              <MailOpen className="w-4 h-4" />
              <span>Tap to Open Letter ✨</span>
            </button>
          </div>
        ) : (
          /* OPENED LETTER CARD */
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="card-playful p-6 md:p-10 bg-[#FFFDF7] border-3 border-[#35234F] shadow-2xl relative"
          >
            {/* Cute stickers on top corners */}
            <div className="absolute top-3 left-4 text-2xl select-none">☀️</div>
            <div className="absolute top-3 right-4 text-2xl select-none">💜</div>

            {/* Letter Header */}
            <div className="border-b-2 border-dashed border-[#35234F]/20 pb-4 mb-6 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
                To My Sunshine Sister
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText mt-2">
                {letter.greeting}
              </h2>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-3.5 text-sm md:text-base text-hobiText font-medium leading-relaxed font-body">
              {letter.body.map((paragraph, index) => (
                <p key={index} className="indent-2">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Letter Signoff */}
            <div className="mt-8 pt-4 border-t-2 border-dashed border-[#35234F]/20 flex flex-col items-end">
              <p className="text-xs md:text-sm font-medium text-hobiText-muted">
                {letter.closing}
              </p>
              <p className="text-base md:text-lg font-heading font-bold text-hobiText mt-0.5">
                {letter.signature}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <button
                onClick={() => {
                  fireCelebrationConfetti();
                  onReplayCelebration();
                }}
                className="btn-playful w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-dreamyPurple-dark font-heading font-bold text-xs md:text-sm border-2 border-purple-300 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Birthday Celebration 🎉</span>
              </button>

              <button
                onClick={onClose}
                className="btn-playful w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-xs md:text-sm border-2 border-[#35234F]"
              >
                Cherish & Close ❤️
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
