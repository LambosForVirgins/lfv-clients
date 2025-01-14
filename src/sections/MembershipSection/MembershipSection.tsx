import { Section } from "@/components/Section/Section";
import { MembershipSell } from "@/components/MembershipSell/MembershipSell";
import { useMarketCap } from "@/state/marketCap";
import { ProgressIndicator } from "@/components/ProgressIndicator/ProgressIndicator";
import styles from "./MembershipSection.module.css";

const steps = [
  {
    label: "Connect your wallet",
  },
  {
    label: "Hold 1 or more VIRGIN tokens",
  },
  {
    label: "Access the members area",
  },
];

export const MembershipSection = ({
  testID = "membership",
}: Readonly<Partial<Common.ComponentProps>>) => {
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
        <ProgressIndicator
          testID={`${testID}.progress`}
          progress={marketCapDiluted / 100_000_000}
          label={`$${Math.floor(marketCapDiluted / 100_000) / 10} Million`}
        />
        <p>
          Gain access to our exclusive club and member benefits by locking one
          or more $VIRGIN tokens to be eligible for this giveaway and more!
        </p>
        <h2>Plus many more weekly member giveaways</h2>
      </div>
      <img
        src="/svg/test.svg"
        alt="instruction"
        width={"100%"}
        style={{ maxWidth: "640px", justifySelf: "center" }}
        className={styles.directive}
      />
      {/* <div className={styles.directive}>
        <span className={styles.arrow} data-attr={"right"} />
        <div data-attr={"buy"}>
          <h4 className={styles.title}>Buy</h4>
          <span className={styles.equation}>
            <p>More tokens</p>
            <p style={{ transform: "scale(1.5)" }}>=</p>
            <p>Greater benefits</p>
          </span>
        </div>
        <div data-attr={"lock"}>
          <h4 className={styles.title}>Lock</h4>
          <span className={styles.equation}>
            <p>More time</p>
            <p style={{ transform: "scale(1.5)" }}>=</p>
            <p>More rewards</p>
          </span>
        </div>
        <span className={styles.arrow} data-attr={"left"} />
      </div> */}
      <div className={styles.options}>
        <h3 className="text-2xl">Join the club today for only 1 VIRGIN</h3>
        <p className="text-xl">OR</p>
        <h3 className="text-2xl">Become a Chad</h3>
      </div>
      <MembershipSell testID={`${testID}.promo`} />
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
