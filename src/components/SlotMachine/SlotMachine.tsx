import styles from "./SlotMachine.module.css";
import { SlotChannel } from "./SlotChannel";
import clsx from "classnames";

interface SlotMachineProps extends Common.ComponentProps {
  selected: number;
}

export const SlotMachine = ({ testID, ...props }: SlotMachineProps) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <div className={styles.lock} />
      <div className={styles.clamp} />

      <div className={styles.window}>
        <SlotChannel testID={`${testID}.channel`} groups={props.selected} />
        <SlotChannel testID={`${testID}.channel`} groups={props.selected} />
        <SlotChannel testID={`${testID}.channel`} groups={props.selected} />
        <SlotChannel testID={`${testID}.channel`} groups={props.selected} />
        <SlotChannel testID={`${testID}.channel`} groups={props.selected} />
        <span className={clsx(styles.pointer, styles.left)} />
        <span className={clsx(styles.pointer, styles.right)} />
      </div>

      <div className={styles.clamp} />
      <div className={styles.lock} />
    </div>
  );
};
