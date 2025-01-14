import { MemberStatus } from "@/state/member/types";
import { getClaimRewardsTransaction } from "@/utils/transactions/getClaimRewardsTransaction";
import { getUpdateStatusTransaction } from "@/utils/transactions/getUpdateStatusTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";

export const useUpdateStatus = () => {
  const { connection } = useConnection();
  const [pending, setPending] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  const updateStatus = useCallback(
    async (status: MemberStatus) => {
      if (!publicKey || pending) return;

      setPending(true);

      try {
        const transaction = await getUpdateStatusTransaction(
          connection,
          publicKey,
          status
        );

        const txHash = await sendTransaction(transaction, connection).catch(
          (err) => console.log("err", err)
        );

        if (!txHash) return;

        await connection.confirmTransaction(txHash, "finalized");
      } catch (error) {
        console.log("Error", error);
      } finally {
        setPending(false);
      }
    },
    [publicKey]
  );

  return { pending, updateStatus };
};
