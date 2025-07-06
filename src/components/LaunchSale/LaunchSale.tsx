import styles from "./LaunchSale.module.css";
import { useState } from "react";
import clsx from "classnames";
import { InlineLayout, Button } from "~/elements";

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
        <Button
          testID={`${testID}.confirm`}
          size={"small"}
          disabled={pending}
          onClick={executeTradeIn}
        >
          Buy
        </Button>
      </InlineLayout>
    </div>
  );
};
