import { PixelCell } from "@/elements/Buttons/PixelCell";
import styles from "./TokenTradeIn.module.css";
import { PixelButton } from "@/elements/Buttons/PixelButton";
import { useState } from "react";
import clsx from "classnames";
import { BlockLayout, InlineLayout } from "@/shared";

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
        <PixelCell>Shitcoin burned</PixelCell>
        <PixelCell>Confirming transaction</PixelCell>
        <PixelCell>Awaiting reward mint</PixelCell>
      </BlockLayout>
      <InlineLayout testID={`${testID}.actions`}>
        <PixelButton
          testID={`${testID}.dismiss`}
          variant="secondary"
          onClick={executeTradeIn}
        >
          Cancel
        </PixelButton>
        <PixelButton
          testID={`${testID}.confirm`}
          disabled={pending}
          onClick={executeTradeIn}
        >
          Trade-in
        </PixelButton>
      </InlineLayout>
    </div>
  );
};
