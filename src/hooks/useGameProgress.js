import { useState, useEffect, useCallback } from 'react';
import { MISSIONS } from '../data/missions';
import { ACHIEVEMENTS } from '../data/achievements';

const STORAGE_KEY = 'naba_hobi_world_progress_v2';

const defaultState = {
  hasStarted: false,
  stars: 0,
  completedMissions: [], // [1, 2, 3, etc]
  openedGifts: [], // [1, 2, 3]
  unlockedAchievements: [],
  quizBestScore: 0,
  highDanceCombo: 0,
  lastCompletedDate: null,
  
  // New Interactive Features State
  petHappiness: 80,
  petLastInteracted: Date.now(),
  unlockedCollectibles: ['c5'], // Initial sparkling purple heart
  fortunesRevealed: 0,
  candlesBlown: 0, // 0 to 12 candles blown out
  blownCandleIndices: [], // [0, 1, 2, ... 11]
};

export function useGameProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
      // Migrate from v1 if present
      const v1 = localStorage.getItem('naba_hobi_world_progress_v1');
      if (v1) {
        return { ...defaultState, ...JSON.parse(v1) };
      }
    } catch (e) {
      console.warn("Error reading localStorage:", e);
    }
    return defaultState;
  });

  const [newAchievement, setNewAchievement] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn("Error writing to localStorage:", e);
    }
  }, [progress]);

  // Check achievements whenever progress changes
  useEffect(() => {
    ACHIEVEMENTS.forEach(ach => {
      if (!progress.unlockedAchievements.includes(ach.id)) {
        if (ach.condition(progress)) {
          // Unlock achievement
          setProgress(prev => ({
            ...prev,
            unlockedAchievements: [...prev.unlockedAchievements, ach.id]
          }));
          setNewAchievement(ach);
        }
      }
    });
  }, [progress.completedMissions, progress.stars, progress.openedGifts, progress.candlesBlown, progress.unlockedCollectibles]);

  // Start the journey from welcome screen
  const startAdventure = useCallback(() => {
    setProgress(prev => ({ ...prev, hasStarted: true }));
  }, []);

  // Complete a mission and award stars (only if first time)
  const completeMission = useCallback((missionId, scoreDetail = null) => {
    const mission = MISSIONS.find(m => m.id === missionId);
    if (!mission) return { awardedStars: 0, firstTime: false };

    let awarded = 0;
    let isFirstTime = false;

    setProgress(prev => {
      const alreadyCompleted = prev.completedMissions.includes(missionId);
      if (!alreadyCompleted) {
        awarded = mission.starsReward;
        isFirstTime = true;
        return {
          ...prev,
          stars: prev.stars + awarded,
          completedMissions: [...prev.completedMissions, missionId],
          lastCompletedDate: new Date().toISOString(),
          ...(scoreDetail || {})
        };
      } else {
        return {
          ...prev,
          ...(scoreDetail || {})
        };
      }
    });

    return { awardedStars: awarded, firstTime: isFirstTime };
  }, []);

  // Open a gift box in Mission 5
  const openGiftBox = useCallback((boxId) => {
    setProgress(prev => {
      if (!prev.openedGifts.includes(boxId)) {
        return {
          ...prev,
          openedGifts: [...prev.openedGifts, boxId]
        };
      }
      return prev;
    });
  }, []);

  // Pet Care: Feed or Play
  const interactWithPet = useCallback((actionType) => {
    setProgress(prev => {
      const gain = actionType === 'feed' ? 12 : actionType === 'play' ? 15 : 8;
      const nextHappiness = Math.min(100, Math.max(10, prev.petHappiness + gain));
      return {
        ...prev,
        petHappiness: nextHappiness,
        petLastInteracted: Date.now()
      };
    });
  }, []);

  // Mystery Gift Machine: Pull a collectible
  const unlockCollectible = useCallback((collectibleId) => {
    setProgress(prev => {
      if (!prev.unlockedCollectibles.includes(collectibleId)) {
        return {
          ...prev,
          unlockedCollectibles: [...prev.unlockedCollectibles, collectibleId]
        };
      }
      return prev;
    });
  }, []);

  // Daily Happiness Fortune reveal count
  const incrementFortuneCount = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      fortunesRevealed: (prev.fortunesRevealed || 0) + 1
    }));
  }, []);

  // 12 Candles Challenge Handlers
  const blowCandle = useCallback((candleIndex) => {
    setProgress(prev => {
      const currentIndices = prev.blownCandleIndices || [];
      if (!currentIndices.includes(candleIndex)) {
        const nextIndices = [...currentIndices, candleIndex];
        return {
          ...prev,
          blownCandleIndices: nextIndices,
          candlesBlown: nextIndices.length
        };
      }
      return prev;
    });
  }, []);

  const blowAllCandles = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      blownCandleIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      candlesBlown: 12
    }));
  }, []);

  const relightCandles = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      blownCandleIndices: [],
      candlesBlown: 0
    }));
  }, []);

  // Reset entire adventure progress
  const resetProgress = useCallback(() => {
    setProgress(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('naba_hobi_world_progress_v1');
    } catch (e) {}
  }, []);

  const totalMissions = MISSIONS.length;
  const completedCount = progress.completedMissions.length;
  const progressPercent = Math.round((completedCount / totalMissions) * 100);
  const isAllCompleted = completedCount >= totalMissions;

  return {
    progress,
    startAdventure,
    completeMission,
    openGiftBox,
    interactWithPet,
    unlockCollectible,
    incrementFortuneCount,
    blowCandle,
    blowAllCandles,
    relightCandles,
    resetProgress,
    totalMissions,
    completedCount,
    progressPercent,
    isAllCompleted,
    newAchievement,
    clearAchievementToast: () => setNewAchievement(null),
  };
}
