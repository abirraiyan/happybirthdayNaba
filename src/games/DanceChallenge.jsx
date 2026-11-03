import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight, RotateCcw, Star, Music2, Sparkles, Flame, Play } from 'lucide-react';
import { fireCelebrationConfetti } from '../components/Confetti';
import HobiCharacter from '../components/HobiCharacter';

const ARROWS = [
  { key: 'ArrowLeft', wasd: 'a', dir: 'left', icon: ArrowLeft, label: 'LEFT', color: 'from-amber-400 to-yellow-500' },
  { key: 'ArrowUp', wasd: 'w', dir: 'up', icon: ArrowUp, label: 'UP', color: 'from-pink-400 to-rose-500' },
  { key: 'ArrowDown', wasd: 's', dir: 'down', icon: ArrowDown, label: 'DOWN', color: 'from-sky-400 to-blue-500' },
  { key: 'ArrowRight', wasd: 'd', dir: 'right', icon: ArrowRight, label: 'RIGHT', color: 'from-purple-400 to-indigo-500' },
];

const TOTAL_STAGES = 8;
const POSE_DURATION_MS = 500; // 400-700ms visibility window

export default function DanceChallenge({ onComplete, onBack, sound, isAlreadyCompleted }) {
  const [stage, setStage] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'won'
  const [lastInputFeedback, setLastInputFeedback] = useState(null); // 'perfect' | 'miss'
  const [characterState, setCharacterState] = useState('idle'); // 'idle' | 'up' | 'down' | 'left' | 'right' | 'success' | 'miss'
  const [showGlow, setShowGlow] = useState(false);

  const characterTimerRef = useRef(null);
  const glowTimerRef = useRef(null);
  const { playDanceBeat, playMissionComplete } = sound;

  // Immediate character animation trigger with seamless return to idle
  const triggerCharacterMovement = useCallback((stateName, duration = POSE_DURATION_MS) => {
    if (characterTimerRef.current) {
      clearTimeout(characterTimerRef.current);
    }
    setCharacterState(stateName);

    characterTimerRef.current = setTimeout(() => {
      setCharacterState('idle');
    }, duration);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (characterTimerRef.current) clearTimeout(characterTimerRef.current);
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
    };
  }, []);

  // Generate sequence for current stage
  const generateSequenceForStage = useCallback((stageNum) => {
    const length = Math.min(4 + stageNum, 8); // starts at 5 arrows, climbs to 8
    const dirs = ['left', 'up', 'down', 'right'];
    const newSeq = [];
    for (let i = 0; i < length; i++) {
      newSeq.push(dirs[Math.floor(Math.random() * dirs.length)]);
    }
    return newSeq;
  }, []);

  // Start dance routine
  const startDanceGame = useCallback(() => {
    setStage(1);
    setCombo(0);
    setScore(0);
    setInputIndex(0);
    setCharacterState('idle');
    const seq = generateSequenceForStage(1);
    setSequence(seq);
    setGameState('playing');
  }, [generateSequenceForStage]);

  // Handle arrow input (keyboard or on-screen buttons)
  const handleArrowPress = useCallback((dir) => {
    if (gameState !== 'playing') {
      // In ready state, pressing buttons lets player test dance moves!
      triggerCharacterMovement(dir, POSE_DURATION_MS);
      return;
    }

    const expectedDir = sequence[inputIndex];

    if (dir === expectedDir) {
      // Correct input
      playDanceBeat(true);
      setLastInputFeedback('perfect');
      setScore(s => s + 50 + combo * 10);
      setCombo(c => c + 1);

      // Brief pink/purple glow
      setShowGlow(true);
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
      glowTimerRef.current = setTimeout(() => setShowGlow(false), 350);

      if (inputIndex + 1 >= sequence.length) {
        // Stage completed!
        if (stage >= TOTAL_STAGES) {
          // Completed all 8 routines!
          triggerCharacterMovement('success', 3500);
          setGameState('won');
          playMissionComplete();
          fireCelebrationConfetti();
          onComplete(4);
        } else {
          // Progress to next stage
          triggerCharacterMovement('success', 650);
          setTimeout(() => {
            const nextStage = stage + 1;
            setStage(nextStage);
            setInputIndex(0);
            setSequence(generateSequenceForStage(nextStage));
          }, 380);
        }
      } else {
        // Step forward in current sequence
        triggerCharacterMovement(dir, POSE_DURATION_MS);
        setInputIndex(i => i + 1);
      }
    } else {
      // Missed input: Playful reaction without crashing or freezing
      playDanceBeat(false);
      setLastInputFeedback('miss');
      setCombo(0);
      triggerCharacterMovement('miss', 550);
    }

    setTimeout(() => setLastInputFeedback(null), 350);
  }, [gameState, sequence, inputIndex, combo, stage, generateSequenceForStage, playDanceBeat, playMissionComplete, onComplete, triggerCharacterMovement]);

  // Keyboard controls listener (Arrow keys + WASD)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      if (['arrowup', 'w'].includes(key)) {
        e.preventDefault();
        handleArrowPress('up');
      } else if (['arrowdown', 's'].includes(key)) {
        e.preventDefault();
        handleArrowPress('down');
      } else if (['arrowleft', 'a'].includes(key)) {
        e.preventDefault();
        handleArrowPress('left');
      } else if (['arrowright', 'd'].includes(key)) {
        e.preventDefault();
        handleArrowPress('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleArrowPress]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center">
      {/* Top Header Controls & Stats */}
      <div className="w-full flex items-center justify-between mb-3">
        <button
          onClick={onBack}
          className="btn-playful flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Mission</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 border-2 border-pink-300 text-xs md:text-sm font-heading font-bold">
            <Music2 className="w-4 h-4" />
            <span>Round: {stage} / {TOTAL_STAGES}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 border-2 border-[#35234F] text-xs md:text-sm font-heading font-bold shadow-playful">
            <Flame className={`w-4 h-4 ${combo > 3 ? 'text-rose-600 animate-bounce' : 'text-rose-400'}`} />
            <span>Combo: {combo}x</span>
          </div>
        </div>
      </div>

      {/* Main Dance Floor Arena (Prominent White Dance Floor) */}
      <div className="w-full card-playful p-4 md:p-6 bg-white border-3 border-[#35234F] relative text-center overflow-hidden flex flex-col items-center justify-between min-h-[580px] md:min-h-[620px] shadow-2xl">
        {/* Subtle Dance Stage Lights & Pattern Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#A879D8 1.2px, transparent 1.2px), radial-gradient(#FFD84D 1.2px, #FFFFFF 1.2px)',
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0, 14px 14px'
          }}
        />

        {/* ============================================================== */}
        {/* 1. UPPER SECTION: DIRECTION SEQUENCE */}
        {/* ============================================================== */}
        <div className="w-full relative z-20 pt-1">
          {gameState === 'playing' ? (
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-pink-700 bg-pink-100 px-3 py-0.5 rounded-full border border-pink-300 shadow-sm">
                  Stage {stage} Routine
                </span>
                <span className="text-[11px] font-bold text-hobiText-muted">
                  Follow the rhythm sequence!
                </span>
              </div>

              {/* Sequence Arrow Cards */}
              <div className="flex items-center justify-center gap-2 md:gap-3 min-h-[56px] flex-wrap">
                {sequence.map((dir, idx) => {
                  const isPassed = idx < inputIndex;
                  const isCurrent = idx === inputIndex;
                  const arrowObj = ARROWS.find(a => a.dir === dir);
                  const IconComponent = arrowObj.icon;

                  return (
                    <motion.div
                      key={idx}
                      animate={isCurrent ? { scale: [1, 1.15, 1], y: [0, -3, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 0.55 }}
                      className={`w-11 h-11 md:w-13 md:h-13 rounded-2xl border-2 flex items-center justify-center text-lg transition-all ${
                        isPassed
                          ? 'bg-emerald-400 text-white border-emerald-600 scale-90 opacity-80'
                          : isCurrent
                          ? `bg-gradient-to-tr ${arrowObj.color} text-white border-[#35234F] ring-3 ring-pink-300 shadow-playful`
                          : 'bg-cream border-gray-300 text-gray-400'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 stroke-[3]" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Instant Feedback Text */}
              <div className="h-5 flex items-center justify-center mt-1">
                {lastInputFeedback === 'perfect' && (
                  <span className="text-xs font-heading font-bold text-emerald-600 animate-ping">
                    PERFECT STEP! ✨
                  </span>
                )}
                {lastInputFeedback === 'miss' && (
                  <span className="text-xs font-heading font-bold text-rose-500">
                    Keep The Beat! 🎵
                  </span>
                )}
              </div>
            </div>
          ) : gameState === 'ready' ? (
            <div className="py-1">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-hobiText">
                Dance With Hobi! 💃🕺
              </h2>
              <p className="text-xs md:text-sm text-hobiText-muted max-w-md mx-auto mt-0.5">
                Naba, press the arrow keys or tap the dance pads below to groove with J-Hope on stage!
              </p>
            </div>
          ) : (
            <div className="py-1">
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Performance Complete! 🌟
              </span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 2. CENTRE SECTION: ANIMATED J-HOPE CHARACTER */}
        {/* ============================================================== */}
        <div className="w-full flex-1 flex flex-col items-center justify-center relative z-10 py-1">
          {/* Spotlight circle on the dance floor */}
          <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-yellow-200/40 via-pink-200/30 to-purple-200/40 blur-2xl pointer-events-none" />

          {/* Full-Body J-Hope Character Component */}
          <HobiCharacter
            state={gameState === 'won' ? 'success' : characterState}
            combo={combo}
            showGlow={showGlow}
          />
        </div>

        {/* ============================================================== */}
        {/* 3. LOWER SECTION: DIRECTIONAL CONTROLS OR VICTORY SCREEN */}
        {/* ============================================================== */}
        <div className="w-full relative z-20 pb-1">
          {gameState === 'ready' && (
            <div className="flex flex-col items-center">
              <button
                onClick={startDanceGame}
                className="btn-playful px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-amber-400 text-white font-heading font-bold text-base md:text-lg border-2 border-[#35234F] shadow-playful flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Step Onto Dance Floor! 🎶</span>
              </button>
              <p className="text-[11px] text-hobiText-muted mt-2">
                Use Arrow Keys / WASD or tap buttons during the routine
              </p>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="w-full">
              {/* Responsive Touch Dance Pads */}
              <div className="max-w-xs mx-auto grid grid-cols-3 gap-2 px-2">
                <div />
                <button
                  onClick={() => handleArrowPress('up')}
                  className="btn-playful h-13 sm:h-14 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white border-2 border-[#35234F] flex flex-col items-center justify-center font-heading font-bold text-xs shadow-playful active:scale-95"
                >
                  <ArrowUp className="w-6 h-6 stroke-[3]" />
                  <span className="text-[9px]">UP (W)</span>
                </button>
                <div />

                <button
                  onClick={() => handleArrowPress('left')}
                  className="btn-playful h-13 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-white border-2 border-[#35234F] flex flex-col items-center justify-center font-heading font-bold text-xs shadow-playful active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6 stroke-[3]" />
                  <span className="text-[9px]">LEFT (A)</span>
                </button>

                <button
                  onClick={() => handleArrowPress('down')}
                  className="btn-playful h-13 sm:h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white border-2 border-[#35234F] flex flex-col items-center justify-center font-heading font-bold text-xs shadow-playful active:scale-95"
                >
                  <ArrowDown className="w-6 h-6 stroke-[3]" />
                  <span className="text-[9px]">DOWN (S)</span>
                </button>

                <button
                  onClick={() => handleArrowPress('right')}
                  className="btn-playful h-13 sm:h-14 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-500 text-white border-2 border-[#35234F] flex flex-col items-center justify-center font-heading font-bold text-xs shadow-playful active:scale-95"
                >
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                  <span className="text-[9px]">RIGHT (D)</span>
                </button>
              </div>
            </div>
          )}

          {gameState === 'won' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold text-hobiText">
                MAIN DANCER NABA! 🕺💜
              </h3>
              <p className="text-xs md:text-sm text-hobiText-muted max-w-sm mt-1">
                Hoseok loved your rhythm! All 8 dance routines completed!
              </p>

              <div className="my-3 px-4 py-1.5 rounded-xl bg-pink-100 border-2 border-pink-300 flex items-center gap-2">
                <Star className="w-4 h-4 text-pink-600 fill-pink-600" />
                <span className="font-heading font-bold text-xs sm:text-sm text-[#35234F]">
                  {isAlreadyCompleted ? 'Mission Completed (+0 Stars)' : '+20 Sunshine Stars Claimed!'}
                </span>
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  onClick={startDanceGame}
                  className="btn-playful px-4 py-2 rounded-xl bg-white border-2 border-[#35234F] font-heading font-bold text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Dance Again</span>
                </button>
                <button
                  onClick={onBack}
                  className="btn-playful px-5 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-heading font-bold text-xs border-2 border-[#35234F]"
                >
                  Back to Dashboard 🚀
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
