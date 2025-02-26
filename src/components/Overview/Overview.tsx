import styles from "./Overview.module.css";

type OverviewItem = {
  key: string;
  media: { src: string };
  value: number;
  label: string;
};

interface OverviewProps extends Common.ComponentProps {
  items: OverviewItem[];
  className?: string;
}

export const Overview = ({ testID, ...props }: OverviewProps) => {
  return (
    <span data-testid={testID} className={styles.frame}>
      {props.items.map((item) => (
        <span
          data-testid={`${testID}.container`}
          key={item.key}
          className={styles.box}
        >
          <img
            data-testid={`${testID}.image`}
            alt="VIRGIN"
            src={item.media.src}
            style={{ borderRadius: "100vw" }}
          />
          <h4>{item.value.toLocaleString()}</h4>
          <p>{item.label}</p>
        </span>
      ))}
    </span>
  );
};
