import { PublicKey } from "@solana/web3.js";
import { LOCKER_PROGRAM } from "./constants";

enum Seed {
  SubscriptionAccount = "subscription",
  MemberAccount = "member",
  VaultTokenAccount = "vault",
  RewardTokenAccount = "reward",
}

export const findSubscriptionAccountAddress = (publicKey: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(Seed.SubscriptionAccount), publicKey.toBuffer()],
    LOCKER_PROGRAM
  );

  return pda;
};

export const findMemberAccountAddress = (publicKey: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(Seed.MemberAccount), publicKey.toBuffer()],
    LOCKER_PROGRAM
  );

  return pda;
};

export const findRewardTokenAccountAddress = (
  mintKey: PublicKey,
  publicKey: PublicKey
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(Seed.RewardTokenAccount),
      mintKey.toBuffer(),
      publicKey.toBuffer(),
    ],
    LOCKER_PROGRAM
  );

  return pda;
};

export const findVaultTokenAccountAddress = (
  mintKey: PublicKey,
  publicKey: PublicKey
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(Seed.VaultTokenAccount),
      mintKey.toBuffer(),
      publicKey.toBuffer(),
    ],
    LOCKER_PROGRAM
  );

  return pda;
};
