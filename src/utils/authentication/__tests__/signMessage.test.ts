import { Keypair } from "@solana/web3.js";
import { signMessage } from "../signMessage";

const keypair = new Keypair();

describe("signMessage", () => {
  it("should sign a message", () => {
    const signature = signMessage("Hello, World!", keypair);
    expect(signature).toHaveLength(64);
  });
});
