import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

/**
 * The primary function of a keypair is to sign messages,
 * transactions and enable verification of the signature.
 * Verification of a signature allows the recipient to be
 * sure that the data was signed by the owner of a specific
 * private key.
 */
export const signMessage = (
  message: string,
  keypair: Keypair
): Uint8Array<ArrayBufferLike> => {
  const messageBytes = decodeUTF8(message);
  return nacl.sign.detached(messageBytes, keypair.secretKey);
};
