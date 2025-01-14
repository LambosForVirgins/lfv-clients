import { IdlAccounts, Program, web3 } from "@coral-xyz/anchor";
import IDL from "./idl/subscription.json";
import { Subscription } from "./idl/subscription";
import { clusterApiUrl } from "@solana/web3.js";
import { LOCKER_PROGRAM } from "./constants";
import { MethodsFn } from "@coral-xyz/anchor/dist/cjs/program/namespace/types";
import { IdlInstruction } from "@coral-xyz/anchor/dist/cjs/idl";

const connection = new web3.Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<Subscription>(
  IDL as Subscription,
  LOCKER_PROGRAM,
  {
    connection,
  }
);

export type MemberAccountStruct = IdlAccounts<Subscription>["memberAccount"];

export type WithdrawMethod = (typeof program)["methods"]["withdraw"];

export type DepositMethod = (typeof program)["methods"]["deposit"];

export type TransferMethod = WithdrawMethod | DepositMethod;
