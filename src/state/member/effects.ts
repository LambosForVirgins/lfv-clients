import { PublicKey } from "@solana/web3.js";
import { AtomEffect } from "recoil";
import { MemberAccountStruct, program } from "@/utils/locker/setup";
import { getConnection } from "@/utils/locker/constants";
import { PDA } from "@/utils/locker";

export const effectMemberAccountSubscription =
  (publicKey: PublicKey | null): AtomEffect<MemberAccountStruct | null> =>
  ({ trigger, setSelf }) => {
    if (!publicKey) return;

    const connection = getConnection();
    const accountPDA = PDA.memberAccountAddress(publicKey, program.programId);
    let subscriptionId: number | null = null;

    if (trigger === "get") {
      program.account.memberAccount
        .fetch(accountPDA)
        .then(setSelf) // TODO: Remap the member data into a generic app member
        .catch((error) => {
          console.error(
            `Error fetching member account "${accountPDA.toBase58()}"`,
            error
          );
        });
      // Subscribe to member account changes and update the member state
      subscriptionId = connection.onAccountChange(accountPDA, (info) => {
        const member = program.coder.accounts.decode<MemberAccountStruct>(
          "MemberAccount",
          info.data
        );
        setSelf(member); // TODO: Remap the member data into a generic app member
      });
    }

    return () => {
      if (!subscriptionId) return;
      connection.removeAccountChangeListener(subscriptionId);
    };
  };
