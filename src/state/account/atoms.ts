import { PublicKey } from "@solana/web3.js";
import { atom } from "recoil";
import { effectPublicKeyAtom } from "./effects";

/**
 * Stores the base58 encoded public key of the current account
 * or null if the user's wallet is not connected.
 */
export const publicKeyAtom = atom<PublicKey | null>({
  key: "public-key-atom",
  effects: [effectPublicKeyAtom],
  default: null,
});
