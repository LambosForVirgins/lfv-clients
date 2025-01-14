import styles from "./PromoSection.module.css";

import clsx from "classnames";

interface PromoSectionProps extends Common.ComponentProps {
  className?: string;
}

export const PromoSection = ({ testID, ...props }: PromoSectionProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <div className={styles.content}>
        {/* <img
          src={"/images/banner.png"}
          alt={"banner"}
          height={120}
          className="justify-self-center absolute"
          style={{ bottom: 0, right: 0, maxWidth: "100%" }}
        /> */}
      </div>
    </div>
  );
};
