import styles from "./Disclaimers.module.css";
import clsx from "classnames";

interface DisclaimersProps extends Common.ComponentProps {
  className?: string;
}

const DISCLAIMERS = [
  `The LambosForVirgins meme is intended to function as an expression of support for, and engagement with, the programs associated with and beliefs embodied by the symbol "$VIRGIN" and its associated artwork, and are not intended to be, or to be the subject of, an investment opportunity, investment contract, or security of any type.`,
];

export const Disclaimers = ({ testID, ...props }: DisclaimersProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <span className={styles.content}>
        {DISCLAIMERS.map((disclaimer) => (
          <small>{disclaimer}</small>
        ))}
      </span>
    </div>
  );
};
