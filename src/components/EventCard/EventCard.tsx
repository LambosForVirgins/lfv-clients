import { format } from "date-fns/format";
import styles from "./EventCard.module.css";
import { Tag } from "@/elements/Tags/Tag";
import clsx from "classnames";

type MediaRecord = {
  id: string;
  src: string;
  alt: string;
};

type LocationRecord = {
  id: string;
  city: string;
  country: string;
};

interface EventCardProps extends Common.ComponentProps {
  title: string;
  dateTime: Date;
  pricing: { currency: string; amount: number }[];
  media: MediaRecord[];
  location: LocationRecord;
  className?: string;
}

const TAGS = [
  "Almost full",
  "Opens soon",
  "Almost closed",
  "Sale ends soon",
  "Closed",
];

export const EventCard = ({ testID, ...props }: EventCardProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <span data-testid={`${testID}.gallery`} className={styles.gallery}>
        {props.media.map((media) => (
          <img
            data-testid={`${testID}.image`}
            src={media.src}
            alt={media.alt}
            className={styles.image}
          />
        ))}
      </span>

      <span className={styles.content}>
        <span data-testid={`${testID}.tags`} className={styles.tags}>
          <Tag
            testID={`${testID}.tag`}
            label={TAGS[Math.floor(Math.random() * (TAGS.length - 1))]}
          />
        </span>
        <h2 data-testid={`${testID}.title`} className={styles.title}>
          {props.title}
        </h2>
        <span data-testid={`${testID}.date`} className={styles.date}>
          <span>{format(props.dateTime, "do LLLL")}</span>
          <span>•</span>
          <span>{format(props.dateTime, "h:mm b")}</span>
        </span>
        <span
          data-testid={`${testID}.location`}
        >{`${props.location.city}, ${props.location.country}`}</span>
        <span>
          From{" "}
          {props.pricing.map(
            ({ amount, currency }) => `$${amount} ${currency}`
          )}
        </span>
      </span>
    </div>
  );
};
