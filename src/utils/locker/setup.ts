import { IdlAccounts, Program, web3 } from "@coral-xyz/anchor";
import IDL from "./idl/reward_program.json";
import { RewardProgram } from "./idl/reward_program";
import { clusterApiUrl } from "@solana/web3.js";
import { LOCKER_PROGRAM, solanaRpcUrl } from "./constants";

const endpoint = solanaRpcUrl();
const connection = new web3.Connection(endpoint, "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<RewardProgram>(
  IDL as RewardProgram,
  LOCKER_PROGRAM,
  {
    connection,
  }
);

export type SubscriptionAccountStruct =
  IdlAccounts<RewardProgram>["subscriptionAccount"];

export type WithdrawMethod = (typeof program)["methods"]["withdraw"];

export type ReleaseMethod = (typeof program)["methods"]["release"];

export type DepositMethod = (typeof program)["methods"]["deposit"];

export type TransferMethod = ReleaseMethod | DepositMethod;
