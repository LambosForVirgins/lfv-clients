import { PublicKey } from "@solana/web3.js";
import { LOCKER_PROGRAM } from "./constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

enum Seed {
  SubscriptionAccount = "subscription",
  MemberAccount = "member",
  VaultTokenAccount = "vault",
  RewardTokenMint = "reward",
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

export const findRewardTokenMint = () => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(Seed.RewardTokenMint)],
    LOCKER_PROGRAM
  );

  return pda;
};

export const findRewardTokenAccountAddress = (publicKey: PublicKey) => {
  const mint = findRewardTokenMint();
  const [associatedTokenAddress] = PublicKey.findProgramAddressSync(
    [publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_PROGRAM_ID
  );

  return associatedTokenAddress;
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
