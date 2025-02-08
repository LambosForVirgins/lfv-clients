import { Member } from "@/state/subscription/types";

export const hasMaturingTokens = (member: Member | null): boolean => {
  if (member) {
    const { totalAmount = 0, totalMatured = 0 } = member;
    return totalMatured < totalAmount;
  }

  return false;
};
