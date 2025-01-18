import { Button } from "@/elements";
import { useDevToggles } from "@/state/application/useDevToggles";
import styles from "./AccountScene.module.css";
import { useMembership } from "@/hooks/useMembership";
import { statusToString, tierToString } from "@/utils/tiers/formatters";
import { useClaimRewards } from "@/hooks/useClaimRewards";
import { useRecoilValue } from "recoil";
import { outstandingRewardsSelector } from "@/state/member/selectors";
import { outstandingRewardEpochsSelector } from "../../state/member/selectors";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";
import { MemberStatus } from "@/state/member/types";
import { EPOCH_DURATION } from "@/utils/locker/constants";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { TransactionItem } from "@/components/TransactionItem/TransactionItem";
import { Input } from "@/elements";
import { DEV_TransactionActions } from "@/components/DEV_TransactionActions/TransactionActions";

export const AccountScene = ({
  testID = "account",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { isEnabled, someEnabled } = useDevToggles();
  const { claim, pending } = useClaimRewards();
  const { updateStatus } = useUpdateStatus();
  const { member, publicKey } = useMembership();

  const outstandingRewards = useRecoilValue(
    outstandingRewardsSelector(publicKey)
  );

  const outstandingEpochs = useRecoilValue(
    outstandingRewardEpochsSelector(publicKey)
  );

  const selfExcludeMember = () => {
    updateStatus(MemberStatus.Excluded);
  };

  return (
    <div data-testid={testID} className={styles.frame}>
      <h1>Account</h1>
      {isEnabled("breakdown") && member && (
        <div data-testid={`${testID}.breakdown`}>
          <p>{tierToString(member.tier)}</p>
          <p>
            Member since {formatDistanceToNowStrict(member.timeCreated)} ago
          </p>
          <p>Entries accrued {member.totalEntries.toLocaleString()}</p>
          <p>Locked tokens {member.totalAmount.toLocaleString()} VIRGIN</p>
          {isEnabled("balance_details") && (
            <p>Matured tokens {member.totalMatured.toLocaleString()} VIRGIN</p>
          )}
          {isEnabled("balance_details") && (
            <p>Unlocked tokens {member.totalPending.toLocaleString()} VIRGIN</p>
          )}
          <p>
            Next reward{" "}
            {member.timeRewarded &&
              new Date(
                member.timeRewarded.getTime() + EPOCH_DURATION
              ).toLocaleString()}
          </p>
        </div>
      )}

      {isEnabled("transaction_actions") && (
        <DEV_TransactionActions testID={`${testID}.dev`} />
      )}

      <h2>Transaction backlog</h2>
      <p>
        {`Tokens are required to complete the subscription cycle of ${formatDistanceToNowStrict(Date.now() + EPOCH_DURATION)} in order to honour the benefits and rewards granted on them. This cooling period requires that token deposits must mature before they
        are eligible for withdraw, where they must complete the cycle before
        release.`}
      </p>
      <div className={styles.list}>
        <h4 className={styles.header}>Maturing today</h4>
        <ul className={styles.transactions}>
          {member?.slots.length === 0 ? (
            <div className={styles.empty}>
              Nah you're cool - there's no pending deposits or withdrawals
            </div>
          ) : (
            member?.slots.map((slot) => {
              return slot.type === "deposit" ? (
                <TransactionItem
                  key={slot.key}
                  testID={`${testID}.deposit`}
                  amount={slot.amount}
                  targetDate={slot.timeMatured}
                  startDate={slot.timeCreated}
                  onClaim={claim}
                />
              ) : (
                <TransactionItem
                  key={slot.key}
                  testID={`${testID}.withdraw`}
                  amount={slot.amount}
                  targetDate={slot.timeReleased}
                  onClaim={() => alert("Withdraw tokens back to wallet")}
                />
              );
            })
          )}
        </ul>
      </div>
      <div>
        <h2>Claim rewards</h2>
        <p>
          Next reward cycle{" "}
          {member?.timeRewarded &&
            new Date(
              member.timeRewarded.getTime() + EPOCH_DURATION
            ).toLocaleString()}
        </p>
        <p>Number of reward cycles {outstandingEpochs}</p>
        <p>Number of outstanding rewards {outstandingRewards}</p>
        <Button
          testID={`${testID}.claim`}
          size={"small"}
          disabled={pending || outstandingRewards === 0}
          onClick={claim}
        >
          Claim rewards
        </Button>
      </div>
      <div>
        <h2>Status</h2>
        {member && <p>Status {statusToString(member.status)}</p>}
        {isEnabled("self_exclude") && (
          <div>
            <h2>Problems with addiction?</h2>
            <p>
              If you're experiencing issues with addiction, we're here to help.
              Self-exclusion prevents your account from giveaway eligibility and
              ceases all entry rewards. This action is irreversible and you will
              not be able to restore your account once excluded.
            </p>
            <Button
              testID={`${testID}.exclude`}
              size={"small"}
              onClick={selfExcludeMember}
            >
              Self exclude
            </Button>
          </div>
        )}
      </div>
      {someEnabled("transactions", "events", "partners") && (
        <div className={styles.body}>
          <h3>Work in progress</h3>
          {isEnabled("transactions") && (
            <div>
              <p>
                Show the giveaways entered into. Feed life from entry to daily
                giveaway
              </p>
              <div>
                {["Daily Draw 2000 VIRGIN", "Daily Draw 5000 PEACH"].map(
                  (title) => (
                    <div key={title}>{title}</div>
                  )
                )}
              </div>
            </div>
          )}
          {isEnabled("events") && (
            <div>
              <h2>Special event</h2>
              <p>Special event details and stuff here</p>
            </div>
          )}
          <div>
            <h2>Sponsored bonus</h2>
            <p>Promotional bonus stuff</p>
          </div>
          {isEnabled("partners") && (
            <div>
              <h2>Partner offer #1</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
