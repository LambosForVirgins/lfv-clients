import { type Connection, VersionedTransaction } from "@solana/web3.js";
import {
  type SignerWalletAdapter,
  type Adapter,
} from "@solana/wallet-adapter-base";
import { SwapError } from "./SwapError";

export const executeTransaction = async (
  transactionInput: any,
  adapter: Adapter,
  connection: Connection
) => {
  try {
    const swapTransactionBuffer = Buffer.from(transactionInput, "base64");
    const transaction = VersionedTransaction.deserialize(swapTransactionBuffer);

    if (!adapter) throw new Error("Wallet not connected");

    const signedTransaction = await (
      adapter as SignerWalletAdapter
    ).signTransaction(transaction);

    const rawTransaction = signedTransaction.serialize();
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2,
    });

    const latestBlockHash = await connection.getLatestBlockhash();

    const result = await connection.confirmTransaction(
      {
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid,
      },
      "confirmed"
    );

    // console.log("Transaction confirmed", txid);
    // console.log(`https://solscan.io/tx/${txid}`);
    // console.log("Result", result);

    return result;
  } catch (error: any) {
    throw SwapError.fromError(error);
  }
};
