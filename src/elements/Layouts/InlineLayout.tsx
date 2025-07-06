import styles from "./Layouts.module.css";
import clsx from "classnames";

interface InlineLayoutProps extends Common.ComponentProps {
  padded?: boolean;
}

export const InlineLayout = ({
  children,
  ...props
}: React.PropsWithChildren<InlineLayoutProps>) => {
  return (
    <div className={clsx(styles.inline, props.padded && styles.padded)}>
      {children}
    </div>
  );
};
