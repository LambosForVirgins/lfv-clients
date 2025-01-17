import { getClaimRewardsTransaction } from "@/utils/transactions/getClaimRewardsTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";

export const useClaimRewards = () => {
  const { connection } = useConnection();
  const [pending, setPending] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  const claim = useCallback(async () => {
    if (!publicKey || pending) return;

    setPending(true);

    try {
      const transaction = await getClaimRewardsTransaction(
        connection,
        publicKey
      );

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
