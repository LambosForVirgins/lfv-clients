export const getRandomInterval = (
  middle: number = 1000,
  offset: number = 100
): number => {
  const min = middle - offset,
    max = middle + offset;

  const randomStep = Math.floor(Math.random() * ((max - min) / 100 + 1));

  return min + randomStep * 100;
};
