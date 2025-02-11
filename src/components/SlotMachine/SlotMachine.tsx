import styles from "./SlotMachine.module.css";
import { SlotChannel } from "./SlotChannel";
import clsx from "classnames";

interface SlotMachineProps extends Common.ComponentProps {
  value: number;
  max?: number;
}

export const SlotMachine = ({
  testID,
  max = 10000,
  ...props
}: SlotMachineProps) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <div className={styles.lock} />
      <div className={styles.clamp} />

      <div className={styles.window}>
        {Array.from({ length: max.toString().length }).map((_, index) => (
          <SlotChannel
            key={`channel-${index}`}
            testID={`${testID}.channel`}
            groups={props.value}
          />
        ))}
        <span className={clsx(styles.pointer, styles.left)} />
        <span className={clsx(styles.pointer, styles.right)} />
      </div>

      <div className={styles.clamp} />
      <div className={styles.lock} />
    </div>
  );
};
