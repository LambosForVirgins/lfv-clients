/**
 * Obviously not secure by any means. This is just a simple
 * way to mix the strings that doesn't require polyfills.
 */
export const mergeRandomly = (str1: string, str2: string): string => {
  if (str1.length !== 8 || str2.length !== 8) {
    throw new Error("Both strings must be exactly 8 characters long");
  }

  const combinedArray: string[] = [];

  for (let i = 0; i < 8; i++) {
    // Randomly choose a character from str1 or str2
    const chosenChar = Math.random() < 0.5 ? str1[i] : str2[i];
    combinedArray.push(chosenChar);
  }

  return combinedArray.join("");
};
