import styles from "./Backdrop.module.css";
import clsx from "classnames";

interface BackdropProps {
  className?: string;
  shade?: "red" | "green";
}

export const Backdrop = ({
  children,
  ...props
}: React.PropsWithChildren<BackdropProps>) => {
  return (
    <div
      className={clsx(
        props.className,
        styles.frame,
        props.shade && styles[props.shade]
      )}
    >
      {children}
    </div>
  );
};
