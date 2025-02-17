import styles from "./Tag.module.css";
import clsx from "classnames";

interface TagProps extends Common.ComponentProps {
  label: string;
  color?: "red" | "green" | "blue" | "yellow";
}

export const Tag = ({ testID, color = "red", ...props }: TagProps) => {
  return (
    <small data-testid={testID} className={clsx(styles.frame, styles[color])}>
      {props.label}
    </small>
  );
};
