import { Brand } from "../config/Brand";
import { TokenMint } from "./types";

export const SolanaTokenMint =
  "So11111111111111111111111111111111111111112" as TokenMint<"So11111111111111111111111111111111111111112">;

export const VIRGINTokenMint = Brand.contractAddress as TokenMint<
  typeof Brand.contractAddress
>;
