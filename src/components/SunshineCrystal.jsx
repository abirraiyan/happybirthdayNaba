import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

export default function SunshineCrystal({ completedMissions = [], onInspect }) {
  const count = completedMissions.length;
  const isFullyRestored = count >= 5;

  const crystalTints = [
    { name: 'Warmth', color: 'from-amber-400 to-yellow-300', glow: '#FFD84D' },
    { name: 'Joy', color: 'from-orange-400 to-amber-300', glow: '#FF9B42' },
    { name: 'Hope', color: 'from-purple-500 to-violet-300', glow: '#A879D8' },
    { name: 'Rhythm', color: 'from-pink-400 to-rose-300', glow: '#FFB6CE' },
    { name: 'Love', color: 'from-sky-400 to-cyan-300', glow: '#9EDFFF' },
  ];

  return (
    <div className="relative card-playful p-4 md:p-6 bg-gradient-to-b from-white via-cream to-[#F3EBFF] overflow-hidden text-center">
      {/* Background ambient glow */}
      {isFullyRestored && (
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-yellow-300/40 via-pink-300/40 to-purple-400/40 blur-xl pointer-events-none"
        />
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Crystal Visual */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
            {/* Pulsing Aura */}
            <motion.div
              animate={isFullyRestored ? { scale: [1, 1.3, 1], rotate: [0, 180, 360] } : { scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute inset-0 rounded-full blur-md opacity-60 ${
                isFullyRestored
                  ? 'bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500'
                  : 'bg-amber-300/40'
              }`}
            />

            {/* Faceted Crystal Shape */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 text-4xl md:text-5xl filter drop-shadow-md select-none"
            >
              {isFullyRestored ? '✨💎✨' : '💎'}
            </motion.div>
          </div>

          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-dreamyPurple-dark border border-purple-200">
              <Zap className="w-3.5 h-3.5" />
              {isFullyRestored ? 'Crystal Fully Restored!' : 'Powering Sunshine Crystal'}
            </div>
            <h3 className="text-lg md:text-xl font-bold font-heading text-hobiText mt-1">
              {isFullyRestored ? 'Radiant Sunshine Crystal ☀️' : 'Dormant Sunshine Crystal'}
            </h3>
            <p className="text-xs md:text-sm text-hobiText-muted max-w-xs">
              {isFullyRestored
                ? 'All 5 elements awakened! The magical realm is beaming with joy!'
                : `Restore energy by clearing missions (${count}/5 elements awakened)`}
            </p>
          </div>
        </div>

        {/* Right: 5 Element Orbs */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((idx) => {
              const isCharged = completedMissions.includes(idx);
              const tint = crystalTints[idx - 1];
              return (
                <div key={idx} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${
                      isCharged
                        ? `bg-gradient-to-tr ${tint.color} border-[#35234F] shadow-playful`
                        : 'bg-gray-100 border-dashed border-gray-300 opacity-60'
                    }`}
                  >
                    {isCharged ? (
                      <span className="text-xs font-bold text-[#35234F]">✦</span>
                    ) : (
                      <span className="text-[10px] text-gray-400 font-bold">{idx}</span>
                    )}
                  </motion.div>
                  <span className="text-[10px] font-bold text-hobiText-muted mt-1">
                    {tint.name}
                  </span>
                </div>
              );
            })}
          </div>

          {isFullyRestored && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Sunshine Restored! Finale Unlocked!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
