import { BaseWalletAdapter } from "@solana/wallet-adapter-base";
import { Connection } from "@solana/web3.js";
import { spawnChild } from "xstate";

export interface NetworkConnectionContext {
  blocks: StepDefinition[];
  connection: Connection | null;
}

export interface OnboardingContext {
  version: string;
  network: ReturnType<typeof spawnChild> | null;
  wallet: BaseWalletAdapter | null;
  wallets: BaseWalletAdapter[];
  balance: number;
  retryAttempts: number;
  maxAttempts: number;
  initializationAttempts: number;
  blocks: StepDefinition[];
}

export type NetworkActions =
  | { type: "connect" }
  | { type: "connectionSuccess" }
  | { type: "connectionFailed" }
  | { type: "retryConnection" }
  | { type: "FAILURE" };

type WalletActions =
  | { type: "LOAD_WALLETS" }
  | { type: "DISPLAY_WALLETS"; wallets: BaseWalletAdapter[] }
  | { type: "SELECT_WALLET"; wallet: BaseWalletAdapter }
  | { type: "CONNECT_WALLET"; wallet: BaseWalletAdapter }
  | { type: "DISCONNECT_WALLET"; wallet: BaseWalletAdapter };

type BalanceActions =
  | { type: "BALANCE_CHANGE"; balance: number }
  | { type: "PURCHASE_SOLANA" };

type MemberActions =
  | { type: "INITIALIZE_SUBSCRIPTION" }
  | { type: "SUBSCRIPTION_EXISTS" }
  | { type: "SUBSCRIPTION_INITIALIZED" }
  | { type: "INITIALIZATION_FAILED" };

export type OnboardingEvents =
  | NetworkActions
  | WalletActions
  | BalanceActions
  | MemberActions;

export type StepOption<T> = {
  key: string;
  label: string;
  value: T;
  disabled?: boolean;
  event: string;
};

export type StepDefinition<T = any> = {
  key: string;
  lines: string[];
  selected?: T;
  options?: StepOption<T>[];
  delay?: number;
  noise?: number;
  align?: "center" | "left" | "right";
};

export enum NetworkStateKey {
  Loading = "network.loading",
  Loaded = "network.loaded",
  Displaying = "network.displaying",
  Selecting = "network.selecting",
  Selected = "network.selected",
  Connecting = "network.connecting",
  Retrying = "network.retrying",
  Connected = "network.connected",
  Failed = "network.failed",
}

export enum WalletStateKey {
  Loading = "wallet.loading",
  Displaying = "wallet.displaying",
}

export enum SolanaBalanceKey {
  Sufficient = "balance.sufficient",
  Low = "balance.low",
}

export enum MemberAccountKey {
  Checking = "member.checking",
  Initializing = "member.initializing",
  Pending = "member.pending",
  Terminate = "member.terminate",
}
