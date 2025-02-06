import { atom, atomFamily } from "recoil";
import { effectMemberAccountSubscription } from "./effects";
import { PublicKey } from "@solana/web3.js";
import { Member, MemberTier, MemberTierValues } from "./types";
import { REWARD_FACTOR } from "@/utils/locker/constants";

export const memberAccountAtom = atomFamily<Member | null, PublicKey | null>({
  key: "member-account-atom",
  effects: (param) => [effectMemberAccountSubscription(param)],
  default: null,
});

const rewardsFromTokens = (tokens: number): number =>
  Math.floor(tokens / REWARD_FACTOR);

export const subscriptionOptionsAtom = atom({
  key: "subscription-options-atom",
  default: [
    {
      tier: MemberTier.SuperChad,
      title: "SuperChad",
      benefits: [
        { label: "Shop virgin only merch" },
        { label: "Special event access" },
        { label: "Access to daily giveaways" },
        {
          label: `${rewardsFromTokens(MemberTierValues.Super)} entries per month`,
        },
      ],
      amount: MemberTierValues.Super,
    },
    {
      tier: MemberTier.MegaChad,
      title: "MegaChad",
      benefits: [
        { label: "10% off virgin only merch" },
        { label: "Exclusive event benefits" },
        { label: "Access more giveaways" },
        {
          label: `${rewardsFromTokens(MemberTierValues.Mega)} entries per month`,
        },
      ],
      amount: MemberTierValues.Mega,
      highlight: true,
    },
    {
      tier: MemberTier.GigaChad,
      title: "GigaChad",
      benefits: [
        { label: "25% off virgin only merch" },
        { label: "VIP event access & treatment" },
        { label: "Access the biggest giveaways" },
        {
          label: `${rewardsFromTokens(MemberTierValues.Giga)} entries per month`,
        },
      ],
      expectations: [
        { label: "Immediate access to all tier benefits" },
        { label: "Receive 1,000 entries today" },
        { label: "Cancel anytime" },
      ],
      amount: MemberTierValues.Giga,
    },
  ],
});
