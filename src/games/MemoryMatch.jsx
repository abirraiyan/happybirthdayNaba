import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Star, Trophy, Sparkles } from 'lucide-react';
import { fireCelebrationConfetti } from '../components/Confetti';

const CARD_PAIRS = [
  { id: 'sun', symbol: '☀️', name: 'Sunshine', bg: 'from-amber-200 to-yellow-300' },
  { id: 'music', symbol: '🎵', name: 'Music', bg: 'from-pink-200 to-rose-300' },
  { id: 'butterfly', symbol: '🦋', name: 'Butterfly', bg: 'from-sky-200 to-blue-300' },
  { id: 'rainbow', symbol: '🌈', name: 'Rainbow', bg: 'from-purple-200 to-pink-200' },
  { id: 'purple_heart', symbol: '💜', name: 'Purple Heart', bg: 'from-purple-300 to-indigo-300' },
  { id: 'star', symbol: '⭐', name: 'Star', bg: 'from-yellow-200 to-amber-300' },
  { id: 'microphone', symbol: '🎤', name: 'Microphone', bg: 'from-emerald-200 to-teal-300' },
  { id: 'disco_ball', symbol: '🪩', name: 'Disco Ball', bg: 'from-indigo-200 to-purple-300' },
];

function generateShuffledCards() {
  const cards = [];
  CARD_PAIRS.forEach((item, index) => {
    cards.push({ uid: `${item.id}_a`, pairId: item.id, ...item });
    cards.push({ uid: `${item.id}_b`, pairId: item.id, ...item });
  });
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function MemoryMatch({ onComplete, onBack, sound, isAlreadyCompleted }) {
  const [cards, setCards] = useState(() => generateShuffledCards());
  const [flippedUids, setFlippedUids] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { playCardFlip, playMatchSuccess, playMissionComplete } = sound;

  const handleCardClick = (card) => {
    if (isProcessing) return;
    if (flippedUids.includes(card.uid) || matchedIds.includes(card.pairId)) return;

    playCardFlip();

    const newFlipped = [...flippedUids, card.uid];
    setFlippedUids(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsProcessing(true);

      const firstCard = cards.find(c => c.uid === newFlipped[0]);
      const secondCard = card;

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        setTimeout(() => {
          playMatchSuccess();
          const nextMatched = [...matchedIds, firstCard.pairId];
          setMatchedIds(nextMatched);
          setFlippedUids([]);
          setIsProcessing(false);

          if (nextMatched.length === CARD_PAIRS.length) {
            // Game Won!
            setIsWon(true);
            playMissionComplete();
            fireCelebrationConfetti();
            onComplete(2);
          }
        }, 500);
      } else {
        // Did not match: flip back
        setTimeout(() => {
          setFlippedUids([]);
          setIsProcessing(false);
        }, 900);
      }
    }
  };

  const handleReset = () => {
    setCards(generateShuffledCards());
    setFlippedUids([]);
    setMatchedIds([]);
    setMoves(0);
    setIsWon(false);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center">
      {/* Top Header Controls */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="btn-playful flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Mission</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold">
            <span>Moves: {moves}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold shadow-playful">
            <Sparkles className="w-4 h-4 text-warmOrange" />
            <span>Pairs: {matchedIds.length} / {CARD_PAIRS.length}</span>
          </div>
        </div>
      </div>

      {/* Main Board Container */}
      <div className="w-full card-playful p-4 md:p-6 bg-gradient-to-b from-[#FFF9EC] to-amber-50 relative">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-hobiText">
            Hobi Memory Match 🪩
          </h2>
          <p className="text-xs md:text-sm text-hobiText-muted">
            Flip cards to discover matching pairs of sunshine and music symbols!
          </p>
        </div>

        {/* 16 Cards Grid (4x4) */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-lg mx-auto">
          {cards.map((card) => {
            const isFlipped = flippedUids.includes(card.uid) || matchedIds.includes(card.pairId);
            const isMatched = matchedIds.includes(card.pairId);

            return (
              <div
                key={card.uid}
                onClick={() => handleCardClick(card)}
                className="perspective-1000 aspect-square cursor-pointer select-none"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full relative transform-style-3d rounded-2xl shadow-sm"
                >
                  {/* Card Back (Hidden state) */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-tr from-dreamyPurple to-pink-300 border-2 border-[#35234F] shadow-playful flex items-center justify-center p-2 hover:brightness-105">
                    <span className="text-xl md:text-2xl font-heading font-bold text-white drop-shadow">
                      ☀️
                    </span>
                  </div>

                  {/* Card Front (Revealed state) */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-[#35234F] flex flex-col items-center justify-center p-1 bg-gradient-to-br ${
                      card.bg
                    } ${isMatched ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}
                  >
                    <span className="text-3xl md:text-4xl">{card.symbol}</span>
                    <span className="text-[9px] md:text-[10px] font-heading font-bold text-[#35234F] mt-1 leading-none text-center">
                      {card.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* WIN MODAL */}
        {isWon && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-white/95 backdrop-blur-md rounded-3xl"
          >
            <div className="text-5xl animate-bounce mb-2">🎉🧠✨</div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText">
              PERFECT MATCH, NABAAA!
            </h2>
            <p className="text-sm text-hobiText-muted max-w-sm mt-2">
              You found all 8 pairs in <span className="font-bold text-dreamyPurple">{moves} moves</span>! The Joy element has energized the Sunshine Crystal!
            </p>

            <div className="my-4 px-4 py-2 rounded-xl bg-orange-100 border-2 border-orange-300 flex items-center gap-2">
              <Star className="w-5 h-5 text-warmOrange fill-warmOrange" />
              <span className="font-heading font-bold text-sm text-[#35234F]">
                {isAlreadyCompleted ? 'Mission Already Completed (+0 Stars)' : '+20 Sunshine Stars Earned!'}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="btn-playful px-5 py-2.5 rounded-xl bg-white border-2 border-[#35234F] font-heading font-bold text-xs md:text-sm flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
              <button
                onClick={onBack}
                className="btn-playful px-6 py-2.5 rounded-xl bg-gradient-to-r from-warmOrange to-amber-400 text-[#35234F] font-heading font-bold text-xs md:text-sm border-2 border-[#35234F]"
              >
                Back to Dashboard 🚀
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
