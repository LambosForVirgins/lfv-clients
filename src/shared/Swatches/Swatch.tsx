import styles from "./Swatches.module.css";

interface SwatchProps extends Partial<Common.ComponentProps> {
  label: string;
  code: string;
}

export const Swatch = ({ testID = "swatch", ...props }: SwatchProps) => {
  return (
    <div className={styles.swatch}>
      <div className={styles.color} style={{ backgroundColor: props.code }} />
      <div className={styles.details}>
        <div data-testid={`${testID}.label`}>{props.label}</div>
        <div data-testid={`${testID}.code`}>{props.code}</div>
      </div>
    </div>
  );
};
