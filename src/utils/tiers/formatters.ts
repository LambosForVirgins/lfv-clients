import { MemberStatus, MemberTier } from "@/state/subscription/types";

export const tierToString = (tier: MemberTier | undefined | null) => {
  switch (tier) {
    case MemberTier.Virgin:
      return "Virgin";
    case MemberTier.BabyChad:
      return "BabyChad";
    case MemberTier.SuperChad:
      return "SuperChad";
    case MemberTier.MegaChad:
      return "MegaChad";
    case MemberTier.GigaChad:
      return "GigaChad";
    default:
      return "Unknown";
  }
};

export const numberToTier = (key: number | null | undefined): MemberTier => {
  switch (key) {
    case 1:
      return MemberTier.BabyChad;
    case 2:
      return MemberTier.SuperChad;
    case 3:
      return MemberTier.MegaChad;
    case 4:
      return MemberTier.GigaChad;
    default:
      return MemberTier.Virgin;
  }
};

export const statusToString = (tier: MemberStatus | undefined | null) => {
  switch (tier) {
    case MemberStatus.Pending:
      return "Pending";
    case MemberStatus.Active:
      return "Active";
    case MemberStatus.Paused:
      return "Paused";
    case MemberStatus.Excluded:
      return "Excluded";
    case MemberStatus.Suspended:
      return "Suspended";
    default:
      return "Unknown";
  }
};
