import { Button, Input } from "@/elements";
import { useTokenTransfer } from "@/hooks/useTransferTokens";
import { useState } from "react";

export const DEV_TransactionActions = ({ testID }: Common.ComponentProps) => {
  const [amount, setAmount] = useState<number>(0);
  const { depositTokens, releaseTokens } = useTokenTransfer();

  const handleDeposit = () => {
    depositTokens(amount).then(() => setAmount(0));
  };

  const handleWithdraw = () => {
    releaseTokens(amount).then(() => setAmount(0));
  };

  return (
    <div data-testid={testID}>
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
          <Input
            type="number"
            value={amount}
            onChange={({ target }) => setAmount(+target.value)}
          />
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
