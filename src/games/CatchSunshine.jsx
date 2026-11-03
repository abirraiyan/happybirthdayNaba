import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Timer, Star, RotateCcw, ArrowLeft, Sparkles } from 'lucide-react';
import { fireStarBurst } from '../components/Confetti';
import SunshineAvatar from '../components/SunshineAvatar';

export default function CatchSunshine({ onComplete, onBack, sound, isAlreadyCompleted }) {
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'won' | 'lost'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [fallingItems, setFallingItems] = useState([]);
  const [combo, setCombo] = useState(0);

  const containerRef = useRef(null);
  const nextIdRef = useRef(0);
  const timerRef = useRef(null);
  const spawnRef = useRef(null);

  const TARGET_STARS = 15;
  const GAME_DURATION = 25;

  // Sound effect hooks
  const { playStarCatch, playMissionComplete, playWrong } = sound;

  // Start the game
  const startGame = useCallback(() => {
    setScore(0);
    setCombo(0);
    setTimeLeft(GAME_DURATION);
    setFallingItems([]);
    setGameState('playing');
  }, []);

  // Handle catching an item
  const handleCatch = useCallback((id, emoji, isBonus, event) => {
    if (gameState !== 'playing') return;

    // Trigger sound
    playStarCatch();

    // Trigger visual confetti at click location if available
    if (event) {
      try {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        fireStarBurst(x, y);
      } catch (err) {}
    }

    setScore(prev => {
      const newScore = prev + (isBonus ? 2 : 1);
      if (newScore >= TARGET_STARS) {
        setTimeout(() => {
          setGameState('won');
          playMissionComplete();
          onComplete(1);
        }, 200);
      }
      return newScore;
    });

    setCombo(prev => prev + 1);

    // Remove the caught item
    setFallingItems(prev => prev.filter(item => item.id !== id));
  }, [gameState, playStarCatch, playMissionComplete, onComplete]);

  // Main countdown loop
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Check loss condition when time runs out
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      if (score >= TARGET_STARS) {
        setGameState('won');
        playMissionComplete();
        onComplete(1);
      } else {
        setGameState('lost');
        playWrong();
      }
    }
  }, [timeLeft, score, gameState, playMissionComplete, playWrong, onComplete]);

  // Item spawner loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    spawnRef.current = setInterval(() => {
      const itemsList = [
        { emoji: '☀️', isBonus: true, speed: 4.8 },
        { emoji: '⭐', isBonus: false, speed: 5.2 },
        { emoji: '✨', isBonus: false, speed: 5.0 },
        { emoji: '🌸', isBonus: false, speed: 5.4 },
        { emoji: '💜', isBonus: true, speed: 4.6 },
      ];
      const randomItem = itemsList[Math.floor(Math.random() * itemsList.length)];
      const randomLeft = Math.floor(Math.random() * 80) + 10; // between 10% and 90%

      const newItem = {
        id: nextIdRef.current++,
        emoji: randomItem.emoji,
        isBonus: randomItem.isBonus,
        speed: randomItem.speed,
        left: randomLeft,
      };

      setFallingItems(prev => [...prev.slice(-12), newItem]);
    }, 600);

    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [gameState]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center">
      {/* Top Navigation & Status */}
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
            <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-dreamyPurple'}`} />
            <span className={timeLeft <= 5 ? 'text-red-600' : 'text-hobiText'}>
              {timeLeft}s
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sunshine to-warmOrange border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold shadow-playful">
            <Star className="w-4 h-4 fill-[#35234F]" />
            <span>{score} / {TARGET_STARS} Stars</span>
          </div>
        </div>
      </div>

      {/* Main Play Arena */}
      <div
        ref={containerRef}
        className="relative w-full h-[480px] md:h-[540px] card-playful overflow-hidden bg-gradient-to-b from-[#9EDFFF]/40 via-[#FFF9EC] to-[#FFD84D]/30 select-none"
      >
        {/* Floating Clouds Background */}
        <div className="absolute top-6 left-6 text-4xl opacity-50 animate-float">☁️</div>
        <div className="absolute top-12 right-12 text-5xl opacity-40 animate-floatSlow">☁️</div>
        <div className="absolute top-36 left-1/3 text-3xl opacity-30 animate-float">☁️</div>

        {/* READY STATE OVERLAY */}
        {gameState === 'ready' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-white/85 backdrop-blur-sm">
            <SunshineAvatar size="large" isExcited={true} />
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText mt-4">
              Catch the Sunshine! ☀️
            </h2>
            <p className="text-xs md:text-sm text-hobiText-muted max-w-md mt-2">
              Sunshine stars, flowers, and purple hearts are raining down! Tap or click on the falling items to catch them before they hit the ground. Collect 15 stars in 25 seconds!
            </p>

            <button
              onClick={startGame}
              className="btn-playful mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-base md:text-lg border-2 border-[#35234F] shadow-playful"
            >
              Start Catching! 🌟
            </button>
          </div>
        )}

        {/* WON STATE OVERLAY */}
        {gameState === 'won' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-white/95 backdrop-blur-md"
          >
            <div className="text-5xl md:text-6xl animate-bounce mb-2">🎉☀️🌟</div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText">
              SUNSHINE MISSION CLEARED!
            </h2>
            <p className="text-sm text-hobiText-muted max-w-sm mt-2">
              Naba, you're super fast! You gathered <span className="font-bold text-warmOrange">{score} stars</span> and ignited the Warmth facet of the Sunshine Crystal!
            </p>

            <div className="my-4 px-4 py-2 rounded-xl bg-amber-100 border-2 border-sunshine flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-heading font-bold text-sm text-[#35234F]">
                {isAlreadyCompleted ? 'Mission Already Completed (+0 Stars)' : '+15 Sunshine Stars Earned!'}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={startGame}
                className="btn-playful px-5 py-2.5 rounded-xl bg-white border-2 border-[#35234F] font-heading font-bold text-xs md:text-sm flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
              <button
                onClick={onBack}
                className="btn-playful px-6 py-2.5 rounded-xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-xs md:text-sm border-2 border-[#35234F]"
              >
                Continue Adventure 🚀
              </button>
            </div>
          </motion.div>
        )}

        {/* LOST / RETRY STATE OVERLAY */}
        {gameState === 'lost' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-white/95 backdrop-blur-md"
          >
            <div className="text-5xl mb-2">🥺⏰</div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-hobiText">
              Time Ran Out!
            </h2>
            <p className="text-sm text-hobiText-muted max-w-sm mt-2">
              You caught {score} out of 15 stars. Don't worry Naba, Hobi says: "Never give up!" Let's try once more!
            </p>

            <button
              onClick={startGame}
              className="btn-playful mt-6 px-7 py-3 rounded-xl bg-gradient-to-r from-sunshine to-warmOrange text-[#35234F] font-heading font-bold text-sm md:text-base border-2 border-[#35234F]"
            >
              Try Again ☀️
            </button>
          </motion.div>
        )}

        {/* FALLING OBJECTS DURING PLAY */}
        {gameState === 'playing' && (
          <div className="relative w-full h-full">
            {fallingItems.map((item) => (
              <motion.button
                key={item.id}
                initial={{ y: -60, opacity: 1 }}
                animate={{ y: 560, opacity: [1, 1, 0.8] }}
                transition={{ duration: item.speed, ease: 'linear' }}
                onAnimationComplete={() => {
                  setFallingItems(prev => prev.filter(i => i.id !== item.id));
                }}
                onClick={(e) => handleCatch(item.id, item.emoji, item.isBonus, e)}
                onTouchStart={(e) => handleCatch(item.id, item.emoji, item.isBonus, e)}
                style={{ left: `${item.left}%` }}
                className="absolute z-10 w-16 h-16 -ml-8 flex items-center justify-center text-4xl filter drop-shadow-md hover:scale-125 active:scale-95 transition-transform cursor-pointer focus:outline-none"
              >
                <span>{item.emoji}</span>
                {item.isBonus && (
                  <span className="absolute top-1 right-1 text-[10px] font-bold bg-pink-500 text-white rounded-full px-1 shadow-sm">
                    +2
                  </span>
                )}
              </motion.button>
            ))}

            {/* Bottom Catcher Sunshine Buddy */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
              <SunshineAvatar size="small" isDancing={true} />
              <span className="text-[10px] font-bold bg-[#35234F] text-white px-3 py-1 rounded-full mt-1 shadow-sm">
                Tap the falling stars & sunshine!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
