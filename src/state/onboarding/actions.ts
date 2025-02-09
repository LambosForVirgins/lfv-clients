import { Connection, Transaction } from "@solana/web3.js";
import { Effect } from "effect";
import { BaseWalletAdapter } from "@solana/wallet-adapter-base";
import { findSubscriptionAccountAddress } from "@/utils/locker";
import { getInitializeMemberInstruction } from "@/utils/transactions/getInitializeMemberTransaction";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export const fetchSolanaNetworkConnection = async (): Promise<Connection> =>
  new Promise<Connection>((resolve, reject) => {
    console.log("Fetching Solana network connection...");
    const connection = new Connection("https://api.devnet.solana.com");
    resolve(connection);
  });

interface SolanaBalanceInput {
  connection: Connection;
  wallet: BaseWalletAdapter;
}

export const loadWalletAdapters = async () => {
  return new Promise((resolve) => {
    resolve([new PhantomWalletAdapter(), new SolflareWalletAdapter()]);
  });
};

export const completeAuthentication = async () => {
  console.log("Completing authentication...");
};

export const waitForFocus = async () =>
  new Promise<void>((resolve) => {
    // Resolve immediately if the window is already focused,
    if (document.hasFocus()) return resolve();
    // Define a listener that will resolve the promise when the window gets focus.
    const onFocus = () => {
      if (document.hasFocus()) {
        resolve();
        window.removeEventListener("focus", onFocus);
      }
    };
    // Listen for the focus event.
    window.addEventListener("focus", onFocus);
  });

export const openRaydiumExchange = async () => {
  console.log("Opening Raydium exchange...");
};

export const checkSolanaBalance = async ({
  input,
}: {
  input: SolanaBalanceInput;
}): Promise<number> => {
  const publicKey = input.wallet.publicKey;
  if (!publicKey) throw new Error("No public key found");
  // Fetch the wallet Solana balance and convert Lamports to SOL
  return input.connection.getBalance(publicKey).then((lamports) => {
    return lamports / 10 ** 9;
  });
};

export const checkMemberSubscription = async ({
  input,
}: {
  input: SolanaBalanceInput;
}): Promise<boolean> => {
  const publicKey = input.wallet.publicKey;
  if (!publicKey) throw new Error("No public key found");
  // Fetch the member subscription account
  const subscriptionAddress = findSubscriptionAccountAddress(publicKey);
  const accountInfo =
    await input.connection.getAccountInfo(subscriptionAddress);

  return !!accountInfo;
};

export const initializeAccount = async ({
  input,
}: {
  input: SolanaBalanceInput;
}) => {
  console.log("Initializing account...");
  const publicKey = input.wallet.publicKey;
  if (!publicKey) throw new Error("No public key found");
  // Create the transaction
  const transaction = new Transaction().add(
    await getInitializeMemberInstruction(publicKey)
  );

  const signature = await input.wallet.sendTransaction(
    transaction,
    input.connection
  );
  console.log("Transaction signature", signature);
  return input.connection.confirmTransaction(signature, "confirmed");
};

export const requestAirdrop = () => {
  console.log("Requesting token airdrop...");
};
