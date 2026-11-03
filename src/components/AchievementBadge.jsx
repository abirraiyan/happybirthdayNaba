import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, CheckCircle, Sparkles, X } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';

export function AchievementToast({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -60, opacity: 0, scale: 0.9 }}
      className="fixed top-20 right-4 z-50 max-w-sm w-full card-playful p-4 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 shadow-playful flex items-center gap-3 border-2 border-[#35234F]"
    >
      <div className="text-3xl p-2 rounded-2xl bg-white border-2 border-[#35234F] shadow-sm">
        {achievement.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-dreamyPurple-dark uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Achievement Unlocked!
        </div>
        <h4 className="font-heading font-bold text-base text-hobiText leading-tight">
          {achievement.title}
        </h4>
        <p className="text-xs text-hobiText-muted mt-0.5">
          {achievement.description}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-black p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function AchievementBadgeList({ unlockedIds = [] }) {
  return (
    <div className="card-playful p-4 md:p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-dreamyPurple" />
          <h3 className="font-heading font-bold text-base md:text-lg text-hobiText">
            Hobi World Badges & Achievements
          </h3>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-dreamyPurple-dark border border-purple-200">
          {unlockedIds.length} / {ACHIEVEMENTS.length} Badges
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ACHIEVEMENTS.map((badge) => {
          const isUnlocked = unlockedIds.includes(badge.id);

          return (
            <motion.div
              key={badge.id}
              whileHover={{ y: -3 }}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-b from-yellow-50 to-purple-50 border-sunshine shadow-sm'
                  : 'bg-gray-50 border-dashed border-gray-200 opacity-60'
              }`}
            >
              <div className="relative text-3xl mb-2">
                <span>{badge.icon}</span>
                {isUnlocked ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 fill-white absolute -bottom-1 -right-1" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute -bottom-1 -right-1" />
                )}
              </div>
              <h4 className="font-heading font-bold text-xs text-hobiText leading-tight line-clamp-1">
                {badge.title}
              </h4>
              <p className="text-[10px] text-hobiText-muted mt-1 line-clamp-2">
                {isUnlocked ? badge.description : 'Locked'}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
