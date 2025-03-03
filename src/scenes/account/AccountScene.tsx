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
import { isToday } from "date-fns/isToday";
import { TransactionItem } from "@/components/TransactionItem/TransactionItem";
import { useWithdrawTokens } from "@/hooks/useWithdrawTokens";
import { SubscriptionScene } from "../subscription/SubscriptionScene";
import { format } from "date-fns/format";
import { Overview } from "@/components/Overview/Overview";
import { overviewItemsAtom } from "@/state/account/selectors";
import { MilestoneProgress } from "@/components/MilestoneProgress/MilestoneProgress";
import { MemberHeader } from "@/components/AccountHeader/MemberHeader";

export const AccountScene = ({
  testID = "account",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { isEnabled, someEnabled } = useDevToggles();
  const { claim, pending } = useClaimRewards();
  const { updateStatus } = useUpdateStatus();
  const { member, transactions } = useMembership();
  const overviewItems = useRecoilValue(overviewItemsAtom);

  const { withdrawTokens } = useWithdrawTokens();

  const outstandingRewards = useRecoilValue(outstandingRewardsSelector);

  const selfExcludeMember = () => {
    updateStatus(MemberStatus.Excluded);
  };

  return (
    <div data-testid={testID} className={styles.frame}>
      <MemberHeader testID={`${testID}.header`} member={member} />

      <h2>Overview</h2>
      <Overview testID={`${testID}.overview`} items={overviewItems} />

      <h2>Staking timeline</h2>
      <p>
        {`Tokens are required to complete the subscription cycle of ${formatDistanceToNowStrict(Date.now() + EPOCH_DURATION)} in order to honour the benefits and rewards granted to them. This cooling period requires that token deposits must mature before they
        are eligible for withdrawal, where they must complete the cycle before
        release.`}
      </p>

      {Object.entries(transactions).map(([date, group]) => {
        return (
          <div className={styles.list}>
            <h4 className={styles.header}>{`Maturing ${
              isToday(date)
                ? "today"
                : formatDistanceToNowStrict(date, {
                    addSuffix: true,
                    unit: "day",
                    roundingMethod: "floor",
                  })
            }`}</h4>
            <ul className={styles.transactions}>
              {member?.slots.length === 0 ? (
                <div className={styles.empty}>
                  Nah you're cool - there's no pending deposits or withdrawals
                </div>
              ) : (
                group.map((slot) => {
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
        );
      })}

      {isEnabled("withdrawV2") && (
        <MilestoneProgress testID={`${testID}.releases`} progress={0.3} />
      )}

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
