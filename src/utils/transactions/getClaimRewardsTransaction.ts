import { Connection, PublicKey } from "@solana/web3.js";
import { program } from "../locker";
import {
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { findSubscriptionAccountAddress } from "../locker/PDA";

export const getClaimRewardsTransaction = async (
  connection: Connection,
  publicKey: PublicKey
) => {
  const latestBlock = await connection.getLatestBlockhash(),
    subscription = findSubscriptionAccountAddress(publicKey);

  const instruction = await program.methods
    .claim()
    .accounts({
      subscription,
      signer: publicKey,
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
