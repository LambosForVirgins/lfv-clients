import styles from "./EventsScene.module.css";

export const EventsScene = ({
  testID = "events",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <h1>Events</h1>

      <h2>Upcoming</h2>

      <h2>Invitations</h2>
    </div>
  );
};
