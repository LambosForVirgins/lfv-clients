import { PublicKey } from "@solana/web3.js";

export class PDA {
  static readonly SeedMemberAccount = "member_account";
  static readonly SeedVaultTokenAccount = "vault_token_account";

  static memberAccountAddress(
    member: PublicKey,
    programId: PublicKey
  ): PublicKey {
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(PDA.SeedMemberAccount), member.toBuffer()],
      programId
    );

    return pda;
  }

  static vaultTokenAddress(
    mint: PublicKey,
    member: PublicKey,
    programId: PublicKey
  ): PublicKey {
    const [pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(PDA.SeedVaultTokenAccount),
        mint.toBuffer(),
        member.toBuffer(),
      ],
      programId
    );

    return pda;
  }
}
