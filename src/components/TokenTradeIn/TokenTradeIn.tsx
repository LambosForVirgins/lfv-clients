import { Cell } from "~/elements/Cell/Cell";
import styles from "./TokenTradeIn.module.css";
import { Button } from "~/elements/Buttons/Button";
import { useState } from "react";
import clsx from "classnames";
import { BlockLayout, InlineLayout } from "~/elements";

interface TokenTradeInProps extends Common.ComponentProps {
  className?: string;
}

export const TokenTradeIn = ({ testID, ...props }: TokenTradeInProps) => {
  const [pending, setPending] = useState(false);

  const executeTradeIn = async () => {
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPending(false);
  };

  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <h1 data-testid={`${testID}.title`}>Shitcoin Exchange</h1>
      <p data-testid={`${testID}.description`}>
        Still hodling your bag of worthless Solana meme coins? Now you can swap
        any token for a chance to win real prizes!
      </p>
      <BlockLayout testID={`${testID}.list`}>
        <Cell>Shitcoin burned</Cell>
        <Cell>Confirming transaction</Cell>
        <Cell>Awaiting reward mint</Cell>
      </BlockLayout>
      <InlineLayout testID={`${testID}.actions`}>
        <Button
          testID={`${testID}.dismiss`}
          variant="secondary"
          onClick={executeTradeIn}
        >
          Cancel
        </Button>
        <Button
          testID={`${testID}.confirm`}
          disabled={pending}
          onClick={executeTradeIn}
        >
          Trade-in
        </Button>
      </InlineLayout>
    </div>
  );
};
