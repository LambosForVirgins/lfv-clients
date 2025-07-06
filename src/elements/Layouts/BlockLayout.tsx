import styles from "./Layouts.module.css";
import clsx from "classnames";

interface BlockLayoutProps extends Common.ComponentProps {
  padded?: boolean;
}

export const BlockLayout = ({
  children,
  ...props
}: React.PropsWithChildren<BlockLayoutProps>) => {
  return (
    <div className={clsx(styles.block, props.padded && styles.padded)}>
      {children}
    </div>
  );
};
