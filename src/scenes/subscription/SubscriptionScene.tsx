import { Button } from "@/elements";
import { useCancelSubscription } from "@/hooks/useCancelSubscription";
import styles from "./SubscriptionScene.module.css";
import clsx from "classnames";
import { SubscriptionOption } from "@/components/SubscriptionOption/SubscriptionOption";
import { useMembership } from "@/hooks/useMembership";
import { useSubscription } from "@/hooks/useSubscription";
import { subscriptionOptionsAtom } from "@/state/subscription/atoms";
import { useRecoilValue } from "recoil";
import { useCallback, useEffect, useState } from "react";
import { TierSlider } from "@/components/TierSlider/TierSlider";
import { useTokenMint } from "@/hooks/useTokenMint";
import { hasMaturingTokens } from "@/utils/membership/hasMaturingTokens";

export const SubscriptionScene = ({
  testID = "subscription",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { cancelSubscription } = useCancelSubscription();
  const { tier, updateTier } = useSubscription();
  const { member } = useMembership();
  const { balance = 0 } = useTokenMint();
  const packages = useRecoilValue(subscriptionOptionsAtom);
  const [amount, setAmount] = useState<number>(0);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const maximumAmount = balance - (member?.totalAmount || 0);

  useEffect(() => {
    const loadAnimation = async () => {
      const data = await import("../../../public/lottie/evolution.json");
      setAnimationData(data.default || data);
    };

    loadAnimation();
  }, []);

  const commitChanges = useCallback(
    () => updateTier(amount),
    [amount, updateTier]
  );

  const presentCancellationConfirmation = () => {
    // TODO: Redirect or display a cancel confirmation modal
    cancelSubscription();
  };

  const setMaximumDeposit = () => setAmount(maximumAmount);

  return (
    <div data-testid={testID} className={styles.frame}>
      <h2>Subscription</h2>

      <div data-testid={`${testID}.header`} className={styles.header}>
        <h3 data-testid={`${testID}.title`} className={styles.title}>
          Set your amount
        </h3>
        <h4 data-testid={`${testID}.subtitle`} className={styles.subtitle}>
          {amount.toLocaleString()} VIRGINS
        </h4>
        <Button
          testID={`${testID}.maximum`}
          size={"small"}
          onClick={setMaximumDeposit}
        >
          {`Max`}
        </Button>
      </div>

      {animationData && (
        <TierSlider
          testID={`${testID}.slider`}
          value={amount}
          onChange={setAmount}
          step={10_000}
          min={0}
          max={5_000_000}
          animationData={animationData}
        />
      )}

      <div
        data-testid={`${testID}.collection`}
        className={clsx(styles.options, styles.collection)}
      >
        {packages.map((product, idx) => {
          const lockedAmount = member?.totalAmount || 0;
          const remainingAmount = product.amount - lockedAmount;

          return (
            <SubscriptionOption
              key={`${product.tier}.${idx}`}
              testID={`${testID}.package`}
              name={"tier"}
              title={product.title}
              amount={product.amount}
              amountRemaining={remainingAmount}
              benefits={product.benefits}
              onClick={setAmount}
              applied={tier === product.tier}
              selected={amount === remainingAmount}
              highlight={product.highlight}
              disabled={!member || remainingAmount > balance}
            />
          );
        })}
      </div>

      <Button testID={`${testID}.submit`} onClick={commitChanges}>
        {`Update subscription`}
      </Button>

      <div
        data-testid={`${testID}.cancellation`}
        className={styles.cancellation}
      >
        <h2 data-testid={`${testID}.title`}>Membership not for you?</h2>
        <p data-testid={`${testID}.description`}>
          Cancelling your subscription unlocks your tokens for withdrawal after
          the next subscription cycle. You will no longer be rewarded with
          entries and will lose access to member benefits after the next
          subscription cycle.
        </p>
        <Button
          testID={`${testID}.cancel`}
          onClick={presentCancellationConfirmation}
          disabled={hasMaturingTokens(member)}
        >
          Cancel my subscription
        </Button>
        {hasMaturingTokens(member) && (
          <small data-testid={`${testID}.warning`} className={styles.warning}>
            You must wait until all pending deposits have matured before
            cancelling your membership subscription.
          </small>
        )}
      </div>
    </div>
  );
};
