import { PublicKey, type TransactionInstruction } from "@solana/web3.js";
import { findVaultTokenAccountAddress } from "../locker/PDA";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { MINT } from "../locker/constants";

export const getInitializeVaultInstruction = (
  publicKey: PublicKey
): TransactionInstruction => {
  const associatedTokenAddress = findVaultTokenAccountAddress(MINT, publicKey);

  return createAssociatedTokenAccountInstruction(
    publicKey,
    associatedTokenAddress,
    publicKey,
    MINT
  );
};
