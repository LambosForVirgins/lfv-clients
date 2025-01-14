export type DeriveOptions = {
  min?: number;
  max: number;
  /** Skips the specified number when defined */
  skip?: number;
};

export const numberFromString = (str: string): number =>
  str.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

export const deriveNumberFromSeed = (
  seed: string,
  options: DeriveOptions
): number => {
  const min = options.min ?? 0,
    max = options.max ?? 1;

  if (seed.length !== 8) {
    throw new Error("The input string must be exactly 8 characters long");
  }

  const numericValue = numberFromString(seed);

  const range = max - min;
  let derivedNumber = min + (numericValue % range);

  if (options.skip !== undefined) {
    while (derivedNumber === options.skip) {
      derivedNumber = min + ((derivedNumber + 1) % range);
    }
  }

  return derivedNumber;
};
