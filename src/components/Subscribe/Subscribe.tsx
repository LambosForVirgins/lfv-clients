import styles from "./Subscribe.module.css";
import clsx from "classnames";

interface SubscribeProps extends Common.ComponentProps {
  className?: string;
}

export const Subscribe = ({ testID, ...props }: SubscribeProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <div className={styles.content}>
        <p>Virgins need Lambos</p>
        <a href="">Spread the word and help fight population decline</a>
      </div>
    </div>
  );
};
