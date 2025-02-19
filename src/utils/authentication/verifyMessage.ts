import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

/**
 * The primary function of a keypair is to sign messages,
 * transactions and enable verification of the signature.
 * Verification of a signature allows the recipient to be
 * sure that the data was signed by the owner of a specific
 * private key.
 */
export const verifyMessage = (
  message: string,
  signature: Uint8Array<ArrayBufferLike>,
  publicKey: PublicKey
): boolean => {
  const messageBytes = decodeUTF8(message);
  return nacl.sign.detached.verify(
    messageBytes,
    signature,
    publicKey.toBytes()
  );
};
