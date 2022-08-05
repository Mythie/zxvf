import { getRandomRange } from './getRandomRange';

export const pluckRandom = <T>(arr: T[]): T => {
  return arr[getRandomRange(0, arr.length - 1)];
};

export const pluckRandomMultiple = <T>(arr: T[], count: number): T[] => {
  return new Array(count).fill(0).map(() => pluckRandom(arr));
};
