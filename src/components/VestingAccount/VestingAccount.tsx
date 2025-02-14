import { vestingAccountSelector } from "@/state/treasury/selectors";
import { useRecoilValue } from "recoil";
import { CircularProgress } from "../CircularIndicator/CircularIndicator";
import { Button } from "@/elements";
import { VestingStatus } from "@/state/treasury/types";
import styles from "./VestingAccount.module.css";
import { useParams } from "react-router";
import { useEffect, useRef } from "react";

export const VestingAccount = ({
  testID = "vesting",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const params = useParams<{ publicKey: string }>();
  const details = useRecoilValue(vestingAccountSelector(params.publicKey));

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog data-testid={testID} ref={dialogRef} className={styles.frame}>
      {details && (
        <div key={details.destinationAddress} className={styles.card}>
          <div>
            <CircularProgress
              testID={`${testID}.progress`}
              percentage={
                details.schedules.reduce((sum, { status }) => {
                  return sum + (status === VestingStatus.Completed ? 1 : 0);
                }, 0) / details.schedules.length
              }
            />
            <h3 style={{ overflow: "hidden", textWrap: "wrap" }}>
              {details.destinationAddress}
            </h3>
          </div>
          <ul data-testid={`${testID}.schedules`} className={styles.list}>
            {details.schedules.map((vesting) => (
              <li key={vesting.key} className={styles.row}>
                <span>{vesting.releaseTime.toLocaleDateString()}</span>
                <span>{Math.floor(vesting.amount)}</span>
                {vesting.status === VestingStatus.Completed ? (
                  <span>Released</span>
                ) : (
                  <Button
                    testID={`${testID}.action`}
                    size="small"
                    disabled={vesting.status !== VestingStatus.Pending}
                  >
                    {vesting.status === VestingStatus.Pending
                      ? "Claim"
                      : "Pending"}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </dialog>
  );
};
