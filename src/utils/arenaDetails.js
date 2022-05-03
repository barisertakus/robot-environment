export const ARENA_HEIGHT = 5;
export const ARENA_WIDTH = 5;

export const initArenaArray = [...Array(ARENA_HEIGHT)]
  .fill(0)
  .map(() => [...Array(ARENA_WIDTH)].fill(0));

export const fillZero = (arena) => {
  return arena.map((column) => column.fill(0));
};
