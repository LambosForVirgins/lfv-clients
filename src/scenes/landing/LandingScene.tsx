import { Section } from "@/components/Section/Section";
import styles from "./LandingScene.module.css";
import { CommandPrompter } from "@/scenes/prompter/CommandPrompter";
import { Button } from "@/elements";
import { MINT } from "@/utils/locker/constants";
import { ContractAddress } from "@/elements/ContractAddress/ContractAddress";

export const LandingScene = ({
  testID = "landing",
}: Readonly<Partial<Common.ComponentProps>>) => {
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

        <ContractAddress
          testID={`${testID}.mint`}
          label={"CA"}
          mint={MINT.toBase58()}
        />

        <Button testID={`${testID}.connect`} className={styles.button}>
          Connect wallet
        </Button>
      </div>

      <CommandPrompter />
    </Section>
  );
};
