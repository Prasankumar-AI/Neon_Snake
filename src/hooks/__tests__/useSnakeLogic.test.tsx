/// <reference types="jest" />
import { renderHook, act } from '@testing-library/react';
import { useSnakeLogic } from '../useSnakeLogic';
import { LEVELS } from '../../constants';

describe('useSnakeLogic Hook', () => {
  const mockOnLevelComplete = jest.fn();
  const mockOnGameOver = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes level 1 correctly', () => {
    const { result } = renderHook(() => useSnakeLogic(1, mockOnLevelComplete, mockOnGameOver));
    
    expect(result.current.snake.length).toBe(1);
    expect(result.current.score).toBe(0);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.levelData).toEqual(LEVELS[1]);
  });

  it('moves snake when moveSnake is called', () => {
    const { result } = renderHook(() => useSnakeLogic(1, mockOnLevelComplete, mockOnGameOver));
    
    const initialHead = { ...result.current.snake[0] };
    
    // Default direction is UP (0, -1)
    act(() => {
      result.current.moveSnake();
    });

    const newHead = result.current.snake[0];
    expect(newHead.y).toBe(initialHead.y - 1);
    expect(newHead.x).toBe(initialHead.x);
  });

  it('triggers game over on wall collision', () => {
    const { result } = renderHook(() => useSnakeLogic(1, mockOnLevelComplete, mockOnGameOver));
    
    // Move up until out of bounds (initial is at 10,10 so 11 moves up will go to y = -1)
    act(() => {
      for (let i = 0; i < 11; i++) {
        result.current.moveSnake();
      }
    });

    expect(result.current.isGameOver).toBe(true);
    expect(mockOnGameOver).toHaveBeenCalled();
  });
});
