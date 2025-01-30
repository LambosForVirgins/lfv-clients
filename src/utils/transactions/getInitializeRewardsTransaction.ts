import { PublicKey, type TransactionInstruction } from "@solana/web3.js";
import {
  findRewardTokenAccountAddress,
  findRewardTokenMint,
} from "../locker/PDA";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";

export const getInitializeRewardsInstruction = (
  publicKey: PublicKey
): TransactionInstruction => {
  const mint = findRewardTokenMint(),
    associatedTokenAddress = findRewardTokenAccountAddress(publicKey);

  return createAssociatedTokenAccountInstruction(
    publicKey,
    associatedTokenAddress,
    publicKey,
    mint
  );
};
