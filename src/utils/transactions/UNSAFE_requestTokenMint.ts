import { PublicKey } from "@solana/web3.js";

export const UNSAFE_requestTokenMint = async (
  publicKey: PublicKey,
  amount: number
) => {
  return fetch(`https://lambosforvirgins.com/api/faucet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      address: publicKey.toBase58(),
    }),
  }).then((res) => {
    console.log(res);
  });
};
