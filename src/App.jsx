import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './pages/Dashboard';
import BirthdayFinale from './pages/BirthdayFinale';
import CatchSunshine from './games/CatchSunshine';
import MemoryMatch from './games/MemoryMatch';
import HobiQuiz from './games/HobiQuiz';
import DanceChallenge from './games/DanceChallenge';
import SecretGift from './games/SecretGift';
import { AchievementToast } from './components/AchievementBadge';
import { useGameProgress } from './hooks/useGameProgress';
import { useSound } from './hooks/useSound';

export default function App() {
  const {
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
    isAllCompleted,
    newAchievement,
    clearAchievementToast,
  } = useGameProgress();

  const sound = useSound();
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' | 'game' | 'finale'
  const [activeMission, setActiveMission] = useState(null);

  // Handle selecting a mission from dashboard
  const handleSelectMission = (mission) => {
    sound.playPop();
    setActiveMission(mission);
    setCurrentScreen('game');
  };

  // Return to dashboard
  const handleBackToDashboard = () => {
    sound.playPop();
    setActiveMission(null);
    setCurrentScreen('dashboard');
  };

  // Handle mission completion
  const handleMissionComplete = (missionId, scoreDetail = null) => {
    completeMission(missionId, scoreDetail);
  };

  // Open Finale
  const handleOpenFinale = () => {
    sound.playPop();
    setCurrentScreen('finale');
  };

  // If user hasn't pressed "LET'S GO", show WelcomeScreen
  if (!progress.hasStarted) {
    return (
      <div className="min-h-screen bg-[#FFF9EC] text-[#35234F] flex flex-col justify-center">
        <WelcomeScreen
          onStart={() => {
            startAdventure();
            setCurrentScreen('dashboard');
          }}
          sound={sound}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9EC] text-[#35234F] flex flex-col">
      {/* Top Universal Navbar */}
      <Navbar
        stars={progress.stars}
        onGoHome={handleBackToDashboard}
        onResetProgress={() => {
          resetProgress();
          setCurrentScreen('dashboard');
          setActiveMission(null);
        }}
        isMuted={sound.isMuted}
        toggleMute={sound.toggleMute}
        musicActive={sound.musicActive}
        toggleMusic={sound.toggleMusic}
        isAllCompleted={isAllCompleted}
        onOpenFinale={handleOpenFinale}
        currentScreen={currentScreen}
      />

      {/* Achievement Toast Alert */}
      <AchievementToast
        achievement={newAchievement}
        onClose={clearAchievementToast}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-12">
        {currentScreen === 'dashboard' && (
          <Dashboard
            progress={progress}
            onSelectMission={handleSelectMission}
            onOpenFinale={handleOpenFinale}
            onInteractPet={interactWithPet}
            onUnlockCollectible={unlockCollectible}
            onRevealFortune={incrementFortuneCount}
            onBlowCandle={blowCandle}
            onBlowAllCandles={blowAllCandles}
            onRelightCandles={relightCandles}
            sound={sound}
          />
        )}

        {currentScreen === 'finale' && (
          <BirthdayFinale
            progress={progress}
            onBackToDashboard={handleBackToDashboard}
            sound={sound}
            onBlowCandle={blowCandle}
            onBlowAllCandles={blowAllCandles}
            onRelightCandles={relightCandles}
          />
        )}

        {currentScreen === 'game' && activeMission && (
          <div className="py-4">
            {activeMission.id === 1 && (
              <CatchSunshine
                onComplete={handleMissionComplete}
                onBack={handleBackToDashboard}
                sound={sound}
                isAlreadyCompleted={progress.completedMissions.includes(1)}
              />
            )}

            {activeMission.id === 2 && (
              <MemoryMatch
                onComplete={handleMissionComplete}
                onBack={handleBackToDashboard}
                sound={sound}
                isAlreadyCompleted={progress.completedMissions.includes(2)}
              />
            )}

            {activeMission.id === 3 && (
              <HobiQuiz
                onComplete={handleMissionComplete}
                onBack={handleBackToDashboard}
                sound={sound}
                isAlreadyCompleted={progress.completedMissions.includes(3)}
              />
            )}

            {activeMission.id === 4 && (
              <DanceChallenge
                onComplete={handleMissionComplete}
                onBack={handleBackToDashboard}
                sound={sound}
                isAlreadyCompleted={progress.completedMissions.includes(4)}
              />
            )}

            {activeMission.id === 5 && (
              <SecretGift
                onComplete={handleMissionComplete}
                onBack={handleBackToDashboard}
                sound={sound}
                openedGifts={progress.openedGifts}
                onOpenBox={openGiftBox}
                isAlreadyCompleted={progress.completedMissions.includes(5)}
                onGoToFinale={handleOpenFinale}
              />
            )}
          </div>
        )}
      </main>

      {/* Playful Footer */}
      <footer className="w-full py-4 px-6 text-center border-t-2 border-[#35234F]/10 bg-white/50 text-xs text-hobiText-muted">
        <p className="font-heading font-bold text-hobiText">
          HOBI WORLD ☀️ • A LITTLE UNIVERSE FULL OF SUNSHINE
        </p>
        <p className="text-[11px] mt-0.5">
          Created with lots of love by her Big Bondhu for Naba's Special Birthday! 💜
        </p>
      </footer>
    </div>
  );
}
