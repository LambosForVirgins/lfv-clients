import styles from "./SlotCollection.module.css";

type EmptySlot = {
  type: string;
  media?: {
    img: string;
  };
  label?: string | number;
};

type Slot = {
  type: string;
  media: {
    img: string;
  };
  label: string | number;
};

interface SlotCollectionProps extends Common.ComponentProps {
  slots: (Slot | EmptySlot)[];
}

export const SlotCollection = ({ testID, ...props }: SlotCollectionProps) => {
  return (
    <span data-testid={testID} className={styles.frame}>
      {props.slots.map((slot, index) => (
        <span
          data-testid={`${testID}.slot`}
          key={`slot-${index}`}
          className={styles.slot}
        >
          <span data-testid={`${testID}.media`} className={styles.media}>
            {slot.media && (
              <img
                data-testid={`${testID}.image`}
                className={styles.image}
                src={"./svg/coin.svg"}
              />
            )}
          </span>
          {slot.label && (
            <span data-testid={`${testID}.label`} className={styles.label}>
              <img
                data-testid={`${testID}.icon`}
                className={styles.icon}
                src={"./svg/lightning.svg"}
              />
              <span data-testid={`${testID}.text`}>{slot.label}</span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
};
