import { Keypair } from "@solana/web3.js";
import { verifyMessage } from "../verifyMessage";
import { signMessage } from "../signMessage";

const keypair = new Keypair();
const message = "Hello, World!";

describe("verifyMessage", () => {
  it("should verify a correctly signed message", () => {
    const signature = signMessage("Hello, World!", keypair);
    const result = verifyMessage(message, signature, keypair.publicKey);

    expect(result).toBe(true);
  });

  it("should reject an invalid message", () => {
    const signature = signMessage("Invalid message", keypair);
    const result = verifyMessage(message, signature, keypair.publicKey);

    expect(result).toBe(false);
  });

  it("should reject an invalid message signer", () => {
    const signer = new Keypair();
    const signature = signMessage(message, signer);
    const result = verifyMessage(message, signature, keypair.publicKey);

    expect(result).toBe(false);
  });
});
