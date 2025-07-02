import { PixelCell } from "@/elements/Buttons/PixelCell";
import styles from "./LaunchSale.module.css";
import { PixelButton } from "@/elements/Buttons/PixelButton";
import { useState } from "react";
import clsx from "classnames";
import { BlockLayout, InlineLayout } from "@/shared";

interface LaunchSaleProps extends Common.ComponentProps {
  className?: string;
}

export const LaunchSale = ({ testID, ...props }: LaunchSaleProps) => {
  const [pending, setPending] = useState(false);

  const executeTradeIn = async () => {
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPending(false);
  };

  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <h1 data-testid={`${testID}.title`}>Launch Sale</h1>
      <p data-testid={`${testID}.description`}>
        Get in before the price goes up!
      </p>

      <InlineLayout testID={`${testID}.actions`}>
        <input type="number" defaultValue={0} />
        <PixelButton
          testID={`${testID}.confirm`}
          size={"small"}
          disabled={pending}
          onClick={executeTradeIn}
        >
          Buy
        </PixelButton>
      </InlineLayout>
    </div>
  );
};
