import { Button } from "@/elements";
import { useDevToggles } from "@/state/application/useDevToggles";
import styles from "./AccountScene.module.css";
import { useMembership } from "@/hooks/useMembership";
import { tierToString } from "@/utils/tiers/formatters";
import { useClaimRewards } from "@/hooks/useClaimRewards";
import { useRecoilValue } from "recoil";
import { outstandingRewardsSelector } from "@/state/subscription/selectors";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";
import { MemberStatus } from "@/state/subscription/types";
import { EPOCH_DURATION } from "@/utils/locker/constants";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { TransactionItem } from "@/components/TransactionItem/TransactionItem";
import { DEV_TransactionActions } from "@/components/DEV_TransactionActions/TransactionActions";
import { useWithdrawTokens } from "@/hooks/useWithdrawTokens";
import { SubscriptionScene } from "../subscription/SubscriptionScene";

export const AccountScene = ({
  testID = "account",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { isEnabled, someEnabled } = useDevToggles();
  const { claim, pending } = useClaimRewards();
  const { updateStatus } = useUpdateStatus();
  const { member, publicKey } = useMembership();
  const { withdrawTokens } = useWithdrawTokens();

  const outstandingRewards = useRecoilValue(
    outstandingRewardsSelector(publicKey)
  );

  const selfExcludeMember = () => {
    updateStatus(MemberStatus.Excluded);
  };

  return (
    <div data-testid={testID} className={styles.frame}>
      <div className={styles.header}>
        <img
          alt="Virgin token"
          src="./images/lfv.png"
          width={64}
          style={{ backgroundColor: "transparent", borderRadius: "100vw" }}
        />
        <div>
          <p>{tierToString(member?.tier)}</p>
          {member?.timeCreated && (
            <p>
              Member since {formatDistanceToNowStrict(member.timeCreated)} ago
            </p>
          )}
        </div>
      </div>

      {isEnabled("breakdown") && member && (
        <div data-testid={`${testID}.breakdown`}>
          <p>Locked tokens {member.totalAmount.toLocaleString()} VIRGIN</p>
          {isEnabled("balance_details") && (
            <p>Matured tokens {member.totalMatured.toLocaleString()} VIRGIN</p>
          )}
          {isEnabled("balance_details") && (
            <p>
              Unlocked tokens {member.totalReleased.toLocaleString()} VIRGIN
            </p>
          )}
          {isEnabled("balance_details") && (
            <p>
              Unrealized rewards {member.totalRewards.toLocaleString()} ENTRY
            </p>
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
        are eligible for withdrawal, where they must complete the cycle before
        release.`}
      </p>
      <div className={styles.list}>
        <h4 className={styles.header}>{`Maturing ${formatDistanceToNowStrict(
          member?.slots[0]?.type === "deposit"
            ? member.slots[0].timeMatured
            : member?.slots[0]?.timeReleased || Date.now(),
          {
            addSuffix: true,
            unit: "day",
            roundingMethod: "floor",
          }
        )}`}</h4>
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
                  media={{
                    src: "svg/coin.svg",
                  }}
                  amount={slot.amount}
                  targetDate={slot.timeMatured}
                  startDate={slot.timeCreated}
                  action={{
                    label: "Claim",
                    onClick: claim,
                  }}
                />
              ) : (
                <TransactionItem
                  key={slot.key}
                  testID={`${testID}.withdraw`}
                  media={{
                    src: "images/lfv.png",
                  }}
                  amount={slot.amount}
                  targetDate={slot.timeReleased}
                  action={{
                    label: "Withdraw",
                    onClick: withdrawTokens,
                  }}
                />
              );
            })
          )}
        </ul>
      </div>
      <div>
        <h2>Outstanding rewards</h2>
        <p>{`You receive 1 entry for every 1000 tokens deposited, plus receive an additional entry every ${formatDistanceToNowStrict(Date.now() + EPOCH_DURATION)} for every 1000 matured tokens.`}</p>
        <p>
          Next reward cycle{" "}
          <strong>
            {member?.timeRewarded &&
              new Date(
                member.timeRewarded.getTime() + EPOCH_DURATION
              ).toLocaleDateString()}
          </strong>
        </p>
        <Button
          testID={`${testID}.claim`}
          size={"small"}
          disabled={pending || outstandingRewards === 0}
          onClick={claim}
        >
          Claim rewards
        </Button>
      </div>

      {isEnabled("tickets") && (
        <div>
          <h2>Tickets</h2>
          <p>Display the ticket NFT's here</p>
        </div>
      )}

      <SubscriptionScene testID={`${testID}.subscription`} />

      {someEnabled("events", "partners") && (
        <div className={styles.body}>
          {isEnabled("events") && (
            <div>
              <h2>Event invitations</h2>
              <p>Special event details and stuff here</p>
            </div>
          )}
          {isEnabled("partners") && (
            <div>
              <h2>Partner offers</h2>
              <p>
                Special offers from partners. This is another area for our
                partners to market to members
              </p>
            </div>
          )}
        </div>
      )}

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
  );
};
