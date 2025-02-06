import { Section } from "@/components/Section/Section";
import styles from "./AboutScene.module.css";
import clsx from "classnames";

export const AboutScene = ({
  testID = "about",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <Section testID={testID} className={styles.frame}>
      <p className={styles.center}>
        Gain access to our exclusive club and member benefits by locking one or
        more $VIRGIN tokens to be eligible for this giveaway and more!
      </p>
      <h2 className={styles.center}>Plus many more weekly member giveaways</h2>

      <img
        src="/svg/test.svg"
        alt="instruction"
        width={"100%"}
        style={{ maxWidth: "640px", justifySelf: "center" }}
        className={styles.directive}
      />

      <div className={styles.options}>
        <h3 className="text-2xl">Join the club today for only 1 VIRGIN</h3>
        <p className="text-xl">OR</p>
        <h3 className="text-2xl">Become a Chad</h3>
      </div>

      <div className={clsx(styles.content, styles.center)}>
        <p>Membership not for you?</p>
        <p>
          Simply bag some VIRGIN tokens and profit from the demand of those that
          do.
        </p>
      </div>
    </Section>
  );
};
