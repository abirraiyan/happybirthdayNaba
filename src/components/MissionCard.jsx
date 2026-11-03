import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Play, Sparkles } from 'lucide-react';

export default function MissionCard({ mission, isCompleted, onSelectMission }) {
  const { id, title, shortDesc, difficulty, starsReward, icon, tag } = mission;

  const difficultyColors = {
    Easy: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    Medium: 'bg-amber-100 text-amber-700 border-amber-300',
    Expert: 'bg-purple-100 text-purple-700 border-purple-300',
    Energetic: 'bg-pink-100 text-pink-700 border-pink-300',
    Mystery: 'bg-sky-100 text-sky-700 border-sky-300',
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelectMission(mission)}
      className={`relative card-playful p-5 flex flex-col justify-between overflow-hidden cursor-pointer transition-all ${
        isCompleted
          ? 'bg-gradient-to-br from-white via-amber-50 to-purple-50 ring-2 ring-sunshine'
          : 'bg-white hover:bg-yellow-50/50'
      }`}
    >
      {/* Completed watermark badge */}
      {isCompleted && (
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-tr from-sunshine to-warmOrange rounded-full border-2 border-[#35234F] flex items-center justify-center shadow-playful z-20">
          <CheckCircle2 className="w-8 h-8 text-[#35234F] fill-white" />
        </div>
      )}

      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#35234F] text-white flex items-center justify-center font-heading font-bold text-xs">
              0{id}
            </span>
            <span className="text-xs font-bold text-hobiText-muted uppercase tracking-wider">
              Mission {id}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                difficultyColors[difficulty] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {difficulty}
            </span>
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl md:text-4xl p-2 rounded-2xl bg-cream border-2 border-[#35234F]/20 shadow-sm shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg md:text-xl text-hobiText leading-tight">
              {title}
            </h3>
            <span className="text-[11px] font-bold text-dreamyPurple uppercase tracking-wide">
              {tag}
            </span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-hobiText-muted mb-4 line-clamp-3">
          {shortDesc}
        </p>
      </div>

      {/* Footer & Action */}
      <div className="pt-3 border-t-2 border-dashed border-[#35234F]/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-hobiText font-heading font-bold text-xs md:text-sm">
          <Star className="w-4 h-4 text-sunshine fill-sunshine" />
          <span>+{starsReward} Stars</span>
          {isCompleted && (
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Claimed
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectMission(mission);
          }}
          className={`btn-playful px-4 py-2 rounded-xl font-heading font-bold text-xs md:text-sm flex items-center gap-1.5 border-2 border-[#35234F] ${
            isCompleted
              ? 'bg-cream text-hobiText hover:bg-yellow-100'
              : 'bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] hover:brightness-105'
          }`}
        >
          {isCompleted ? (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Replay</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Now</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
