import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { createBurnAllTokensInstruction } from "../instructions/createBurnMintInstruction";
import { createCloseTokenAccountInstruction } from "../instructions/createCloseTokenAccountInstruction";

// Executes the burn and close instructions sequentially
export async function getMintTradeInTransaction(
  connection: Connection,
  tokenAccount: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  refundRecipient: PublicKey // This should be generated in this function as the program account
) {
  const burnIx = await createBurnAllTokensInstruction(
    connection,
    tokenAccount,
    mint,
    owner
  );

  const closeIx = createCloseTokenAccountInstruction(
    tokenAccount,
    refundRecipient,
    owner
  );

  const transaction = new Transaction().add(burnIx, closeIx);

  return transaction;
}
