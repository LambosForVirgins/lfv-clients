import BN from "bn.js";

export const formatBigNumber = (lamports?: BN) => {
  if (!lamports) return "0";
  const amount = lamports.div(new BN(10 ** 9));
  return amount.toNumber().toLocaleString();
};

export const formatNumber = (amount?: number) => {
  if (!amount) return "0";
  return amount.toLocaleString();
};
