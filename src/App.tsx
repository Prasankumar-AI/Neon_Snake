import React, { useState, useEffect } from 'react';
import { EntryScreen } from './components/EntryScreen';
import { GameCanvas } from './components/GameCanvas';
import { Footer } from './components/Footer';
import { useSnakeLogic } from './hooks/useSnakeLogic';
import './App.css';

// We implement keyboard listener in the App wrapper to easily control logic Hook
export const App: React.FC = () => {
  const [gameState, setGameState] = useState<'entry' | 'playing' | 'transition' | 'gameover'>('entry');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [doorOpen, setDoorOpen] = useState(true);

  // Snake Logic Hook
  const {
    snake,
    food,
    changeDirection,
    score,
    isGameOver,
    isPaused,
    setIsPaused,
    moveSnake,
    levelData,
  } = useSnakeLogic(
    level,
    () => handleLevelComplete(),
    (finalScore) => handleGameOver(finalScore)
  );

  const handleStart = (userName: string, userEmail: string) => {
    setName(userName);
    setEmail(userEmail);
    // Real implementation would init Firebase session here
    setDoorOpen(false); // Close door briefly
    setTimeout(() => {
      setGameState('playing');
      setDoorOpen(true);
    }, 1000);
  };

  const handleLevelComplete = () => {
    if (level === 3) return; // Infinity mode
    setGameState('transition');
    setDoorOpen(false); // Close door

    // In a real app we might update Firebase session here

    setTimeout(() => {
      setLevel((prev) => (prev + 1) as 1 | 2 | 3);
      setGameState('playing');
      setDoorOpen(true); // Open door for new level
    }, 2000);
  };

  const handleGameOver = (finalScore: number) => {
    setGameState('gameover');
    // In a real app we'd dispatch a cloud function to send an email
    console.log(`Game Over! Final Score: ${finalScore}. Email sent to ${email} for ${name}`);
  };

  // Keyboard controls
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          changeDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          changeDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          changeDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          changeDirection({ x: 1, y: 0 });
          break;
        case ' ': // Space to pause
          setIsPaused(!isPaused);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, changeDirection, isPaused, setIsPaused]);

  return (
    <div className="app-container">
      {/* Door Transition overlay */}
      <div className={`door-transition ${doorOpen ? 'open' : 'closed'}`}>
        <div className="door-left"></div>
        <div className="door-right"></div>
      </div>

      <div className="screen" aria-live="polite">
        {gameState === 'entry' && <EntryScreen onStart={handleStart} />}
        
        {gameState === 'playing' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
              <span className="neon-text-pink" style={{ fontSize: '1.5rem' }}>Level {level}</span>
              <span className="neon-text-green" style={{ fontSize: '1.5rem' }}>Score: {score}</span>
            </div>
            
            <GameCanvas
              snake={snake}
              food={food}
              levelData={levelData}
              onMovementTick={moveSnake}
              isPaused={isPaused}
              isGameOver={isGameOver}
            />

            <div style={{ marginTop: '1rem', color: '#666' }}>
              Controls: WASD / Arrows. Space to Pause.
            </div>
          </div>
        )}

        {gameState === 'transition' && (
          <div className="neon-text-blue" style={{ fontSize: '2rem' }}>
            Level Complete! Preparing next level...
          </div>
        )}

        {gameState === 'gameover' && (
          <div style={{ textAlign: 'center' }}>
            <h1 className="neon-text-pink">GAME OVER</h1>
            <h2>Final Score: {score}</h2>
            <p>Score report triggered for {name} ({email})</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '1rem', background: 'var(--neon-green)', color: '#000',
                marginTop: '1rem', borderRadius: '4px', fontWeight: 'bold'
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
