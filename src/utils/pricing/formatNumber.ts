import BN from "bn.js";

export const formatNumber = (lamports?: BN) => {
  if (!lamports) return "0";
  const amount = lamports.div(new BN(10 ** 9));
  return amount.toNumber().toLocaleString();
};
