
import { useState } from 'react';
import Home from './pages/Home';
import LevelMap from './pages/LevelMap';
import GameArena from './pages/GameArena';
import GameResult from './pages/GameResult';
import Leaderboard from './pages/Leaderboard';
import { Level, GameState, ScoreEntry } from './types';
import { levels as initialLevels } from './data/levels';

function App() {
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [gameState, setGameState] = useState<GameState & { lastSuccess?: boolean }>({
    currentLevel: null,
    score: 0,
    status: 'home',
    lives: 3,
    totalStars: 0,
    lastSuccess: false
  });

  const saveScore = (score: number, levelName: string) => {
    const newEntry: ScoreEntry = {
      name: "قهرمان کوچک",
      score,
      levelName,
      date: new Date().toLocaleDateString('fa-IR')
    };
    
    const existing = localStorage.getItem('math_quest_scores');
    const scores = existing ? JSON.parse(existing) : [];
    scores.push(newEntry);
    localStorage.setItem('math_quest_scores', JSON.stringify(scores));
  };

  const handleStart = () => {
    setGameState(prev => ({ ...prev, status: 'map' }));
  };

  const handleShowLeaderboard = () => {
    setGameState(prev => ({ ...prev, status: 'leaderboard' }));
  };

  const handleSelectLevel = (level: Level) => {
    setGameState(prev => ({ 
      ...prev, 
      currentLevel: level, 
      status: 'playing',
      score: 0,
      lives: 3
    }));
  };

  const handleFinishGame = (finalScore: number, success: boolean) => {
    if (success && gameState.currentLevel) {
      saveScore(finalScore, gameState.currentLevel.title);
      // Unlock next level
      const currentIndex = levels.findIndex(l => l.id === gameState.currentLevel?.id);
      if (currentIndex !== -1 && currentIndex < levels.length - 1) {
        const newLevels = [...levels];
        newLevels[currentIndex + 1].unlocked = true;
        setLevels(newLevels);
      }
    }

    setGameState(prev => ({ 
      ...prev, 
      status: 'result',
      score: finalScore,
      lastSuccess: success,
      totalStars: prev.totalStars + (success ? 3 : 0) 
    }));
  };

  const handleNextLevel = () => {
    const currentIndex = levels.findIndex(l => l.id === gameState.currentLevel?.id);
    if (currentIndex !== -1 && currentIndex < levels.length - 1) {
      handleSelectLevel(levels[currentIndex + 1]);
    } else {
      setGameState(prev => ({ ...prev, status: 'map' }));
    }
  };

  const handleBackToMap = () => {
    setGameState(prev => ({ ...prev, status: 'map' }));
  };

  return (
    <div className="min-h-screen font-sans" dir="rtl">
      {gameState.status === 'home' && <Home onStart={handleStart} onShowLeaderboard={handleShowLeaderboard} />}
      
      {gameState.status === 'leaderboard' && (
        <Leaderboard onBack={() => setGameState(prev => ({ ...prev, status: 'home' }))} />
      )}

      {gameState.status === 'map' && (
        <LevelMap 
          levels={levels}
          onSelectLevel={handleSelectLevel} 
          onBack={() => setGameState(prev => ({ ...prev, status: 'home' }))} 
        />
      )}

      {gameState.status === 'playing' && gameState.currentLevel && (
        <GameArena 
          level={gameState.currentLevel} 
          onFinish={handleFinishGame} 
        />
      )}

      {gameState.status === 'result' && gameState.currentLevel && (
        <GameResult 
          success={!!gameState.lastSuccess}
          score={gameState.score}
          targetScore={gameState.currentLevel.targetScore}
          onRetry={() => handleSelectLevel(gameState.currentLevel!)}
          onBackToMap={handleBackToMap}
          onNextLevel={handleNextLevel}
          hasMoreLevels={levels.findIndex(l => l.id === gameState.currentLevel?.id) < levels.length - 1}
          nextChallengePreview={gameState.currentLevel.nextChallengePreview}
        />
      )}
    </div>
  );
}

export default App;
