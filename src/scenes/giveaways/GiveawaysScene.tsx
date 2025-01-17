import { GiveawayCard } from "@/components/GiveawayCard/GiveawayCard";

import { useGiveaways } from "@/state/giveaways/useGiveaways";
import styles from "./GiveawaysScene.module.css";
import { useMembership } from "@/hooks/useMembership";
import { DailyEntrySlider } from "@/components/DailyEntrySlider/DailyEntrySlider";
import { useDevToggles } from "@/state/application/useDevToggles";

const HEADLINES = [
  "Daily Giveaway!",
  "Win 1000 to 10,000 VIRGIN every day!",
  "Wake up to 1000 to 10,000 more $VIRGIN!",
  "How does waking up to 1000 to 10,000 more $VIRGIN sound?",
];

const SUBTITLES = [
  "1000 to 10,000 VIRGIN rewarded every day",
  "You could wake up with 1000 to 10,000 VIRGIN",
  "Test your virginity with our daily virgin rewards",
  "Test your virginity with our daily giveaways",
  "Enjoy your virginity with our daily giveaways",
];

export const GiveawaysScene = ({
  testID = "giveaways",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { giveaways, currentDraw } = useGiveaways();
  const { member } = useMembership();
  const { isEnabled } = useDevToggles();

  return (
    <div data-testid={testID} className={styles.frame}>
      <div data-testid={`${testID}.banner`} className={styles.banner}>
        <div data-testid={`${testID}.promo`} className={styles.promo}>
          <h2 data-testid={`${testID}.title`} className={styles.title}>
            <mark>{HEADLINES[0]}</mark>
          </h2>
          <h2>{"Fill your VIRGIN pockets"}</h2>
          <h3 data-testid={`${testID}.subtitle`} className={styles.subtitle}>
            {SUBTITLES[0]}
          </h3>
          <DailyEntrySlider testID={`${testID}.daily`} />
          <p
            data-testid={`${testID}.description`}
            className={styles.description}
          >
            ~ Drawn next day ~
          </p>
        </div>
      </div>

      <div data-testid={`${testID}.collection`} className={styles.collection}>
        {giveaways.map((promo) => (
          <GiveawayCard
            key={promo.id}
            testID={`${testID}.reward`}
            giveawayId={promo.id}
            label={promo.title}
            description={promo.description}
            memberBalance={member?.totalAmount}
            constraints={promo.constraints}
          />
        ))}
      </div>
      {isEnabled("previous_giveaways") && (
        <div>
          <h2>Previous Giveaways</h2>
        </div>
      )}
    </div>
  );
};
