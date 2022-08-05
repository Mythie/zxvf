export const getRandomRange = (min: number, max: number): number => {
  const [minCeil, maxFloor] = [Math.ceil(min), Math.floor(max)];

  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
};
