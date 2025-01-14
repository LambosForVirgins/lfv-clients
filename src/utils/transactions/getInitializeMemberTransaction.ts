import { Connection, PublicKey } from "@solana/web3.js";
import { PDA, program } from "../locker";
import {
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { MINT } from "../locker/constants";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

export const getInitializeMemberTransaction = async (
  connection: Connection,
  publicKey: PublicKey
) => {
  const latestBlock = await connection.getLatestBlockhash(),
    memberAccount = PDA.memberAccountAddress(publicKey, program.programId),
    vaultTokenAccount = PDA.vaultTokenAddress(
      MINT,
      publicKey,
      program.programId
    );

  const instruction = await program.methods
    .initialize()
    .accounts({
      memberAccount,
      vaultTokenAccount,
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
