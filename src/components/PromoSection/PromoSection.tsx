import styles from "./PromoSection.module.css";

import clsx from "classnames";

interface PromoSectionProps extends Common.ComponentProps {
  className?: string;
}

export const PromoSection = ({ testID, ...props }: PromoSectionProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <div className="relative col-content" style={{ height: 60 }}>
        {/* <img
          src={"/images/banner.png"}
          alt={"banner"}
          height={120}
          className="justify-self-center absolute"
          style={{ top: -100, right: 0, maxWidth: "100%" }}
        /> */}
      </div>
    </div>
  );
};
