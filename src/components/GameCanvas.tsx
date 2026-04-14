import React, { useRef, useEffect } from 'react';
import type { Point } from '../types';
import { GRID_SIZE } from '../constants';
import type { LevelParams } from '../constants';

interface GameCanvasProps {
  snake: Point[];
  food: Point;
  levelData: LevelParams;
  onMovementTick: () => void;
  isPaused: boolean;
  isGameOver: boolean;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ 
  snake, 
  food, 
  levelData, 
  onMovementTick,
  isPaused,
  isGameOver
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep refs for game state to avoid restarting the animation loop
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const levelDataRef = useRef(levelData);
  const isPausedRef = useRef(isPaused);
  const isGameOverRef = useRef(isGameOver);
  const onMovementTickRef = useRef(onMovementTick);

  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { foodRef.current = food; }, [food]);
  useEffect(() => { levelDataRef.current = levelData; }, [levelData]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { isGameOverRef.current = isGameOver; }, [isGameOver]);
  useEffect(() => { onMovementTickRef.current = onMovementTick; }, [onMovementTick]);

  useEffect(() => {
    let animationFrameId: number;
    let lastMoveTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      // 1. Logic Tick
      if (!isPausedRef.current && !isGameOverRef.current) {
        if (time - lastMoveTime >= levelDataRef.current.speedMs) {
          onMovementTickRef.current();
          lastMoveTime = time;
        }
      }

      // 2. Render Tick (runs at display refresh rate)
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const cellSize = canvas.width / GRID_SIZE;

      // Clear canvas
      ctx.fillStyle = '#0a0a0a'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }

      const currentFood = foodRef.current;
      const currentLevel = levelDataRef.current;
      const currentSnake = snakeRef.current;

      // Draw Food
      ctx.shadowBlur = 15;
      const fColor = currentLevel.foodType === 'apple' ? '#ff107a' : 
                     currentLevel.foodType === 'banana' ? '#ffd700' : '#39ff14';
      ctx.shadowColor = fColor;
      ctx.fillStyle = fColor;
      
      ctx.beginPath();
      ctx.arc(
        currentFood.x * cellSize + cellSize / 2,
        currentFood.y * cellSize + cellSize / 2,
        cellSize / 2.5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw Snake
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      
      currentSnake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
        } else {
          ctx.fillStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
        }

        ctx.beginPath();
        // A simple rectangle with slightly rounded edges manually
        const r = 4;
        const x = segment.x * cellSize + 2;
        const y = segment.y * cellSize + 2;
        const w = cellSize - 4;
        const h = cellSize - 4;

        if (ctx.roundRect) {
           ctx.roundRect(x, y, w, h, r);
        } else {
           ctx.rect(x,y,w,h);
        }
        ctx.fill();
      });

      ctx.shadowBlur = 0;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={400} 
      style={{
        border: '2px solid var(--neon-blue)',
        boxShadow: '0 0 20px var(--neon-blue)',
        borderRadius: '8px',
        backgroundColor: 'var(--panel-bg)',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
};
