import { Button } from "@/elements";
import { MembershipSell } from "@/components/MembershipSell/MembershipSell";
import { useCancelSubscription } from "@/hooks/useCancelSubscription";
import { UpgradeSlider } from "@/components/UpgradeSlider/UpgradeSlider";
import styles from "./SubscriptionScene.module.css";
import { useDevToggles } from "@/state/application/useDevToggles";

export const SubscriptionScene = ({
  testID = "subscription",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { cancelSubscription } = useCancelSubscription();
  const { isEnabled } = useDevToggles();

  const presentCancellationConfirmation = () => {
    // TODO: Redirect or display a cancel confirmation modal
    cancelSubscription();
  };

  return (
    <div data-testid={testID} className={styles.frame}>
      <h1 data-testid={`${testID}.header`}>Manage Subscription</h1>
      {isEnabled("subscription_slider") && (
        <UpgradeSlider
          testID={`${testID}.upgrade`}
          currentBalance={2_000_000}
        />
      )}
      <MembershipSell testID={`${testID}.promo`} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3>Membership not for you?</h3>
        <p>
          Cancelling your subscription unlocks your tokens for withdrawal after
          the next subscription cycle. You will no longer be rewarded with
          entries and will lose access to member benefits after the next
          subscription cycle.
        </p>
        <Button
          testID={`${testID}.cancel`}
          onClick={presentCancellationConfirmation}
        >
          Cancel my subscription
        </Button>
      </div>
    </div>
  );
};
