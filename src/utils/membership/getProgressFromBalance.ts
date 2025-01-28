export const getProgressFromBalance = (
  constraints: { minBalance?: number; maxBalance?: number } | undefined,
  balance: number
) => {
  if (!constraints) return 0;
  const min = constraints.minBalance || 0;
  // Get the percentage of the balance between the min and max
  return balance / min;
};
