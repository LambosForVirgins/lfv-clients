import { PublicKey } from "@solana/web3.js";
import { AtomEffect } from "recoil";
import { getConnection } from "@/utils/locker/constants";
import {
  getAssociatedTokenAddressSync,
  getAccount,
  AccountLayout,
} from "@solana/spl-token";

export const effectMintAccountAtom =
  (mint: PublicKey, publicKey: PublicKey | null): AtomEffect<number> =>
  ({ trigger, setSelf }) => {
    if (!publicKey) return;

    let eventListener: number | null = null;
    const connection = getConnection(),
      associatedTokenAccount = getAssociatedTokenAddressSync(
        mint,
        publicKey,
        false
      );

    if (trigger === "get") {
      getAccount(connection, associatedTokenAccount, "confirmed")
        .then((data) => {
          setSelf(Math.round(Number(data.amount)));
        })
        .catch((error) => {
          console.error(
            `Error fetching token account "${associatedTokenAccount.toBase58()}"`,
            error
          );
        });
      // Subscribe to token account changes and update balance
      eventListener = connection.onAccountChange(
        associatedTokenAccount,
        (info) => {
          try {
            const accountData = AccountLayout.decode(info.data);
            setSelf(Math.round(Number(accountData.amount)));
          } catch (error) {
            console.error(
              `Error decoding token account "${associatedTokenAccount.toBase58()}"`,
              error
            );
          }
        }
      );
    }

    return () => {
      if (!eventListener) return;
      connection.removeAccountChangeListener(eventListener);
    };
  };
