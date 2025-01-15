import { Button } from "@/elements";
import { MembershipSell } from "@/components/MembershipSell/MembershipSell";
import { useCancelSubscription } from "@/hooks/useCancelSubscription";
import { UpgradeSlider } from "@/components/UpgradeSlider/UpgradeSlider";
import styles from "./SubscriptionScene.module.css";
import { useDevToggles } from "@/state/system/useDevToggles";

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
        <h2>Cancellation</h2>
        <p>No longer want to be a member?</p>
        <p>
          Cancelling your subscription unlocks your tokens for withdrawal after
          the next subscription cycle.
        </p>
        <p>
          You won't be rewarded with entries and will no longer have access to
          member benefits.
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
