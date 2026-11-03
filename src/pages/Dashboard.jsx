import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Trophy,
  Star,
  ChevronRight,
  Gift,
  PartyPopper,
  Compass,
  Heart,
  Camera,
  Mail,
  Cake,
  Smile,
  Award
} from 'lucide-react';
import SunshineAvatar from '../components/SunshineAvatar';
import ProgressBar from '../components/ProgressBar';
import SunshineCrystal from '../components/SunshineCrystal';
import MissionCard from '../components/MissionCard';
import AchievementBadgeList from '../components/AchievementBadge';
import BirthdayPassport from '../components/BirthdayPassport';
import HobiPet from '../components/HobiPet';
import MysteryGiftMachine from '../components/MysteryGiftMachine';
import DailyFortuneStar from '../components/DailyFortuneStar';
import MemoryWall from '../components/MemoryWall';
import TwelveCandlesCake from '../components/TwelveCandlesCake';
import BirthdayLetter from '../components/BirthdayLetter';

import { MISSIONS } from '../data/missions';
import { BIRTHDAY_CONFIG, calculateAge } from '../data/birthdayConfig';

export default function Dashboard({
  progress,
  onSelectMission,
  onOpenFinale,
  onInteractPet,
  onUnlockCollectible,
  onRevealFortune,
  onBlowCandle,
  onBlowAllCandles,
  onRelightCandles,
  sound
}) {
  const { stars, completedMissions, unlockedAchievements, petHappiness, unlockedCollectibles, blownCandleIndices } = progress;
  const completedCount = completedMissions.length;
  const totalCount = MISSIONS.length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const isAllCompleted = completedCount >= totalCount;

  const dynamicAge = calculateAge(BIRTHDAY_CONFIG.dateOfBirth);

  // Modals state for cute interactive features
  const [showPassport, setShowPassport] = useState(false);
  const [showPet, setShowPet] = useState(false);
  const [showGiftMachine, setShowGiftMachine] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [showMemoryWall, setShowMemoryWall] = useState(false);
  const [showCandles, setShowCandles] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8 select-none">
      {/* 1. TOP PROFILE & WELCOME BANNER */}
      <div className="card-playful p-5 md:p-8 bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left z-10">
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer shrink-0">
            <SunshineAvatar size="large" withShades={true} isDancing={true} />
          </motion.div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#35234F]/20 text-xs font-bold text-hobiText mb-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Explorer Status: Active Sunshine • {dynamicAge} Years Young ✨</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-hobiText leading-tight">
              Welcome back, Sunshine! ☀️
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-hobiText-muted max-w-md mt-1 font-medium">
              Ready to restore Hobi World, <span className="font-bold text-hobiText">{BIRTHDAY_CONFIG.recipientName}</span>? Clear the 5 missions below to unlock your grand birthday finale!
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#35234F] text-xs font-bold text-hobiText shadow-sm">
                <Star className="w-4 h-4 text-sunshine fill-sunshine" />
                <span>{stars} Stars</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#35234F] text-xs font-bold text-hobiText shadow-sm">
                <Trophy className="w-4 h-4 text-dreamyPurple" />
                <span>{completedCount}/5 Missions Cleared</span>
              </div>

              <button
                onClick={() => {
                  sound.playPop();
                  setShowPassport(true);
                }}
                className="btn-playful flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine hover:bg-yellow-300 border-2 border-[#35234F] text-xs font-heading font-bold text-[#35234F]"
              >
                <span>🛂 Birthday Passport</span>
              </button>
            </div>
          </div>
        </div>

        {/* Finale Ready Banner if all 5 completed */}
        {isAllCompleted && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center z-10 bg-white/95 p-5 rounded-3xl border-3 border-[#35234F] shadow-playful"
          >
            <div className="text-4xl animate-bounce mb-1">🎂🎉</div>
            <h3 className="font-heading font-bold text-lg text-hobiText">
              All Missions Cleared!
            </h3>
            <p className="text-xs text-hobiText-muted max-w-xs mb-3">
              The Sunshine Crystal is fully restored! Your big brother's birthday celebration is ready!
            </p>
            <button
              onClick={onOpenFinale}
              className="btn-playful px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-amber-400 text-white font-heading font-bold text-xs md:text-sm border-2 border-[#35234F] flex items-center gap-1.5"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Enter Birthday Finale! 🎂</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* 2. CUTE INTERACTIVE BIRTHDAY FUN HUB */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg md:text-xl font-heading font-bold text-hobiText flex items-center gap-2">
              <span>Naba's Birthday Playground & Keepsakes</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-300">
                Cute Extras
              </span>
            </h2>
            <p className="text-xs text-hobiText-muted">
              Interactive surprises, companion pet, lucky fortunes, memory wall, and birthday fun!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Passport */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              setShowPassport(true);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-[#35234F] shadow-playful flex flex-col items-center text-center cursor-pointer group"
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🛂</span>
            <span className="font-heading font-bold text-xs text-hobiText">Passport</span>
            <span className="text-[10px] text-hobiText-muted mt-0.5">Visas & Age {dynamicAge}</span>
          </motion.button>

          {/* 2. Hobi's Pet */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              setShowPet(true);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-[#35234F] shadow-playful flex flex-col items-center text-center cursor-pointer group"
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🐾</span>
            <span className="font-heading font-bold text-xs text-hobiText">Hobi's Pet</span>
            <span className="text-[10px] text-pink-600 font-bold mt-0.5">{petHappiness}% Happy</span>
          </motion.button>

          {/* 3. Mystery Gift Machine */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              setShowGiftMachine(true);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-[#35234F] shadow-playful flex flex-col items-center text-center cursor-pointer group"
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🎰</span>
            <span className="font-heading font-bold text-xs text-hobiText">Gift Machine</span>
            <span className="text-[10px] text-purple-700 font-bold mt-0.5">{unlockedCollectibles.length} Unboxed</span>
          </motion.button>

          {/* 4. Daily Fortune Star */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              setShowFortune(true);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-[#35234F] shadow-playful flex flex-col items-center text-center cursor-pointer group"
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">⭐</span>
            <span className="font-heading font-bold text-xs text-hobiText">Daily Fortune</span>
            <span className="text-[10px] text-amber-700 font-bold mt-0.5">Lucky Star ✨</span>
          </motion.button>

          {/* 5. Memory Wall */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              setShowMemoryWall(true);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-[#35234F] shadow-playful flex flex-col items-center text-center cursor-pointer group"
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">📸</span>
            <span className="font-heading font-bold text-xs text-hobiText">Memory Wall</span>
            <span className="text-[10px] text-sky-700 font-bold mt-0.5">Polaroid Notes</span>
          </motion.button>

          {/* 6. 12 Candles Cake */}
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playPop();
              setShowCandles(true);
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-100 border-2 border-[#35234F] shadow-playful flex flex-col items-center text-center cursor-pointer group"
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🎂</span>
            <span className="font-heading font-bold text-xs text-hobiText">12 Candles</span>
            <span className="text-[10px] text-pink-600 font-bold mt-0.5">Make a Wish 🌬️</span>
          </motion.button>
        </div>
      </div>

      {/* 3. SUNSHINE CRYSTAL RESTORATION STATUS */}
      <SunshineCrystal completedMissions={completedMissions} />

      {/* 4. ADVENTURE PROGRESS TRACK */}
      <ProgressBar
        completedCount={completedCount}
        totalCount={totalCount}
        percentage={percentage}
      />

      {/* 5. THE FIVE MAIN ADVENTURE MISSIONS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-hobiText">
              Sunshine Adventure Missions 🌟
            </h2>
            <p className="text-xs md:text-sm text-hobiText-muted">
              Complete each exciting mission to earn sunshine stars, awaken crystal facets, and restore Hobi World!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {MISSIONS.map((mission) => {
            const isCompleted = completedMissions.includes(mission.id);

            return (
              <MissionCard
                key={mission.id}
                mission={mission}
                isCompleted={isCompleted}
                onSelectMission={onSelectMission}
              />
            );
          })}
        </div>
      </div>

      {/* 6. ACHIEVEMENT COLLECTION (5 Collectible Badges) */}
      <AchievementBadgeList unlockedIds={unlockedAchievements} />

      {/* MODALS FOR INTERACTIVE FEATURES */}
      <BirthdayPassport
        isOpen={showPassport}
        onClose={() => setShowPassport(false)}
        progress={progress}
      />

      <HobiPet
        isOpen={showPet}
        onClose={() => setShowPet(false)}
        happiness={petHappiness}
        onInteract={onInteractPet}
        sound={sound}
      />

      <MysteryGiftMachine
        isOpen={showGiftMachine}
        onClose={() => setShowGiftMachine(false)}
        unlockedIds={unlockedCollectibles}
        onUnlock={onUnlockCollectible}
        sound={sound}
      />

      <DailyFortuneStar
        isOpen={showFortune}
        onClose={() => setShowFortune(false)}
        onReveal={onRevealFortune}
        sound={sound}
      />

      <MemoryWall
        isOpen={showMemoryWall}
        onClose={() => setShowMemoryWall(false)}
      />

      <TwelveCandlesCake
        isOpen={showCandles}
        onClose={() => setShowCandles(false)}
        blownCandleIndices={blownCandleIndices}
        onBlowCandle={onBlowCandle}
        onBlowAll={onBlowAllCandles}
        onRelight={onRelightCandles}
        sound={sound}
      />

      <BirthdayLetter
        isOpen={showLetter}
        onClose={() => setShowLetter(false)}
        onReplayCelebration={onOpenFinale}
      />
    </div>
  );
}
