import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  findRewardTokenAccountAddress,
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
    mint = findRewardTokenMint(),
    destinationTokenAccount = findRewardTokenAccountAddress(publicKey);

  console.log(
    "Reward token",
    mint.toBase58(),
    destinationTokenAccount.toBase58()
  );

  const instruction = await program.methods
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

  const messageV0 = new TransactionMessage({
    payerKey: publicKey,
    recentBlockhash: latestBlock.blockhash,
    instructions: [instruction],
  }).compileToV0Message();
  // Construct a versioned transaction
  return new VersionedTransaction(messageV0);
};
