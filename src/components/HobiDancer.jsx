import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HobiDancer - Animated 2D J-Hope Inspired K-pop Dancer Character
 * 
 * Animation States:
 * - 'idle': Natural bouncy groove, blinking, head bobbing to the beat
 * - 'up': Energetic jump up with both hands thrown high in the air
 * - 'down': Low hip-hop street dance break / crouching groove
 * - 'left': Leaning and popping dance move pointing left
 * - 'right': Leaning and popping dance move pointing right
 * - 'success': Joyful celebration bounce with finger hearts and sparkles
 * - 'miss': Playful stumble with sweatdrop reaction
 */
export default function HobiDancer({
  state = 'idle', // 'idle' | 'up' | 'down' | 'left' | 'right' | 'success' | 'miss'
  size = 'medium', // 'small' | 'medium' | 'large'
  combo = 0,
}) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural blinking effect during idle
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200);

    return () => clearInterval(blinkInterval);
  }, []);

  // Root container scale & sizing
  const sizeClasses = {
    small: 'w-36 h-48',
    medium: 'w-48 h-64 md:w-56 md:h-72',
    large: 'w-64 h-80 md:w-72 md:h-96',
  };

  // Determine root character movement based on animation state
  const getCharacterVariants = () => ({
    idle: {
      y: [0, -6, 0],
      rotate: [-1.5, 1.5, -1.5],
      scaleX: [1, 1.02, 1],
      scaleY: [1, 0.98, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    up: {
      y: -32,
      rotate: 0,
      scaleX: 0.95,
      scaleY: 1.1,
      transition: { type: 'spring', stiffness: 450, damping: 20 },
    },
    down: {
      y: 22,
      rotate: 0,
      scaleX: 1.15,
      scaleY: 0.82,
      transition: { type: 'spring', stiffness: 400, damping: 18 },
    },
    left: {
      x: -28,
      y: -6,
      rotate: -12,
      scaleX: 1.05,
      transition: { type: 'spring', stiffness: 420, damping: 20 },
    },
    right: {
      x: 28,
      y: -6,
      rotate: 12,
      scaleX: 1.05,
      transition: { type: 'spring', stiffness: 420, damping: 20 },
    },
    success: {
      y: [-20, -5, -20],
      rotate: [-5, 5, -5],
      scale: [1.05, 1.1, 1.05],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    miss: {
      x: [-6, 6, -4, 4, 0],
      rotate: [-8, 8, -5, 5, 0],
      y: 8,
      scaleY: 0.95,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  });

  // Dynamic shadow scale & opacity depending on jump / crouch
  const getShadowVariants = () => ({
    idle: {
      scaleX: [1, 1.15, 1],
      scaleY: [1, 1.05, 1],
      opacity: [0.35, 0.25, 0.35],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
    },
    up: { scaleX: 0.65, scaleY: 0.65, opacity: 0.15, transition: { duration: 0.2 } },
    down: { scaleX: 1.4, scaleY: 1.25, opacity: 0.55, transition: { duration: 0.2 } },
    left: { x: -20, scaleX: 1.1, opacity: 0.3, transition: { duration: 0.2 } },
    right: { x: 20, scaleX: 1.1, opacity: 0.3, transition: { duration: 0.2 } },
    success: { scaleX: [0.8, 1.1, 0.8], opacity: [0.2, 0.4, 0.2], transition: { duration: 0.5, repeat: Infinity } },
    miss: { scaleX: 1.1, opacity: 0.35, transition: { duration: 0.3 } },
  });

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${sizeClasses[size] || sizeClasses.medium}`}>
      {/* Floating State Sparkles / Sweatdrop / Reaction Particles */}
      <AnimatePresence>
        {state === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-6 inset-x-0 flex items-center justify-center gap-3 z-30 pointer-events-none"
          >
            <span className="text-xl animate-bounce">✨</span>
            <span className="text-lg bg-pink-500 text-white font-heading font-bold px-2 py-0.5 rounded-full shadow-md text-xs">
              HOPE! 💜
            </span>
            <span className="text-xl animate-bounce">✨</span>
          </motion.div>
        )}

        {state === 'miss' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-4 z-30 pointer-events-none text-2xl"
          >
            💧
          </motion.div>
        )}

        {state === 'up' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute -top-4 inset-x-0 text-center z-30 pointer-events-none text-lg"
          >
            ⚡ UP! ⚡
          </motion.div>
        )}

        {combo >= 5 && state === 'idle' && (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-3 z-30 text-[10px] font-heading font-bold bg-gradient-to-r from-amber-400 to-pink-500 text-white px-2 py-0.5 rounded-full shadow-sm"
          >
            ON FIRE 🔥
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Animated Character Body */}
      <motion.div
        variants={getCharacterVariants()}
        animate={state}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
      >
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full filter drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Gradients for Streetwear Outfit */}
            <linearGradient id="hobiHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A879D8" />
              <stop offset="60%" stopColor="#8751B8" />
              <stop offset="100%" stopColor="#6C399E" />
            </linearGradient>

            <linearGradient id="hobiHat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD84D" />
              <stop offset="100%" stopColor="#FF9B42" />
            </linearGradient>

            <linearGradient id="hobiHair" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A3426" />
              <stop offset="100%" stopColor="#2A1B12" />
            </linearGradient>

            <linearGradient id="hobiPants" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#35234F" />
              <stop offset="100%" stopColor="#25173B" />
            </linearGradient>

            <linearGradient id="hobiSneakers" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9EC" />
              <stop offset="70%" stopColor="#FFD84D" />
              <stop offset="100%" stopColor="#FF9B42" />
            </linearGradient>
          </defs>

          {/* ============================================================== */}
          {/* LEGS & SNEAKERS */}
          {/* ============================================================== */}
          <g id="legs" className="transition-all duration-200">
            {/* Left Leg */}
            <motion.path
              d={
                state === 'down'
                  ? 'M 82 145 Q 60 165 65 185 L 82 185 Q 82 165 92 145 Z'
                  : state === 'left'
                  ? 'M 82 145 L 68 185 L 86 185 L 94 145 Z'
                  : state === 'right'
                  ? 'M 82 145 L 86 185 L 102 185 L 94 145 Z'
                  : state === 'up'
                  ? 'M 82 140 L 78 175 L 94 175 L 94 140 Z'
                  : 'M 84 145 L 80 185 L 96 185 L 94 145 Z'
              }
              fill="url(#hobiPants)"
              stroke="#35234F"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Right Leg */}
            <motion.path
              d={
                state === 'down'
                  ? 'M 108 145 Q 138 165 132 185 L 115 185 Q 115 165 106 145 Z'
                  : state === 'left'
                  ? 'M 108 145 L 100 185 L 118 185 L 118 145 Z'
                  : state === 'right'
                  ? 'M 108 145 L 126 185 L 142 185 L 118 145 Z'
                  : state === 'up'
                  ? 'M 108 140 L 114 175 L 130 175 L 118 140 Z'
                  : 'M 106 145 L 112 185 L 128 185 L 116 145 Z'
              }
              fill="url(#hobiPants)"
              stroke="#35234F"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Cargo Pocket Stitching Details */}
            <rect x="74" y="152" width="10" height="12" rx="2" fill="#442D66" opacity="0.6" />
            <rect x="116" y="152" width="10" height="12" rx="2" fill="#442D66" opacity="0.6" />

            {/* Left Sneaker */}
            <g
              transform={
                state === 'down'
                  ? 'translate(60, 182) rotate(-8)'
                  : state === 'left'
                  ? 'translate(62, 182) rotate(-6)'
                  : state === 'right'
                  ? 'translate(80, 182)'
                  : state === 'up'
                  ? 'translate(72, 172) rotate(6)'
                  : 'translate(74, 182)'
              }
            >
              <path
                d="M 4 8 Q 2 2 12 2 L 26 2 Q 32 6 32 14 L 0 14 Q 0 8 4 8 Z"
                fill="url(#hobiSneakers)"
                stroke="#35234F"
                strokeWidth="2.5"
              />
              <path d="M 0 14 L 32 14 L 32 17 L 0 17 Z" fill="#FF9B42" stroke="#35234F" strokeWidth="1.5" />
              <circle cx="14" cy="6" r="1.5" fill="#35234F" />
              <circle cx="20" cy="6" r="1.5" fill="#35234F" />
            </g>

            {/* Right Sneaker */}
            <g
              transform={
                state === 'down'
                  ? 'translate(112, 182) rotate(8)'
                  : state === 'left'
                  ? 'translate(96, 182)'
                  : state === 'right'
                  ? 'translate(122, 182) rotate(6)'
                  : state === 'up'
                  ? 'translate(110, 172) rotate(-6)'
                  : 'translate(108, 182)'
              }
            >
              <path
                d="M 4 8 Q 2 2 12 2 L 26 2 Q 32 6 32 14 L 0 14 Q 0 8 4 8 Z"
                fill="url(#hobiSneakers)"
                stroke="#35234F"
                strokeWidth="2.5"
              />
              <path d="M 0 14 L 32 14 L 32 17 L 0 17 Z" fill="#FF9B42" stroke="#35234F" strokeWidth="1.5" />
              <circle cx="14" cy="6" r="1.5" fill="#35234F" />
              <circle cx="20" cy="6" r="1.5" fill="#35234F" />
            </g>
          </g>

          {/* ============================================================== */}
          {/* TORSO & STREETWEAR HOODIE */}
          {/* ============================================================== */}
          <g id="torso">
            {/* Oversized Streetwear Hoodie Body */}
            <path
              d="M 72 96 Q 100 90 128 96 L 134 148 Q 100 154 66 148 Z"
              fill="url(#hobiHoodie)"
              stroke="#35234F"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Hoodie Collar / Neckline with White Inner Tee */}
            <path d="M 88 94 Q 100 106 112 94 Z" fill="#FFF9EC" stroke="#35234F" strokeWidth="2" />

            {/* Hope World / Sunshine Emblem on Chest */}
            <circle cx="100" cy="116" r="9" fill="#FFD84D" stroke="#35234F" strokeWidth="2" />
            {/* Happy Daisy / Smiley in emblem */}
            <circle cx="97" cy="114" r="1.2" fill="#35234F" />
            <circle cx="103" cy="114" r="1.2" fill="#35234F" />
            <path d="M 97 118 Q 100 121 103 118" stroke="#35234F" strokeWidth="1.2" fill="none" />

            {/* Hoodie Kangaroo Pocket */}
            <path
              d="M 78 128 Q 100 124 122 128 L 126 146 Q 100 150 74 146 Z"
              fill="#9867C9"
              stroke="#35234F"
              strokeWidth="2"
            />
          </g>

          {/* ============================================================== */}
          {/* ARMS & HANDS (DYNAMIC DANCE POSES) */}
          {/* ============================================================== */}
          <g id="arms" className="transition-all duration-200">
            {/* UP POSE: Both Arms High In Air */}
            {state === 'up' && (
              <>
                {/* Left Arm Raised High */}
                <path
                  d="M 74 98 Q 48 60 52 38"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 98 Q 48 60 52 38"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Left Hand: Peace sign ✌️ */}
                <circle cx="52" cy="34" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
                <path d="M 48 30 L 46 22 M 52 28 L 52 20" stroke="#35234F" strokeWidth="2.5" strokeLinecap="round" />

                {/* Right Arm Raised High */}
                <path
                  d="M 126 98 Q 152 60 148 38"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 126 98 Q 152 60 148 38"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Right Hand: Peace sign ✌️ */}
                <circle cx="148" cy="34" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
                <path d="M 148 28 L 148 20 M 152 30 L 154 22" stroke="#35234F" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}

            {/* DOWN POSE: Low Street Dance Pose */}
            {state === 'down' && (
              <>
                {/* Left Arm touching floor / knee */}
                <path
                  d="M 74 102 Q 50 120 48 145"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 102 Q 50 120 48 145"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="48" cy="148" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />

                {/* Right Arm bent across chest / knee */}
                <path
                  d="M 126 102 Q 135 125 110 135"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 126 102 Q 135 125 110 135"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="106" cy="136" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
              </>
            )}

            {/* LEFT POSE: Dynamic Lean & Point Left */}
            {state === 'left' && (
              <>
                {/* Left Arm pointing hard to the left */}
                <path
                  d="M 74 98 L 26 88"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 98 L 26 88"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Pointing Hand with finger pointing left */}
                <circle cx="22" cy="86" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
                <path d="M 22 86 L 10 86" stroke="#35234F" strokeWidth="3" strokeLinecap="round" />

                {/* Right Arm bent on hip / chest */}
                <path
                  d="M 126 98 Q 140 115 115 124"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 126 98 Q 140 115 115 124"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="112" cy="124" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
              </>
            )}

            {/* RIGHT POSE: Dynamic Lean & Point Right */}
            {state === 'right' && (
              <>
                {/* Left Arm bent on chest / hip */}
                <path
                  d="M 74 98 Q 60 115 85 124"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 98 Q 60 115 85 124"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="88" cy="124" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />

                {/* Right Arm pointing hard to the right */}
                <path
                  d="M 126 98 L 174 88"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 126 98 L 174 88"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Pointing Hand with finger pointing right */}
                <circle cx="178" cy="86" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
                <path d="M 178 86 L 190 86" stroke="#35234F" strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {/* SUCCESS POSE: Double Finger Hearts / Celebration */}
            {state === 'success' && (
              <>
                {/* Left Arm bringing finger heart to chest/cheek */}
                <path
                  d="M 74 98 Q 50 85 64 68"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 98 Q 50 85 64 68"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="66" cy="64" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
                <text x="60" y="58" fontSize="12">🫰</text>

                {/* Right Arm bringing finger heart to cheek */}
                <path
                  d="M 126 98 Q 150 85 136 68"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 126 98 Q 150 85 136 68"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="134" cy="64" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
                <text x="128" y="58" fontSize="12">🫰</text>
              </>
            )}

            {/* MISS POSE: Playful Shrug / Oops */}
            {state === 'miss' && (
              <>
                <path
                  d="M 74 102 Q 44 95 48 116"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 102 Q 44 95 48 116"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="48" cy="120" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />

                <path
                  d="M 126 102 Q 156 95 152 116"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 126 102 Q 156 95 152 116"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <circle cx="152" cy="120" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
              </>
            )}

            {/* IDLE POSE: Relaxed Street Dance Stance with subtle groove */}
            {state === 'idle' && (
              <>
                {/* Left Arm relaxing with cute wristband */}
                <path
                  d="M 74 98 Q 54 116 62 134"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 74 98 Q 54 116 62 134"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <rect x="58" y="125" width="8" height="4" rx="2" fill="#FFB6CE" />
                <circle cx="64" cy="138" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />

                {/* Right Arm relaxing with cute wristband */}
                <path
                  d="M 126 98 Q 146 116 138 134"
                  stroke="url(#hobiHoodie)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 126 98 Q 146 116 138 134"
                  stroke="#35234F"
                  strokeWidth="3.5"
                  fill="none"
                />
                <rect x="134" y="125" width="8" height="4" rx="2" fill="#FFD84D" />
                <circle cx="136" cy="138" r="7" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
              </>
            )}
          </g>

          {/* ============================================================== */}
          {/* HEAD, HAIR, FACE, BUCKET HAT */}
          {/* ============================================================== */}
          <g id="head">
            {/* Neck */}
            <rect x="94" y="80" width="12" height="16" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />

            {/* Ears & Silver Earring */}
            <circle cx="72" cy="62" r="6" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
            <circle cx="128" cy="62" r="6" fill="#FFDFC4" stroke="#35234F" strokeWidth="2" />
            {/* Left Silver Hoop Earring */}
            <circle cx="72" cy="68" r="2.5" fill="none" stroke="#C0C0C0" strokeWidth="1.5" />

            {/* Face Shape */}
            <path
              d="M 74 54 Q 74 86 100 86 Q 126 86 126 54 Z"
              fill="#FFDFC4"
              stroke="#35234F"
              strokeWidth="3"
            />

            {/* Fluffy K-Pop Idol Bangs & Hair Peeking Out */}
            <path
              d="M 72 44 Q 85 58 100 52 Q 115 58 128 44 Q 130 58 124 66 L 76 66 Z"
              fill="url(#hobiHair)"
            />

            {/* Blushing Cute Cheeks */}
            <ellipse cx="80" cy="68" rx="5" ry="3" fill="#FF8CA9" opacity="0.75" />
            <ellipse cx="120" cy="68" rx="5" ry="3" fill="#FF8CA9" opacity="0.75" />

            {/* EYES & BROWS */}
            {state === 'miss' ? (
              /* Miss Expression: Dizzy / cute sweat eyes >_< */
              <g stroke="#35234F" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <path d="M 82 58 L 90 64 M 90 58 L 82 64" />
                <path d="M 110 58 L 118 64 M 118 58 L 110 64" />
              </g>
            ) : isBlinking ? (
              /* Blinking cute curves ^_^ */
              <g stroke="#35234F" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <path d="M 82 62 Q 86 58 90 62" />
                <path d="M 110 62 Q 114 58 118 62" />
              </g>
            ) : state === 'success' || state === 'up' ? (
              /* Joyful Smiling Eyes ^_^ with sparkle catchlights */
              <g>
                <path d="M 82 62 Q 86 56 90 62" stroke="#35234F" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 110 62 Q 114 56 118 62" stroke="#35234F" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                {/* Cute eyebrow accents */}
                <path d="M 82 54 Q 86 52 90 54" stroke="#35234F" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 110 54 Q 114 52 118 54" stroke="#35234F" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              /* Standard Big Expressive Idol Eyes */
              <g>
                <circle cx="86" cy="62" r="4.5" fill="#35234F" />
                <circle cx="87.5" cy="60.5" r="1.6" fill="#FFFFFF" />
                <circle cx="84.5" cy="63.5" r="0.8" fill="#FFFFFF" />

                <circle cx="114" cy="62" r="4.5" fill="#35234F" />
                <circle cx="115.5" cy="60.5" r="1.6" fill="#FFFFFF" />
                <circle cx="112.5" cy="63.5" r="0.8" fill="#FFFFFF" />

                {/* Eyebrows */}
                <path d="M 82 54 Q 86 51 90 54" stroke="#35234F" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 110 54 Q 114 51 118 54" stroke="#35234F" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* J-HOPE'S FAMOUS SUNSHINE SMILE & MOUTH */}
            {state === 'miss' ? (
              /* Miss mouth: Small cute squiggly "w" or "oops" */
              <path d="M 94 74 Q 97 71 100 74 Q 103 71 106 74" stroke="#35234F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : state === 'success' || state === 'up' ? (
              /* Big iconic Heart-Smile with open mouth */
              <g>
                <path
                  d="M 92 70 Q 100 84 108 70 Z"
                  fill="#E03A60"
                  stroke="#35234F"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path d="M 95 70 Q 100 73 105 70" fill="#FFFFFF" stroke="#35234F" strokeWidth="1" />
              </g>
            ) : (
              /* Sweet friendly warm smile */
              <path
                d="M 93 72 Q 100 79 107 72"
                stroke="#35234F"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            )}

            {/* ============================================================ */}
            {/* ICONIC J-HOPE BUCKET HAT WITH SUNSHINE FLOWER PIN */}
            {/* ============================================================ */}
            <g id="bucketHat">
              {/* Hat Crown */}
              <path
                d="M 76 46 Q 100 32 124 46 L 128 32 Q 100 16 72 32 Z"
                fill="url(#hobiHat)"
                stroke="#35234F"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Hat Brim */}
              <path
                d="M 62 48 Q 100 38 138 48 Q 142 56 136 56 Q 100 46 64 56 Q 58 56 62 48 Z"
                fill="#FFD84D"
                stroke="#35234F"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Colorful Hat Band */}
              <path
                d="M 74 44 Q 100 32 126 44 L 127 39 Q 100 27 73 39 Z"
                fill="#FFB6CE"
                stroke="#35234F"
                strokeWidth="1.5"
              />

              {/* Takashi Murakami / Hope World Smiley Daisy Pin on Hat */}
              <g transform="translate(118, 30)">
                <circle cx="0" cy="0" r="6" fill="#9EDFFF" stroke="#35234F" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" fill="#FFD84D" stroke="#35234F" strokeWidth="1" />
                <circle cx="-1" cy="-0.5" r="0.6" fill="#35234F" />
                <circle cx="1" cy="-0.5" r="0.6" fill="#35234F" />
                <path d="M -1 1 Q 0 2 1 1" stroke="#35234F" strokeWidth="0.8" fill="none" />
              </g>
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Subtle Dynamic Stage Shadow Beneath the Character */}
      <motion.div
        variants={getShadowVariants()}
        animate={state}
        className="w-28 md:w-36 h-4 md:h-5 rounded-full bg-[#35234F] -mt-3 blur-[2px] pointer-events-none"
      />
    </div>
  );
}
