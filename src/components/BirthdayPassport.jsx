import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Sparkles, CheckCircle2, ShieldCheck, Heart, Calendar, User, Compass } from 'lucide-react';
import { BIRTHDAY_CONFIG, calculateAge } from '../data/birthdayConfig';
import { ACHIEVEMENTS } from '../data/achievements';
import SunshineAvatar from './SunshineAvatar';

export default function BirthdayPassport({ isOpen, onClose, progress }) {
  const [activePage, setActivePage] = useState('id'); // 'id' | 'visas'
  if (!isOpen) return null;

  const dynamicAge = calculateAge(BIRTHDAY_CONFIG.dateOfBirth);
  const unlockedBadges = progress.unlockedAchievements || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-xl w-full my-6 card-playful bg-[#FFFDF7] border-4 border-[#35234F] shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white border-2 border-[#35234F] flex items-center justify-center text-[#35234F] hover:bg-rose-50 transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Passport Booklet Header Tabs */}
        <div className="bg-gradient-to-r from-dreamyPurple via-pink-400 to-warmOrange p-4 text-white text-center border-b-3 border-[#35234F]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xl">☀️</span>
            <h2 className="font-heading font-bold text-lg md:text-xl tracking-wider uppercase">
              Republic of Hobi World
            </h2>
            <span className="text-xl">💜</span>
          </div>
          <p className="text-xs font-medium text-white/90 tracking-widest uppercase">
            Official Birthday Adventure Passport
          </p>

          <div className="flex justify-center gap-2 mt-3">
            <button
              onClick={() => setActivePage('id')}
              className={`px-4 py-1 rounded-full text-xs font-heading font-bold transition-all border-2 border-[#35234F] ${
                activePage === 'id'
                  ? 'bg-sunshine text-[#35234F] shadow-playful'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              Identity Details
            </button>
            <button
              onClick={() => setActivePage('visas')}
              className={`px-4 py-1 rounded-full text-xs font-heading font-bold transition-all border-2 border-[#35234F] flex items-center gap-1.5 ${
                activePage === 'visas'
                  ? 'bg-sunshine text-[#35234F] shadow-playful'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              <span>Visa Stamps</span>
              <span className="bg-[#35234F] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {unlockedBadges.length}/5
              </span>
            </button>
          </div>
        </div>

        {/* PAGE 1: IDENTITY & CITIZENSHIP */}
        {activePage === 'id' && (
          <div className="p-5 md:p-6 bg-[#FFFDF7] space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-5 border-2 border-dashed border-purple-200 p-4 rounded-2xl bg-purple-50/40">
              {/* Photo Placeholder / Avatar */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-28 rounded-2xl border-3 border-[#35234F] bg-gradient-to-b from-yellow-100 to-pink-100 p-2 shadow-playful flex flex-col items-center justify-center relative overflow-hidden">
                  <SunshineAvatar size="small" withShades={true} isDancing={true} />
                  <span className="text-[10px] font-heading font-bold text-[#35234F] mt-1">
                    NABA ☀️
                  </span>
                  <div className="absolute top-0 right-0 w-5 h-5 bg-sunshine rounded-bl-lg border-l border-b border-[#35234F] flex items-center justify-center text-[10px]">
                    ⭐
                  </div>
                </div>
                <span className="text-[10px] font-bold text-hobiText-muted mt-1 uppercase tracking-wider">
                  Official Citizen #01
                </span>
              </div>

              {/* Passport Fields */}
              <div className="flex-1 grid grid-cols-2 gap-3 text-left w-full">
                <div>
                  <span className="text-[10px] font-bold text-hobiText-muted uppercase">Full Name</span>
                  <p className="font-heading font-bold text-base text-hobiText">{BIRTHDAY_CONFIG.recipientName}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-hobiText-muted uppercase">Passport No.</span>
                  <p className="font-heading font-bold text-xs md:text-sm text-dreamyPurple font-mono">
                    {BIRTHDAY_CONFIG.passportId}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-hobiText-muted uppercase">Date of Birth</span>
                  <p className="font-heading font-bold text-xs md:text-sm text-hobiText flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-pink-500" />
                    <span>15 Dec 2014</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-hobiText-muted uppercase">Dynamic Age</span>
                  <p className="font-heading font-bold text-xs md:text-sm text-warmOrange flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-sunshine" />
                    <span>{dynamicAge} Years Young ✨</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-hobiText-muted uppercase">Nationality</span>
                  <p className="font-heading font-bold text-xs md:text-sm text-hobiText">Hope World Citizen</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-hobiText-muted uppercase">Validity</span>
                  <p className="font-heading font-bold text-xs md:text-sm text-emerald-600">Lifetime Sunshine</p>
                </div>
              </div>
            </div>

            {/* Special Bond Signature */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
              <div>
                <span className="font-bold text-amber-800">Issued by Authority of:</span>
                <p className="font-heading font-bold text-hobiText">{BIRTHDAY_CONFIG.senderName}</p>
              </div>
              <div className="px-3 py-1 bg-white rounded-lg border border-[#35234F] text-[10px] font-mono font-bold text-[#35234F]">
                [AUTHENTICATED ❤️]
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: VISA STAMPS */}
        {activePage === 'visas' && (
          <div className="p-5 md:p-6 bg-[#FFFDF7] space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-sm text-hobiText">
                Collectible Achievement Visa Stamps
              </h3>
              <span className="text-xs font-bold text-pink-600">
                {unlockedBadges.length} of {ACHIEVEMENTS.length} Collected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ACHIEVEMENTS.map((ach) => {
                const isStamped = unlockedBadges.includes(ach.id);

                return (
                  <div
                    key={ach.id}
                    className={`p-3 rounded-2xl border-2 transition-all relative overflow-hidden text-left flex items-center gap-3 ${
                      isStamped
                        ? 'bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50 border-sunshine shadow-sm'
                        : 'bg-gray-50 border-dashed border-gray-300 opacity-55'
                    }`}
                  >
                    <div className="text-2xl p-1.5 rounded-xl bg-white border border-[#35234F]/20 shrink-0 shadow-sm">
                      {ach.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="font-heading font-bold text-xs text-hobiText truncate">
                          {ach.title}
                        </h4>
                        {isStamped && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-hobiText-muted line-clamp-1 mt-0.5">
                        {isStamped ? ach.stamp : 'Locked: Complete Mission'}
                      </p>
                    </div>

                    {isStamped && (
                      <div className="absolute -right-2 -bottom-2 text-2xl opacity-15 rotate-12 pointer-events-none">
                        🛂
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Passport Footer */}
        <div className="p-3 bg-gray-50 border-t-2 border-[#35234F]/10 text-center">
          <p className="text-[10px] text-hobiText-muted font-medium">
            Passport ID: {BIRTHDAY_CONFIG.passportId} • Valid Forever for Naba's Smiles ☀️
          </p>
        </div>
      </motion.div>
    </div>
  );
}
