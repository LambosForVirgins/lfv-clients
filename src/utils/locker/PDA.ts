import { PublicKey } from "@solana/web3.js";
import { REWARD_PROGRAM, SeedKey } from "./constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

export const findSubscriptionAccountAddress = (publicKey: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(SeedKey.SubscriptionSeed), publicKey.toBuffer()],
    REWARD_PROGRAM
  );

  return pda;
};

export const findRewardTokenMint = () => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(SeedKey.RewardsSeed)],
    REWARD_PROGRAM
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
    [Buffer.from(SeedKey.VaultSeed), mintKey.toBuffer(), publicKey.toBuffer()],
    REWARD_PROGRAM
  );

  return pda;
};
