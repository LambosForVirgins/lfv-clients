import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const solFromLamports = (value: number) => value / 1_000_000_000;

export const validateSolanaAddress = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    console.error("Error validating address:", error);
    return false;
  }
};

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

export const getBalance = async (address: string) => {
  try {
    const publicKey = new PublicKey(address);

    const balance = await connection.getBalance(publicKey);

    return solFromLamports(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0;
  }
};
