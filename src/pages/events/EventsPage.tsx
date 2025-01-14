import styles from "./EventsPage.module.css";

export const EventsPage = ({
  testID = "events",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <h1>Events</h1>
    </div>
  );
};
