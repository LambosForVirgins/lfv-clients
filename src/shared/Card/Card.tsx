import styles from "./Card.module.css";
import clsx from "classnames";

interface CardProps extends Common.ComponentProps {
  className?: string;
  padded?: boolean;
  elevated?: boolean;
}

export const Card = ({
  children,
  ...props
}: React.PropsWithChildren<CardProps>) => {
  return (
    <div
      className={clsx(
        props.className,
        styles.frame,
        props.padded && styles.padded,
        props.elevated && styles.elevated
      )}
    >
      {children}
    </div>
  );
};
