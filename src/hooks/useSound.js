import { useState, useEffect, useRef, useCallback } from 'react';

// Web Audio API Sound Synthesizer & Cheerful Music Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.musicPlaying = false;
    this.musicInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft tone generator
  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // audio context handling
      }
    }, delay * 1000);
  }

  // Button click / Pop sound
  playPop() {
    this.playTone(480, 'triangle', 0.08, 0.12);
  }

  // Star catch sparkle chime
  playStarCatch() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.12, 0.15, idx * 0.04);
    });
  }

  // Card flip whoosh sound
  playCardFlip() {
    this.playTone(320, 'sine', 0.09, 0.08);
  }

  // Card match success chime
  playMatchSuccess() {
    [587.33, 739.99, 880.00].forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.2, 0.15, idx * 0.06);
    });
  }

  // Quiz correct chime
  playCorrect() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.25, 0.12, idx * 0.07);
    });
  }

  // Quiz wrong gentle buzz
  playWrong() {
    [260, 220].forEach((freq, idx) => {
      this.playTone(freq, 'sawtooth', 0.18, 0.08, idx * 0.1);
    });
  }

  // Dance beat hit
  playDanceBeat(isCorrect = true) {
    if (isCorrect) {
      this.playTone(660, 'triangle', 0.12, 0.15);
      this.playTone(880, 'sine', 0.15, 0.1, 0.03);
    } else {
      this.playTone(220, 'square', 0.1, 0.08);
    }
  }

  // Gift unwrap magic burst
  playGiftOpen() {
    [440, 554.37, 659.25, 880, 1108.73].forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.3, 0.14, idx * 0.06);
    });
  }

  // Mission Complete Fanfare
  playMissionComplete() {
    const melody = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.12 },
      { f: 659.25, d: 0.15, t: 0.24 },
      { f: 783.99, d: 0.2,  t: 0.36 },
      { f: 659.25, d: 0.15, t: 0.52 },
      { f: 1046.50, d: 0.5, t: 0.68 },
    ];
    melody.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, 0.16, n.t);
    });
  }

  // Grand Birthday Celebration Fanfare
  playCelebration() {
    // Joyful birthday trumpet arpeggios
    const notes = [
      { f: 392.00, d: 0.2, t: 0 },
      { f: 392.00, d: 0.2, t: 0.2 },
      { f: 440.00, d: 0.35, t: 0.4 },
      { f: 392.00, d: 0.35, t: 0.75 },
      { f: 523.25, d: 0.4, t: 1.1 },
      { f: 493.88, d: 0.7, t: 1.5 },
      
      { f: 523.25, d: 0.2, t: 2.2 },
      { f: 659.25, d: 0.25, t: 2.45 },
      { f: 783.99, d: 0.35, t: 2.7 },
      { f: 1046.50, d: 0.8, t: 3.1 },
    ];
    notes.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, 0.18, n.t);
      this.playTone(n.f * 1.002, 'sine', n.d, 0.1, n.t); // chorus richness
    });
  }

  // Cheerful background sunshine tune (original playful loop)
  startBgm() {
    if (this.musicPlaying) return;
    this.init();
    this.musicPlaying = true;

    // Upbeat happy progression: C - Am - F - G
    const loopNotes = [
      523.25, 659.25, 783.99, 659.25,
      440.00, 523.25, 659.25, 523.25,
      349.23, 440.00, 523.25, 440.00,
      392.00, 493.88, 587.33, 493.88,
    ];
    let noteIdx = 0;

    this.musicInterval = setInterval(() => {
      if (!this.musicPlaying || this.isMuted) return;
      const freq = loopNotes[noteIdx % loopNotes.length];
      this.playTone(freq, 'sine', 0.25, 0.035, 0);
      noteIdx++;
    }, 280);
  }

  stopBgm() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMusic() {
    if (this.musicPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (muted && this.musicPlaying) {
      this.stopBgm();
    }
  }
}

const soundEngineInstance = new SoundEngine();

export function useSound() {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('hobi_world_muted') === 'true';
  });
  const [musicActive, setMusicActive] = useState(false);

  useEffect(() => {
    soundEngineInstance.setMute(isMuted);
    localStorage.setItem('hobi_world_muted', isMuted);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const toggleMusic = useCallback(() => {
    const isPlaying = soundEngineInstance.toggleMusic();
    setMusicActive(isPlaying);
    return isPlaying;
  }, []);

  return {
    isMuted,
    toggleMute,
    musicActive,
    toggleMusic,
    playPop: () => soundEngineInstance.playPop(),
    playStarCatch: () => soundEngineInstance.playStarCatch(),
    playCardFlip: () => soundEngineInstance.playCardFlip(),
    playMatchSuccess: () => soundEngineInstance.playMatchSuccess(),
    playCorrect: () => soundEngineInstance.playCorrect(),
    playWrong: () => soundEngineInstance.playWrong(),
    playDanceBeat: (correct) => soundEngineInstance.playDanceBeat(correct),
    playGiftOpen: () => soundEngineInstance.playGiftOpen(),
    playMissionComplete: () => soundEngineInstance.playMissionComplete(),
    playCelebration: () => soundEngineInstance.playCelebration(),
  };
}
