import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HobiCharacter - 2D Full-Body Animated J-Hope K-pop Dancer Character
 * 
 * Animation States:
 * - 'idle': Natural bouncy groove, blinking, subtle head & arm bounce
 * - 'up': Jumps into the air, raises both arms with peace signs, legs extended
 * - 'down': Deep knee bend crouching b-boy street dance freeze
 * - 'left': Leans and steps left, pointing left with finger gun/gesture
 * - 'right': Leans and steps right, pointing right with finger gesture
 * - 'success': Joyful celebration dance with finger hearts and sparkle stars
 * - 'miss': Playful comical wobble with cute sweatdrop
 */
export default function HobiCharacter({
  state = 'idle', // 'idle' | 'up' | 'down' | 'left' | 'right' | 'success' | 'miss'
  combo = 0,
  showGlow = false,
}) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural eye blinking during idle
  useEffect(() => {
    const timer = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Motion variants for the full body container
  const characterVariants = {
    idle: {
      y: [0, -8, 0],
      rotate: [-1, 1, -1],
      scaleX: [1, 1.02, 1],
      scaleY: [1, 0.98, 1],
      transition: {
        duration: 0.75,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    up: {
      y: -36,
      rotate: 0,
      scaleX: 0.94,
      scaleY: 1.12,
      transition: { type: 'spring', stiffness: 500, damping: 18 },
    },
    down: {
      y: 22,
      rotate: 0,
      scaleX: 1.18,
      scaleY: 0.8,
      transition: { type: 'spring', stiffness: 480, damping: 20 },
    },
    left: {
      x: -32,
      y: -6,
      rotate: -13,
      scaleX: 1.06,
      transition: { type: 'spring', stiffness: 450, damping: 20 },
    },
    right: {
      x: 32,
      y: -6,
      rotate: 13,
      scaleX: 1.06,
      transition: { type: 'spring', stiffness: 450, damping: 20 },
    },
    success: {
      y: [-22, -4, -22],
      rotate: [-6, 6, -6],
      scale: [1.06, 1.12, 1.06],
      transition: {
        duration: 0.45,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    miss: {
      x: [-8, 8, -5, 5, 0],
      rotate: [-8, 8, -5, 5, 0],
      y: 8,
      scaleY: 0.94,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Subtle floor shadow underneath character
  const shadowVariants = {
    idle: {
      scaleX: [1, 1.18, 1],
      scaleY: [1, 1.06, 1],
      opacity: [0.38, 0.28, 0.38],
      transition: { duration: 0.75, repeat: Infinity, ease: 'easeInOut' },
    },
    up: {
      scaleX: 0.6,
      scaleY: 0.6,
      opacity: 0.12,
      transition: { duration: 0.2 },
    },
    down: {
      scaleX: 1.45,
      scaleY: 1.35,
      opacity: 0.6,
      transition: { duration: 0.2 },
    },
    left: {
      x: -24,
      scaleX: 1.15,
      opacity: 0.35,
      transition: { duration: 0.2 },
    },
    right: {
      x: 24,
      scaleX: 1.15,
      opacity: 0.35,
      transition: { duration: 0.2 },
    },
    success: {
      scaleX: [0.75, 1.1, 0.75],
      opacity: [0.2, 0.45, 0.2],
      transition: { duration: 0.45, repeat: Infinity },
    },
    miss: {
      scaleX: 1.15,
      opacity: 0.38,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-52 h-64 sm:w-60 sm:h-72 md:w-64 md:h-80 my-1">
      {/* Floating Sparkles, Stars, or Reaction Notes */}
      <AnimatePresence>
        {/* Glow halo when dancing correctly */}
        {showGlow && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 0.7 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/40 via-purple-400/40 to-yellow-300/40 blur-xl pointer-events-none z-0"
          />
        )}

        {/* Success floating stars & hearts */}
        {state === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 inset-x-0 flex items-center justify-center gap-2 z-30 pointer-events-none"
          >
            <span className="text-xl animate-bounce">✨</span>
            <span className="text-xs font-heading font-bold bg-pink-500 text-white px-3 py-1 rounded-full shadow-md border border-white">
              PERFECT GROOVE! 💜
            </span>
            <span className="text-xl animate-bounce">⭐</span>
          </motion.div>
        )}

        {/* Miss sweatdrop reaction */}
        {state === 'miss' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -10 }}
            animate={{ opacity: 1, scale: 1.2, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-4 z-30 pointer-events-none text-3xl filter drop-shadow"
          >
            💧
          </motion.div>
        )}

        {/* Up direction indicator */}
        {state === 'up' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: -8 }}
            exit={{ opacity: 0 }}
            className="absolute -top-6 z-30 pointer-events-none text-xs font-heading font-bold text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full border border-pink-300 shadow-sm"
          >
            ⚡ JUMP! ⚡
          </motion.div>
        )}

        {/* Left direction note */}
        {state === 'left' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: -15 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/4 -left-4 z-30 pointer-events-none text-lg"
          >
            🎶
          </motion.div>
        )}

        {/* Right direction note */}
        {state === 'right' && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 15 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/4 -right-4 z-30 pointer-events-none text-lg"
          >
            🎵
          </motion.div>
        )}

        {/* Combo fire indicator */}
        {combo >= 5 && state === 'idle' && (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-5 z-30 text-[11px] font-heading font-bold bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white px-2.5 py-0.5 rounded-full shadow-md border border-white"
          >
            HOT STREAK 🔥 {combo}x
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Full-Body 2D Character */}
      <motion.div
        variants={characterVariants}
        animate={state}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 220 260"
          className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(53,35,79,0.18)] overflow-visible"
        >
          <defs>
            {/* Hope World Streetwear Jacket Gradient */}
            <linearGradient id="hobiJacket" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B385E2" />
              <stop offset="50%" stopColor="#9656D1" />
              <stop offset="100%" stopColor="#7535B0" />
            </linearGradient>

            {/* Hat Gradient */}
            <linearGradient id="hobiHatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#FF9B42" />
            </linearGradient>

            {/* Pants Gradient */}
            <linearGradient id="hobiPantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#35234F" />
              <stop offset="100%" stopColor="#221535" />
            </linearGradient>

            {/* Sneakers Gradient */}
            <linearGradient id="hobiKicks" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFD84D" />
              <stop offset="100%" stopColor="#FF9B42" />
            </linearGradient>
          </defs>

          {/* ============================================================== */}
          {/* 1. LEGS & SNEAKERS */}
          {/* ============================================================== */}
          <g id="dancer-legs">
            {/* Left Leg */}
            <motion.path
              d={
                state === 'down'
                  ? 'M 88 152 Q 62 176 68 198 L 86 198 Q 88 175 98 152 Z'
                  : state === 'left'
                  ? 'M 88 152 L 72 198 L 92 198 L 100 152 Z'
                  : state === 'right'
                  ? 'M 88 152 L 92 198 L 110 198 L 100 152 Z'
                  : state === 'up'
                  ? 'M 88 148 L 84 186 L 102 186 L 100 148 Z'
                  : 'M 90 152 L 86 198 L 104 198 L 102 152 Z'
              }
              fill="url(#hobiPantsGrad)"
              stroke="#35234F"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />

            {/* Right Leg */}
            <motion.path
              d={
                state === 'down'
                  ? 'M 118 152 Q 148 176 142 198 L 124 198 Q 124 175 116 152 Z'
                  : state === 'left'
                  ? 'M 118 152 L 108 198 L 128 198 L 128 152 Z'
                  : state === 'right'
                  ? 'M 118 152 L 138 198 L 156 198 L 128 152 Z'
                  : state === 'up'
                  ? 'M 118 148 L 124 186 L 142 186 L 128 148 Z'
                  : 'M 116 152 L 122 198 L 140 198 L 128 152 Z'
              }
              fill="url(#hobiPantsGrad)"
              stroke="#35234F"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />

            {/* Cargo side pockets & style lines */}
            <rect x="78" y="160" width="11" height="13" rx="2" fill="#472F6B" opacity="0.6" />
            <rect x="128" y="160" width="11" height="13" rx="2" fill="#472F6B" opacity="0.6" />

            {/* Left Sneaker */}
            <g
              transform={
                state === 'down'
                  ? 'translate(64, 194) rotate(-8)'
                  : state === 'left'
                  ? 'translate(66, 194) rotate(-6)'
                  : state === 'right'
                  ? 'translate(86, 194)'
                  : state === 'up'
                  ? 'translate(78, 183) rotate(6)'
                  : 'translate(80, 194)'
              }
            >
              <path
                d="M 4 8 Q 2 2 14 2 L 28 2 Q 34 6 34 15 L 0 15 Q 0 8 4 8 Z"
                fill="url(#hobiKicks)"
                stroke="#35234F"
                strokeWidth="2.8"
              />
              <path d="M 0 15 L 34 15 L 34 18 L 0 18 Z" fill="#FF9B42" stroke="#35234F" strokeWidth="1.5" />
              <circle cx="15" cy="6" r="1.5" fill="#35234F" />
              <circle cx="22" cy="6" r="1.5" fill="#35234F" />
            </g>

            {/* Right Sneaker */}
            <g
              transform={
                state === 'down'
                  ? 'translate(122, 194) rotate(8)'
                  : state === 'left'
                  ? 'translate(104, 194)'
                  : state === 'right'
                  ? 'translate(132, 194) rotate(6)'
                  : state === 'up'
                  ? 'translate(120, 183) rotate(-6)'
                  : 'translate(118, 194)'
              }
            >
              <path
                d="M 4 8 Q 2 2 14 2 L 28 2 Q 34 6 34 15 L 0 15 Q 0 8 4 8 Z"
                fill="url(#hobiKicks)"
                stroke="#35234F"
                strokeWidth="2.8"
              />
              <path d="M 0 15 L 34 15 L 34 18 L 0 18 Z" fill="#FF9B42" stroke="#35234F" strokeWidth="1.5" />
              <circle cx="15" cy="6" r="1.5" fill="#35234F" />
              <circle cx="22" cy="6" r="1.5" fill="#35234F" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* 2. TORSO & OUTFIT */}
          {/* ============================================================== */}
          <g id="dancer-torso">
            {/* Oversized Jacket Body */}
            <path
              d="M 78 100 Q 108 94 138 100 L 144 154 Q 108 160 72 154 Z"
              fill="url(#hobiJacket)"
              stroke="#35234F"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Inner White Shirt Collar */}
            <path d="M 94 98 Q 108 110 122 98 Z" fill="#FFF9EC" stroke="#35234F" strokeWidth="2.2" />

            {/* Hope World / Sunshine Chest Emblem */}
            <circle cx="108" cy="122" r="10" fill="#FFD84D" stroke="#35234F" strokeWidth="2.2" />
            <circle cx="104.5" cy="119.5" r="1.3" fill="#35234F" />
            <circle cx="111.5" cy="119.5" r="1.3" fill="#35234F" />
            <path d="M 104.5 124 Q 108 127.5 111.5 124" stroke="#35234F" strokeWidth="1.4" fill="none" />

            {/* Kangaroo / Zipper Pocket Accent */}
            <path
              d="M 84 134 Q 108 130 132 134 L 136 152 Q 108 156 80 152 Z"
              fill="#A267D9"
              stroke="#35234F"
              strokeWidth="2.2"
            />
          </g>

          {/* ============================================================== */}
          {/* 3. ARMS & HANDS (PHYSICAL DANCE POSES) */}
          {/* ============================================================== */}
          <g id="dancer-arms">
            {/* UP STATE: Both Arms High In Air */}
            {state === 'up' && (
              <>
                {/* Left Arm High */}
                <path
                  d="M 80 102 Q 52 64 56 38"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 102 Q 52 64 56 38"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="56" cy="34" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
                <path d="M 52 29 L 50 19 M 56 27 L 56 17" stroke="#35234F" strokeWidth="2.8" strokeLinecap="round" />

                {/* Right Arm High */}
                <path
                  d="M 136 102 Q 164 64 160 38"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 102 Q 164 64 160 38"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="160" cy="34" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
                <path d="M 160 27 L 160 17 M 164 29 L 166 19" stroke="#35234F" strokeWidth="2.8" strokeLinecap="round" />
              </>
            )}

            {/* DOWN STATE: Low Crouching Dance Freeze */}
            {state === 'down' && (
              <>
                {/* Left Arm Down Touching Floor */}
                <path
                  d="M 80 106 Q 52 126 50 152"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 106 Q 52 126 50 152"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="50" cy="156" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />

                {/* Right Arm Cross-Chest Freeze */}
                <path
                  d="M 136 106 Q 146 130 118 142"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 106 Q 146 130 118 142"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="114" cy="142" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
              </>
            )}

            {/* LEFT STATE: Dynamic Point & Lean Left */}
            {state === 'left' && (
              <>
                {/* Left Arm Pointing Left */}
                <path
                  d="M 80 102 L 28 90"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 102 L 28 90"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="24" cy="88" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
                <path d="M 24 88 L 10 88" stroke="#35234F" strokeWidth="3.5" strokeLinecap="round" />

                {/* Right Arm On Chest / Pumping */}
                <path
                  d="M 136 102 Q 152 120 124 130"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 102 Q 152 120 124 130"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="120" cy="130" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
              </>
            )}

            {/* RIGHT STATE: Dynamic Point & Lean Right */}
            {state === 'right' && (
              <>
                {/* Left Arm On Chest */}
                <path
                  d="M 80 102 Q 64 120 92 130"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 102 Q 64 120 92 130"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="96" cy="130" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />

                {/* Right Arm Pointing Right */}
                <path
                  d="M 136 102 L 188 90"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 102 L 188 90"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="192" cy="88" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
                <path d="M 192 88 L 206 88" stroke="#35234F" strokeWidth="3.5" strokeLinecap="round" />
              </>
            )}

            {/* SUCCESS STATE: Double Finger Hearts */}
            {state === 'success' && (
              <>
                <path
                  d="M 80 102 Q 54 88 70 70"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 102 Q 54 88 70 70"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="72" cy="66" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
                <text x="64" y="60" fontSize="14">🫰</text>

                <path
                  d="M 136 102 Q 162 88 146 70"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 102 Q 162 88 146 70"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="144" cy="66" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
                <text x="136" y="60" fontSize="14">🫰</text>
              </>
            )}

            {/* MISS STATE: Playful Cute Shrug */}
            {state === 'miss' && (
              <>
                <path
                  d="M 80 106 Q 48 98 52 120"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 106 Q 48 98 52 120"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="52" cy="124" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />

                <path
                  d="M 136 106 Q 168 98 164 120"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 106 Q 168 98 164 120"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="164" cy="124" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
              </>
            )}

            {/* IDLE STATE: Bouncy Rhythm Sway with Wristbands */}
            {state === 'idle' && (
              <>
                {/* Left Arm with Pink Wristband */}
                <path
                  d="M 80 102 Q 58 122 68 140"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 102 Q 58 122 68 140"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <rect x="63" y="130" width="9" height="5" rx="2" fill="#FFB6CE" stroke="#35234F" strokeWidth="1" />
                <circle cx="70" cy="145" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />

                {/* Right Arm with Yellow Wristband */}
                <path
                  d="M 136 102 Q 158 122 148 140"
                  stroke="url(#hobiJacket)"
                  strokeWidth="17"
                  strokeLinecap="round"
                />
                <path
                  d="M 136 102 Q 158 122 148 140"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <rect x="144" y="130" width="9" height="5" rx="2" fill="#FFD84D" stroke="#35234F" strokeWidth="1" />
                <circle cx="146" cy="145" r="8" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.5" />
              </>
            )}
          </g>

          {/* ============================================================== */}
          {/* 4. HEAD, FACE, HAIR & BUCKET HAT */}
          {/* ============================================================== */}
          <g id="dancer-head">
            {/* Neck */}
            <rect x="101" y="84" width="14" height="18" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.2" />

            {/* Ears & Earring */}
            <circle cx="78" cy="66" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.2" />
            <circle cx="138" cy="66" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2.2" />
            <circle cx="78" cy="73" r="3" fill="none" stroke="#C0C0C0" strokeWidth="1.8" />

            {/* Face Shape */}
            <path
              d="M 80 58 Q 80 92 108 92 Q 136 92 136 58 Z"
              fill="#FFDFC4"
              stroke="#35234F"
              strokeWidth="3.2"
            />

            {/* Fluffy Idol Bangs & Side Hair */}
            <path
              d="M 78 48 Q 92 62 108 56 Q 124 62 138 48 Q 140 62 134 72 L 82 72 Z"
              fill="#3D271D"
            />

            {/* Blushing Cheeks */}
            <ellipse cx="86" cy="72" rx="6" ry="3.5" fill="#FF8CA9" opacity="0.8" />
            <ellipse cx="130" cy="72" rx="6" ry="3.5" fill="#FF8CA9" opacity="0.8" />

            {/* Eyes & Eyebrows */}
            {state === 'miss' ? (
              /* Miss Expression: Squint >_< */
              <g stroke="#35234F" strokeWidth="2.8" strokeLinecap="round" fill="none">
                <path d="M 88 62 L 97 68 M 97 62 L 88 68" />
                <path d="M 119 62 L 128 68 M 128 62 L 119 68" />
              </g>
            ) : isBlinking ? (
              /* Blinking ^_^ */
              <g stroke="#35234F" strokeWidth="2.8" strokeLinecap="round" fill="none">
                <path d="M 88 66 Q 93 61 97 66" />
                <path d="M 119 66 Q 124 61 128 66" />
              </g>
            ) : state === 'success' || state === 'up' ? (
              /* Joyful Smiling Eyes with Sparkle */
              <g>
                <path d="M 88 66 Q 93 59 97 66" stroke="#35234F" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 119 66 Q 124 59 128 66" stroke="#35234F" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 88 57 Q 93 54 97 57" stroke="#35234F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M 119 57 Q 124 54 128 57" stroke="#35234F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              /* Big Expressive Idol Eyes */
              <g>
                <circle cx="93" cy="65" r="5" fill="#35234F" />
                <circle cx="94.5" cy="63.5" r="1.8" fill="#FFFFFF" />
                <circle cx="91.5" cy="66.5" r="0.9" fill="#FFFFFF" />

                <circle cx="123" cy="65" r="5" fill="#35234F" />
                <circle cx="124.5" cy="63.5" r="1.8" fill="#FFFFFF" />
                <circle cx="121.5" cy="66.5" r="0.9" fill="#FFFFFF" />

                <path d="M 88 57 Q 93 54 97 57" stroke="#35234F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M 119 57 Q 124 54 128 57" stroke="#35234F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Mouth: J-Hope's Heart Smile */}
            {state === 'miss' ? (
              /* Cute Squiggly Mouth */
              <path d="M 101 78 Q 105 75 108 78 Q 111 75 115 78" stroke="#35234F" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            ) : state === 'success' || state === 'up' ? (
              /* Big Open Heart Smile */
              <g>
                <path
                  d="M 99 74 Q 108 89 117 74 Z"
                  fill="#E03A60"
                  stroke="#35234F"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
                <path d="M 102 74 Q 108 77 114 74" fill="#FFFFFF" stroke="#35234F" strokeWidth="1" />
              </g>
            ) : (
              /* Warm Friendly Smile */
              <path
                d="M 100 76 Q 108 84 116 76"
                stroke="#35234F"
                strokeWidth="2.6"
                fill="none"
                strokeLinecap="round"
              />
            )}

            {/* J-Hope's Bucket Hat & Takashi Smiley Daisy Pin */}
            <g id="bucket-hat">
              {/* Crown */}
              <path
                d="M 82 48 Q 108 34 134 48 L 138 34 Q 108 18 78 34 Z"
                fill="url(#hobiHatGrad)"
                stroke="#35234F"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />

              {/* Brim */}
              <path
                d="M 66 50 Q 108 40 150 50 Q 154 58 148 58 Q 108 48 68 58 Q 62 58 66 50 Z"
                fill="#FFD84D"
                stroke="#35234F"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />

              {/* Pink Ribbon Band */}
              <path
                d="M 80 46 Q 108 34 136 46 L 137 41 Q 108 29 79 41 Z"
                fill="#FFB6CE"
                stroke="#35234F"
                strokeWidth="1.6"
              />

              {/* Murakami Rainbow Smiley Flower Pin on Hat */}
              <g transform="translate(128, 32)">
                <circle cx="0" cy="0" r="7" fill="#9EDFFF" stroke="#35234F" strokeWidth="1.6" />
                <circle cx="0" cy="0" r="3.5" fill="#FFD84D" stroke="#35234F" strokeWidth="1.2" />
                <circle cx="-1.2" cy="-0.6" r="0.7" fill="#35234F" />
                <circle cx="1.2" cy="-0.6" r="0.7" fill="#35234F" />
                <path d="M -1.2 1.2 Q 0 2.2 1.2 1.2" stroke="#35234F" strokeWidth="0.8" fill="none" />
              </g>
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Dynamic Subtle Floor Shadow */}
      <motion.div
        variants={shadowVariants}
        animate={state}
        className="w-32 sm:w-36 md:w-44 h-4 rounded-full bg-[#35234F] -mt-3 blur-[2px] pointer-events-none"
      />
    </div>
  );
}
