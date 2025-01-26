import { Section } from "@/components/Section/Section";
import { useMarketCap } from "@/state/marketCap";
import { ProgressIndicator } from "@/components/ProgressIndicator/ProgressIndicator";
import styles from "./LandingScene.module.css";
import { CreateAccount } from "@/components/CreateAccount/CreateAccount";
import { useDevToggles } from "@/state/application/useDevToggles";

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
        {isEnabled("market_cap") && (
          <ProgressIndicator
            testID={`${testID}.progress`}
            progress={marketCapDiluted / 100_000_000}
            label={`$${Math.floor(marketCapDiluted / 100_000) / 10} Million`}
          />
        )}
        <p style={{ textAlign: "center" }}>
          Gain access to our exclusive club and member benefits by locking one
          or more $VIRGIN tokens to be eligible for this giveaway and more!
        </p>
        <h2 style={{ textAlign: "center" }}>
          Plus many more weekly member giveaways
        </h2>
      </div>
      <img
        src="/svg/test.svg"
        alt="instruction"
        width={"100%"}
        style={{ maxWidth: "640px", justifySelf: "center" }}
        className={styles.directive}
      />
      <CreateAccount testID={`${testID}.create`} className={styles.content} />
      <div className={styles.options}>
        <h3 className="text-2xl">Join the club today for only 1 VIRGIN</h3>
        <p className="text-xl">OR</p>
        <h3 className="text-2xl">Become a Chad</h3>
      </div>
      <div className={styles.content} style={{ textAlign: "center" }}>
        <p>Membership not for you?</p>
        <p>
          Simply bag some VIRGIN tokens and profit from the demand of those that
          do.
        </p>
      </div>
    </Section>
  );
};
