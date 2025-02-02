import { Button } from "@/elements";
import styles from "./DownloadScene.module.css";

export const DownloadScene = ({
  testID = "subscription",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const redirectToExtensions = () => {};

  return (
    <div data-testid={testID} className={styles.frame}>
      <h1 data-testid={`${testID}.header`}>Downloads</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3>Partner Rewards Extension</h3>
        <p>
          Add the free Partner Rewards Extension to your browser to start
          claiming rewards.
        </p>
        <Button
          testID={`${testID}.cancel`}
          size={"small"}
          onClick={redirectToExtensions}
        >
          Add to chrome
        </Button>
      </div>
    </div>
  );
};
