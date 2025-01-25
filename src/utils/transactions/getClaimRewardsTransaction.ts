import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  findRewardTokenMint,
  findSubscriptionAccountAddress,
} from "../locker/PDA";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { program } from "../locker";

export const getClaimRewardsTransaction = async (
  connection: Connection,
  publicKey: PublicKey
) => {
  const latestBlock = await connection.getLatestBlockhash(),
    subscription = findSubscriptionAccountAddress(publicKey),
    rewardMint = findRewardTokenMint();

  const rewardsTokenAccount = getAssociatedTokenAddressSync(
    rewardMint,
    publicKey,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_PROGRAM_ID
  );

  console.log(
    "Reward token",
    rewardMint.toBase58(),
    rewardsTokenAccount.toBase58()
  );

  const instruction = await program.methods
    .claim()
    .accounts({
      subscription,
      mint: rewardMint,
      tokenAccount: rewardsTokenAccount,
      signer: publicKey,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();

  const messageV0 = new TransactionMessage({
    payerKey: publicKey,
    recentBlockhash: latestBlock.blockhash,
    instructions: [instruction],
  }).compileToV0Message();
  // Construct a versioned transaction
  return new VersionedTransaction(messageV0);
};
