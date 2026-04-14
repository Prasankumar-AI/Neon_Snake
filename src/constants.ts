export const GRID_SIZE = 20; // 20x20 grid

export type LevelParams = {
  id: 1 | 2 | 3;
  speedMs: number;
  target: number; // how much food needed
  foodType: 'point' | 'apple' | 'banana';
  foodValue: number; // score increment
};

export const LEVELS: Record<number, LevelParams> = {
  1: { id: 1, speedMs: 150, target: 15, foodType: 'point', foodValue: 1 },
  2: { id: 2, speedMs: 120, target: 10, foodType: 'apple', foodValue: 1 },
  3: { id: 3, speedMs: 100, target: Infinity, foodType: 'banana', foodValue: 1 }, // grows and gets faster maybe?
};
