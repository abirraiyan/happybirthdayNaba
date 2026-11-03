import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Sparkles, X, Calendar, Image as ImageIcon } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/birthdayConfig';

export default function MemoryWall({ isOpen, onClose }) {
  const [selectedMemory, setSelectedMemory] = useState(null);
  if (!isOpen) return null;

  const memories = BIRTHDAY_CONFIG.memories;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-2xl w-full my-6 card-playful bg-[#FFFDF7] border-4 border-[#35234F] p-5 md:p-8 shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white border-2 border-[#35234F] flex items-center justify-center text-[#35234F] hover:bg-rose-50 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            Naba & Big Brother Keepsakes
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText mt-2">
            The Memory Scrapbook Wall 📸✨
          </h2>
          <p className="text-xs text-hobiText-muted mt-0.5">
            Cherished moments, warm laughs, and sweet milestone memories!
          </p>
        </div>

        {/* Scrapbook Polaroids Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memories.map((mem) => (
            <motion.div
              key={mem.id}
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={() => setSelectedMemory(mem)}
              className={`p-3 pb-4 rounded-2xl bg-white border-2 border-[#35234F] shadow-playful cursor-pointer relative ${mem.rotation} transition-transform group`}
            >
              {/* Cute Washi Tape Decor */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-pink-200/90 border-t border-b border-pink-300 rotate-[-2deg] rounded-sm shadow-sm" />

              {/* Photo Area / Artwork Placeholder */}
              <div className={`w-full h-36 rounded-xl ${mem.color} border-2 border-[#35234F]/30 flex flex-col items-center justify-center relative overflow-hidden group-hover:brightness-105`}>
                <span className="text-4xl filter drop-shadow">{mem.emoji}</span>
                <span className="text-xs font-heading font-bold text-[#35234F] mt-1">
                  {mem.tag}
                </span>

                <div className="absolute bottom-1 right-2 text-lg">
                  {mem.sticker}
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="pt-2 text-left">
                <div className="flex items-center justify-between text-[11px] font-bold text-hobiText-muted mb-0.5">
                  <span>{mem.date}</span>
                  <span className="text-pink-500">❤️</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-hobiText leading-tight">
                  {mem.title}
                </h4>
                <p className="text-xs text-hobiText-muted line-clamp-2 mt-1">
                  "{mem.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Polaroid Lightbox / Zoomed Memory Modal */}
        <AnimatePresence>
          {selectedMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="card-playful p-6 bg-white max-w-sm w-full text-center relative border-3 border-[#35234F]"
              >
                <div className="text-5xl mb-2">{selectedMemory.emoji}</div>
                <span className="text-xs font-bold text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                  {selectedMemory.tag} • {selectedMemory.date}
                </span>
                <h3 className="font-heading font-bold text-xl text-hobiText mt-2">
                  {selectedMemory.title}
                </h3>
                <p className="text-sm text-hobiText mt-2 leading-relaxed font-body font-medium">
                  "{selectedMemory.caption}"
                </p>

                <button
                  onClick={() => setSelectedMemory(null)}
                  className="btn-playful mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-sunshine to-pink-300 text-[#35234F] font-heading font-bold text-xs border-2 border-[#35234F]"
                >
                  Close Memory ❤️
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
