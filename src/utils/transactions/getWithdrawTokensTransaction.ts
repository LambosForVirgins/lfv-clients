import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  findSubscriptionAccountAddress,
  findVaultTokenAccountAddress,
  program,
} from "../locker";
import { MINT } from "../locker/constants";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export const getWithdrawTokensTransaction = async (
  connection: Connection,
  publicKey: PublicKey
) => {
  const latestBlock = await connection.getLatestBlockhash(),
    subscription = findSubscriptionAccountAddress(publicKey),
    vaultTokenAccount = findVaultTokenAccountAddress(MINT, publicKey),
    sourceTokenAccount = getAssociatedTokenAddressSync(MINT, publicKey);

  const instruction = await program.methods
    .withdraw()
    .accounts({
      subscription,
      vaultTokenAccount,
      sourceTokenAccount,
      mint: MINT,
      signer: publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
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
