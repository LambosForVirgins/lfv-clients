import { Button, Input } from "@/elements";
import { useDepositTokens } from "@/hooks/useTransferTokens";
import { useState } from "react";

export const DEV_TransactionActions = ({ testID }: Common.ComponentProps) => {
  const [amount, setAmount] = useState<number>(0);
  const { depositTokens, withdrawTokens } = useDepositTokens();

  const handleDeposit = () => {
    depositTokens(amount);
  };

  const handleWithdraw = () => {
    withdrawTokens(amount);
  };

  return (
    <div>
      <h2>Development transactions</h2>
      <p>Force any size transaction for testing purposes only.</p>
      <div>
        <div>
          <Button
            testID={`${testID}.deposit`}
            size={"small"}
            disabled={amount <= 0}
            onClick={handleDeposit}
          >
            Deposit
          </Button>
          <Input onChange={({ target }) => setAmount(+target.value)} />
          <Button
            testID={`${testID}.withdraw`}
            size={"small"}
            disabled={amount <= 0}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};
