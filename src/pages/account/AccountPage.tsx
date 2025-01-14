import { Button } from "@/elements";
import { useDevToggles } from "@/state/system/useDevToggles";
import styles from "./AccountPage.module.css";
import { useMembership } from "@/hooks/useMembership";
import { lamportsToMint } from "@/utils/locker/constants";
import { statusToString, tierToString } from "@/utils/tiers/formatters";
import { useClaimRewards } from "@/hooks/useClaimRewards";
import { useRecoilValue } from "recoil";
import { outstandingRewardsSelector } from "@/state/member/selectors";
import { outstandingRewardEpochsSelector } from "../../state/member/selectors";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";
import { MemberStatus } from "@/state/member/types";

const EPOCH_DURATION = 3000;

export const AccountPage = ({
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
          <h2>All about your membership here</h2>
          <p>Tier {tierToString(member.tier)}</p>
          <p>Entries accrued {member.totalVouchers.toNumber()}</p>
          <p>
            Locked tokens {lamportsToMint(member.totalAmount).toNumber()} VIRGIN
          </p>
          <p>
            Matured tokens {lamportsToMint(member.totalMatured).toNumber()}{" "}
            VIRGIN
          </p>
          <p>
            Unlocked tokens {lamportsToMint(member.totalLiquidity).toNumber()}{" "}
            VIRGIN
          </p>
          <p>
            Next unlock{" "}
            {new Date(
              member.timeRewarded.toNumber() * 1000 + EPOCH_DURATION
            ).toLocaleString()}
          </p>
        </div>
      )}
      <div>
        <h2>Claim rewards</h2>
        <p>
          Next reward cycle{" "}
          {member &&
            new Date(
              member.timeRewarded.toNumber() * 1000 + EPOCH_DURATION
            ).toLocaleString()}
        </p>
        <p>Number of reward cycles {outstandingEpochs}</p>
        <p>Number of outstanding rewards {outstandingRewards}</p>
        <Button testID={`${testID}.claim`} disabled={pending} onClick={claim}>
          Claim
        </Button>
      </div>
      <div>
        <h2>Status</h2>
        {member && <p>Status {statusToString(member.status)}</p>}
        <h3>Self exclusion</h3>
        <Button testID={`${testID}.exclude`} onClick={selfExcludeMember}>
          Exclude
        </Button>
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
