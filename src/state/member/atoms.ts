import { atomFamily } from "recoil";
import { MemberAccountStruct } from "@/utils/locker/setup";
import { effectMemberAccountSubscription } from "./effects";
import { PublicKey } from "@solana/web3.js";

export const memberAccountAtom = atomFamily<
  MemberAccountStruct | null,
  PublicKey | null
>({
  key: "member-account-atom",
  effects: (param) => [effectMemberAccountSubscription(param)],
  default: null,
});
