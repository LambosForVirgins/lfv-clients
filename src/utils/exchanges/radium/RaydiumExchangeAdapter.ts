import { PublicKey, Transaction } from "@solana/web3.js";
import { ExchangeAdapter, type ExchangeName } from "../ExchangeAdapter";
import { VIRGINTokenMint } from "../tokens";
import { createSwapTransaction } from "./createSwapTransaction";

const poolId = process.env.NEXT_RAYDIUM_POOL_ID;

const RaydiumExchangeName = "Raydium" as ExchangeName<"Raydium">;

class RaydiumExchangeAdapter extends ExchangeAdapter {
  name = RaydiumExchangeName;
  url = `https://raydium.io/swap/?inputMint=sol&outputMint=${VIRGINTokenMint}`;
  icon = "/images/raydium.png";

  // async getSwapTransaction(
  //   inputTokenMint: PublicKey,
  //   outputTokenMint: PublicKey,
  //   inputAmount: number
  // ): Promise<Transaction> {
  //   if (!poolId) throw new Error("Raydium pool ID not set");

  //   const transaction = createSwapTransaction(connection);

  //   return {
  //     instructions: [],
  //     signers: [],
  //   };
  // }
}

export const createRaydiumAdapter = () => new RaydiumExchangeAdapter();
