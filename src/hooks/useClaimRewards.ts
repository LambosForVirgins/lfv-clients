import { getClaimRewardsTransaction } from "@/utils/transactions/getClaimRewardsTransaction";
import { getInitializeRewardsInstruction } from "@/utils/transactions/getInitializeRewardsTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useCallback, useState } from "react";
import { useRewardMint } from "./useTokenMint";

export const useClaimRewards = () => {
  const { connection } = useConnection();
  const [pending, setPending] = useState(false);
  const { publicKey, sendTransaction } = useWallet();
  const { isInitialized } = useRewardMint();

  const claim = useCallback(async () => {
    if (!publicKey || pending) return;

    alert(
      "Claiming rewards has been temporarily disabled. We are working on a fix as we speak."
    );

    return;

    setPending(true);

    try {
      const transaction = new Transaction();

      if (!isInitialized) {
        transaction.add(getInitializeRewardsInstruction(publicKey));
      }

      transaction.add(await getClaimRewardsTransaction(publicKey));

      const txHash = await sendTransaction(transaction, connection).catch(
        (err) => console.log("err", err)
      );

      console.log("Claim TX", txHash);

      if (!txHash) return;

      await connection.confirmTransaction(txHash, "finalized");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setPending(false);
    }
  }, [publicKey]);

  return { pending, claim };
};
