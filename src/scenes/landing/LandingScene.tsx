import { Section } from "@/components/Section/Section";
import { useMarketCap } from "@/state/marketCap";
import { ProgressIndicator } from "@/components/ProgressIndicator/ProgressIndicator";
import styles from "./LandingScene.module.css";
import { useDevToggles } from "@/state/application/useDevToggles";
import { CommandPrompter } from "@/scenes/prompter/CommandPrompter";

export const LandingScene = ({
  testID = "landing",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { isEnabled } = useDevToggles();
  const { marketCapDiluted } = useMarketCap();

  return (
    <Section testID="membership" id={"membership"}>
      <div className={styles.frame}>
        <div className={styles.banner}>
          <img
            src={"/images/logo-stamp.png"}
            alt={`VIRGIN stamp logo`}
            width={400}
            style={{ maxWidth: "100%" }}
          />
          <img
            src={"/images/banner.png"}
            alt={"banner"}
            width={618}
            style={{ maxWidth: "100%" }}
          />
        </div>
        <h1 className={styles.title}>
          {`We're celebrating $100 million market cap with a Lambo giveaway!`}
        </h1>
      </div>

      <CommandPrompter />
    </Section>
  );
};
