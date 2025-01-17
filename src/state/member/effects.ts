import { PublicKey } from "@solana/web3.js";
import { AtomEffect } from "recoil";
import { MemberAccountStruct, program } from "@/utils/locker/setup";
import { getConnection } from "@/utils/locker/constants";
import { PDA } from "@/utils/locker";
import { Member } from "./types";
import { mapMemberFromStruct } from "./utils";

export const effectMemberAccountSubscription =
  (publicKey: PublicKey | null): AtomEffect<Member | null> =>
  ({ trigger, setSelf }) => {
    if (!publicKey) return;

    const connection = getConnection();
    const accountPDA = PDA.memberAccountAddress(publicKey, program.programId);
    let subscriptionId: number | null = null;

    console.log("Member account", accountPDA.toBase58());

    if (trigger === "get") {
      program.account.memberAccount
        .fetch(accountPDA)
        .then(mapMemberFromStruct)
        .then(setSelf)
        .catch((error) => {
          console.error(
            `Error fetching member account "${accountPDA.toBase58()}"`,
            error
          );
        });
      // Subscribe to member account changes and update the member state
      subscriptionId = connection.onAccountChange(accountPDA, (info) => {
        const memberStruct = program.coder.accounts.decode<MemberAccountStruct>(
          "MemberAccount",
          info.data
        );
        setSelf(mapMemberFromStruct(memberStruct));
      });
    }

    return () => {
      if (!subscriptionId) return;
      connection.removeAccountChangeListener(subscriptionId);
    };
  };
