import { useState, useCallback, useRef, useEffect } from 'react';
import type { Point, Direction } from '../types';
import { LEVELS, GRID_SIZE } from '../constants';

export function generateFood(snake: Point[]): Point {
  let newFood: Point = { x: 0, y: 0 };
  let isOccupied = true;
  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    isOccupied = snake.some((s) => s.x === newFood.x && s.y === newFood.y);
  }
  return newFood;
}

export const useSnakeLogic = (
  levelId: 1 | 2 | 3,
  onLevelComplete: () => void,
  onGameOver: (score: number) => void
) => {
  const levelData = LEVELS[levelId];

  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>({ x: 0, y: -1 });
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(direction);
  // Ensure the ref is always up-to-date with current state for move calculation
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Track if we already triggered completions to avoid multiple calls
  const isTransitioningRef = useRef(false);

  // Initialize level
  useEffect(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setScore(0);
    setDirection({ x: 0, y: -1 });
    directionRef.current = { x: 0, y: -1 };
    setIsGameOver(false);
    setIsPaused(false);
    isTransitioningRef.current = false;
  }, [levelId]);

  const changeDirection = useCallback((newDir: Direction) => {
    // Prevent reversing direction
    if (directionRef.current.x !== 0 && newDir.x !== 0) return;
    if (directionRef.current.y !== 0 && newDir.y !== 0) return;
    setDirection(newDir);
  }, []);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused || isTransitioningRef.current) return;

    setSnake((prev) => {
      const head = prev[0];
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };

      // Wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        onGameOver(score);
        return prev;
      }

      // Self collision
      if (prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        onGameOver(score);
        return prev;
      }

      const newSnake = [newHead, ...prev];
      let didEat = false;

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        didEat = true;
        setFood(generateFood(newSnake));
        
        setScore((prevScore) => prevScore + levelData.foodValue);
      }

      // For Level 1 and 2, maybe we don't grow? The requirements say:
      // Level 3: "Snake grows per unit." implying 1 & 2 might NOT grow.
      // But snake games typically always grow. "same speed but small to increase" for lvl 2.
      // Let's assume standard growth rules across the board.
      if (!didEat) {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, isGameOver, isPaused, levelData, score, onGameOver, onLevelComplete]);

  // Handle level completion safely after state updates
  useEffect(() => {
    if (score >= levelData.target && !isTransitioningRef.current && !isGameOver) {
      isTransitioningRef.current = true;
      onLevelComplete();
    }
  }, [score, levelData.target, isGameOver, onLevelComplete]);

  return {
    snake,
    food,
    direction,
    changeDirection,
    score,
    isGameOver,
    isPaused,
    setIsPaused,
    moveSnake,
    levelData,
  };
};
