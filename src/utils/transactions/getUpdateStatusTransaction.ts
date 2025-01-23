import { Connection, PublicKey } from "@solana/web3.js";
import { program } from "../locker";
import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { MemberStatus } from "@/state/subscription/types";
import { statusToString } from "../tiers/formatters";
import { findSubscriptionAccountAddress } from "../locker/PDA";

export const getUpdateStatusTransaction = async (
  connection: Connection,
  publicKey: PublicKey,
  status: MemberStatus
) => {
  const latestBlock = await connection.getLatestBlockhash(),
    subscription = findSubscriptionAccountAddress(publicKey);

  if (status !== MemberStatus.Excluded) {
    throw new Error(
      `Status "${statusToString(status)}" currently not supported for change`
    );
  }

  const instruction = await program.methods
    .exclude()
    .accounts({
      subscription,
      signer: publicKey,
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
