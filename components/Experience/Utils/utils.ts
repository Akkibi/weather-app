export const easeExpoInOut = (t: number): number => {
  return t < 0.5
    ? Math.pow(2, 10 * (t * 2 - 1)) / 2
    : (2 - Math.pow(2, -10 * (t * 2 - 1))) / 2;
};
