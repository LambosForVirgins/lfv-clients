import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com");

export async function getBalance(publicKeyString: string): Promise<number> {
  const publicKey = new PublicKey(publicKeyString);
  const lamports = await connection.getBalance(publicKey);
  return lamports;
}

export async function getAccountInfo(publicKeyString: string): Promise<any> {
  const publicKey = new PublicKey(publicKeyString);
  const info = await connection.getAccountInfo(publicKey);
  return info;
}
