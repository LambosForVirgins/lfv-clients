import { PDA, program } from "@/utils/locker";
import { MemberAccountStruct } from "@/utils/locker/setup";
import { PublicKey } from "@solana/web3.js";

export const getMembership = async (
  publicKey: PublicKey | null
): Promise<MemberAccountStruct | null> => {
  if (!publicKey) return null;

  const memberAccountPda = PDA.memberAccountAddress(
    publicKey,
    program.programId
  );
  console.log("Member Account PDA", memberAccountPda.toBase58());

  return program.account.memberAccount
    .fetch(memberAccountPda, "confirmed")
    .then((account) => {
      console.log("Account", account);
      return account;
    })
    .catch((err) => {
      console.log("Error", err);
      return null;
    });
};
