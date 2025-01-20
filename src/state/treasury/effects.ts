import { Connection, PublicKey } from "@solana/web3.js";
import { AtomEffect } from "recoil";
import { ContractInfo } from "./utils";
import { VestingAccount } from "./types";

export const effectVestingAccountInformation =
  (vestingAccountPublicKey: string): AtomEffect<VestingAccount | null> =>
  ({ trigger, setSelf }) => {
    const connection = new Connection(
        "https://practical-multi-diamond.solana-mainnet.quiknode.pro/9b31cd9dc3d514d5e7a007861e5e5455de1b920e"
      ),
      accountPDA = new PublicKey(vestingAccountPublicKey);
    let subscriptionId: number | null = null;

    if (trigger === "get") {
      connection
        .getAccountInfo(accountPDA)
        .then((info) => {
          if (!info) return null;
          const contract = ContractInfo.fromBuffer(info.data);
          if (!contract) return null;
          return contract.toJSON();
        })
        .then(setSelf)
        .catch((error) => {
          console.error(
            `Error fetching member account "${accountPDA.toBase58()}"`,
            error
          );
        });

      subscriptionId = connection.onAccountChange(accountPDA, (info) => {
        // Decode the vesting account data and schedule

        console.log("Changed account data", info);
        // setSelf(mapMemberFromStruct(memberStruct));
      });
    }

    return () => {
      if (!subscriptionId) return;
      connection.removeAccountChangeListener(subscriptionId);
    };
  };
