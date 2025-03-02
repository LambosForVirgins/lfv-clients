import { type AtomEffect } from "recoil";
import { program } from "@/utils/locker";
import { PublicKey } from "@solana/web3.js";

export const effectPublicKeyAtom: AtomEffect<PublicKey | null> = ({
  trigger,
  setSelf,
}) => {
  if (trigger === "get") {
    setSelf(program.provider.publicKey || null);
  }

  return () => {};
};
