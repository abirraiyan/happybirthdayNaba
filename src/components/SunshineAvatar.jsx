import React from 'react';
import { motion } from 'framer-motion';

export default function SunshineAvatar({ size = 'medium', withShades = true, isDancing = false, isExcited = false }) {
  const sizeMap = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-40 h-40',
    hero: 'w-56 h-56 md:w-64 md:h-64',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size] || sizeMap.medium}`}>
      {/* Radiant Rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: isDancing ? 6 : 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 md:w-3 h-8 md:h-12 -translate-x-1/2 origin-bottom rounded-full"
            style={{
              transform: `translate(-50%, -100%) rotate(${i * 30}deg) translateY(-32%)`,
              background: i % 2 === 0 ? 'linear-gradient(to top, #FFD84D, #FFA800)' : 'linear-gradient(to top, #FF9B42, #FFB6CE)',
              opacity: 0.85,
            }}
          />
        ))}
      </motion.div>

      {/* Main Smiling Sun Body */}
      <motion.div
        animate={
          isDancing
            ? { y: [0, -12, 0], rotate: [-6, 6, -6], scale: [1, 1.05, 1] }
            : isExcited
            ? { scale: [1, 1.12, 1], rotate: [-3, 3, -3] }
            : { y: [0, -6, 0] }
        }
        transition={{ duration: isDancing ? 0.8 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-[#FF9B42] via-[#FFD84D] to-[#FFF08A] border-4 border-[#35234F] shadow-playful flex flex-col items-center justify-center p-2"
      >
        {/* Sunglasses or Cute Big Eyes */}
        {withShades ? (
          <div className="flex items-center justify-center gap-1.5 mt-1">
            {/* Left Sunglass Lens */}
            <div className="w-5 h-4 md:w-8 md:h-6 bg-[#35234F] rounded-b-xl border-2 border-white/60 relative overflow-hidden">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            </div>
            {/* Bridge */}
            <div className="w-1.5 md:w-2 h-1 bg-[#35234F]" />
            {/* Right Sunglass Lens */}
            <div className="w-5 h-4 md:w-8 md:h-6 bg-[#35234F] rounded-b-xl border-2 border-white/60 relative overflow-hidden">
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 mt-1">
            <div className="w-3 h-4 bg-[#35234F] rounded-full relative">
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5" />
            </div>
            <div className="w-3 h-4 bg-[#35234F] rounded-full relative">
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5" />
            </div>
          </div>
        )}

        {/* Blushing Cheeks & Happy Smile */}
        <div className="flex items-center justify-between w-3/4 mt-1">
          <div className="w-2.5 h-1.5 md:w-3.5 md:h-2 bg-[#FF80A0] rounded-full opacity-80" />
          {/* Big Open Smile */}
          <div className="w-6 md:w-8 h-3 md:h-4 border-b-4 border-[#35234F] rounded-b-full bg-[#E03A60]/90 relative overflow-hidden">
            <div className="w-3 h-1.5 bg-white rounded-b-sm mx-auto" />
          </div>
          <div className="w-2.5 h-1.5 md:w-3.5 md:h-2 bg-[#FF80A0] rounded-full opacity-80" />
        </div>

        {/* Mini Purple Heart Pin on the side */}
        <span className="absolute -top-1 -right-1 text-sm md:text-base animate-pulse">
          💜
        </span>
      </motion.div>
    </div>
  );
}
