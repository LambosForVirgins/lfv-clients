import { forwardRef } from "react";
import styles from "./Section.module.css";
import clsx from "classnames";

interface SectionProps
  extends Common.ComponentProps,
    React.HTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export const Section = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<SectionProps>
>(({ testID, children, ...props }, ref) => {
  return (
    <section
      ref={ref}
      {...props}
      data-testid={testID}
      className={clsx(props.className, styles.frame)}
    >
      {children}
    </section>
  );
});
