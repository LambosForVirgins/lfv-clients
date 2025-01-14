import { Connection, PublicKey } from "@solana/web3.js";
import { PDA, program } from "../locker";
import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { MemberStatus } from "@/state/member/types";
import { statusToString } from "../tiers/formatters";

export const getUpdateStatusTransaction = async (
  connection: Connection,
  publicKey: PublicKey,
  status: MemberStatus
) => {
  const latestBlock = await connection.getLatestBlockhash(),
    memberAccount = PDA.memberAccountAddress(publicKey, program.programId);

  if (status !== MemberStatus.Excluded) {
    throw new Error(
      `Status "${statusToString(status)}" currently not supported for change`
    );
  }

  const instruction = await program.methods
    .exclude()
    .accounts({
      memberAccount,
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
