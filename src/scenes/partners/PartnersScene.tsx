import styles from "./PartnersScene.module.css";

export const PartnersScene = ({
  testID = "partners",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <h1>Partnerships</h1>
      <p>
        Promotional raffles are marketing tools used by businesses to increase
        engagement, brand awareness, or customer loyalty. Among the many
        benefits of LFV membership is the free entries members enjoy into
        promotional giveaways supported by partner organizations and the
        giveaway fund. These giveaways are used to further promote partner
        organizations and community growth while giving back to our valuable
        community.
      </p>
      <h2>How Promotional Giveaways Work</h2>
      <ol>
        <li>Partners define the goal of the promotion.</li>
        <li>
          Eligibility criteria is determined to match the goals with the
          audience.
        </li>
        <li>Giveaways are selected based on the goals and audience.</li>
      </ol>
    </div>
  );
};
