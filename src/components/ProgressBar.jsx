import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ completedCount = 0, totalCount = 5, percentage = 0 }) {
  return (
    <div className="w-full card-playful p-3.5 md:p-5 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base md:text-lg">🗺️</span>
          <span className="font-heading font-bold text-sm md:text-base text-hobiText">
            Adventure Progress
          </span>
          <span className="text-xs bg-purple-100 text-dreamyPurple-dark font-bold px-2 py-0.5 rounded-full border border-purple-200">
            {completedCount} / {totalCount} Missions Cleared
          </span>
        </div>
        <div className="font-heading font-bold text-base md:text-lg text-warmOrange">
          {percentage}%
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-4 md:h-5 bg-gray-100 rounded-full border-2 border-[#35234F] overflow-hidden p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(5, percentage)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-sunshine via-warmOrange to-dreamyPurple relative shadow-inner"
        >
          {/* Shimmer light effect */}
          <div className="absolute inset-0 bg-white/25 rounded-full animate-pulse" />
        </motion.div>
      </div>

      <div className="flex justify-between items-center text-[11px] text-hobiText-muted mt-2 font-medium">
        <span>Start (0%)</span>
        <span>Restore Crystal (100%) 💎</span>
      </div>
    </div>
  );
}
