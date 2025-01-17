import { atomFamily } from "recoil";
import { effectMemberAccountSubscription } from "./effects";
import { PublicKey } from "@solana/web3.js";
import { Member } from "./types";

export const memberAccountAtom = atomFamily<Member | null, PublicKey | null>({
  key: "member-account-atom",
  effects: (param) => [effectMemberAccountSubscription(param)],
  default: null,
});
