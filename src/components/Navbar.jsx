import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music, RotateCcw, Sparkles, Home } from 'lucide-react';

export default function Navbar({
  stars = 0,
  onGoHome,
  onOpenAchievements,
  onResetProgress,
  isMuted,
  toggleMute,
  musicActive,
  toggleMusic,
  isAllCompleted,
  onOpenFinale,
  currentScreen
}) {
  return (
    <header className="sticky top-0 z-40 w-full px-3 py-2.5 md:px-6 md:py-3.5 glass-panel border-b-2 border-[#35234F]/10 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and Greeting */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <motion.div
            whileHover={{ rotate: 18, scale: 1.1 }}
            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-tr from-sunshine to-warmOrange border-2 border-[#35234F] flex items-center justify-center text-lg md:text-xl shadow-playful"
          >
            ☀️
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base md:text-xl text-hobiText tracking-tight group-hover:text-dreamyPurple transition-colors">
                HOBI WORLD
              </span>
              <span className="text-xs bg-sunshine px-1.5 py-0.5 rounded-full font-heading font-bold border border-[#35234F]/30 text-[#35234F]">
                ☀️ NABA
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-hobiText-muted font-medium -mt-0.5 hidden sm:block">
              A Special Birthday Adventure
            </p>
          </div>
        </button>

        {/* Right Action Center */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Stars Pill */}
          <motion.div
            key={stars}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1 md:px-3.5 md:py-1.5 rounded-full bg-gradient-to-r from-yellow-100 to-amber-200 border-2 border-[#35234F] shadow-playful text-[#35234F]"
          >
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              className="text-base md:text-lg select-none"
            >
              ⭐
            </motion.span>
            <span className="font-heading font-bold text-xs md:text-sm">
              {stars}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-hobiText-muted hidden xs:inline">
              Stars
            </span>
          </motion.div>

          {/* Birthday Finale Shortcut if completed */}
          {isAllCompleted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenFinale}
              className="flex items-center gap-1 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-heading font-bold text-xs md:text-sm border-2 border-[#35234F] shadow-playful animate-pulse"
              title="View Grand Birthday Finale"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Finale! 🎂</span>
            </motion.button>
          )}

          {/* Sound BGM Toggle */}
          <button
            onClick={toggleMusic}
            title={musicActive ? "Pause Cheerful Music" : "Play Cheerful Sunshine Music"}
            className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-[#35234F] flex items-center justify-center transition-all ${
              musicActive
                ? 'bg-gradient-to-tr from-sunshine to-pink-300 shadow-playful animate-bounce'
                : 'bg-white hover:bg-yellow-50 text-gray-500'
            }`}
          >
            <Music className={`w-4 h-4 ${musicActive ? 'text-[#35234F]' : 'text-gray-400'}`} />
          </button>

          {/* Audio Sound FX Mute Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white hover:bg-yellow-50 border-2 border-[#35234F] flex items-center justify-center text-[#35234F] shadow-sm transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset / Restart option */}
          <button
            onClick={() => {
              if (window.confirm("Do you want to reset your stars and replay from the start?")) {
                onResetProgress();
              }
            }}
            title="Reset Game Progress (Replay Adventure)"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white hover:bg-red-50 border-2 border-[#35234F] flex items-center justify-center text-gray-500 hover:text-red-600 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
