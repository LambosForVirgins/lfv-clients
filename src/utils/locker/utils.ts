import { PublicKey } from "@solana/web3.js";
import { LOCKER_PROGRAM, MINT, SeedKey } from "./constants";

export const findMemberAccount = (signer: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(SeedKey.MemberAccount), signer.toBuffer()],
    LOCKER_PROGRAM
  );

  return pda;
};

export const findMemberVaultTokenAccount = (signer: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(SeedKey.VaultTokenAccount),
      MINT.toBuffer(),
      signer.toBuffer(),
    ],
    LOCKER_PROGRAM
  );

  return pda;
};
