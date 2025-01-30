import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  findRewardTokenAccountAddress,
  findRewardTokenMint,
  findSubscriptionAccountAddress,
} from "../locker/PDA";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { program } from "../locker";

export const getClaimRewardsTransaction = async (
  publicKey: PublicKey
): Promise<TransactionInstruction> => {
  const subscription = findSubscriptionAccountAddress(publicKey),
    mint = findRewardTokenMint(),
    destinationTokenAccount = findRewardTokenAccountAddress(publicKey);

  console.log(
    "Reward token",
    mint.toBase58(),
    destinationTokenAccount.toBase58()
  );

  return program.methods
    .claim()
    .accounts({
      subscription,
      mint,
      destinationTokenAccount,
      signer: publicKey,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();
};
