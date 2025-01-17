import styles from "./GiveawayCard.module.css";
import clsx from "classnames";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";

import { getProgressFromBalance } from "@/utils/membership/getProgressFromBalance";
import { validateEntryCriteria } from "@/utils/entry-criteria/validateEntryCriteria";
import { useNavigate } from "react-router";
import { Button } from "@/elements";
import { ButtonVariant } from "@/elements/Buttons/Button";
import { useDepositTokens } from "@/hooks/useTransferTokens";
import { useCallback, useState } from "react";

interface RewardCardProps extends Common.ComponentProps {
  giveawayId: string;
  label: string;
  description?: string | null;
  constraints?: { minBalance?: number; maxBalance?: number };
  memberBalance?: number;
  onClick?: () => void;
}

type Action = {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick: () => void;
};

export const GiveawayCard = ({
  testID,
  constraints,
  memberBalance = 0,
  ...props
}: RewardCardProps) => {
  const { errors } = validateEntryCriteria(constraints, memberBalance);
  const navigate = useNavigate();
  const { depositTokens } = useDepositTokens();
  const [loading, setLoading] = useState(false);

  const enterGiveaway = async () => {
    alert("Entering giveaway");
  };

  const isDisabled = errors.length > 0;

  const amountToAdd = constraints?.minBalance
    ? constraints.minBalance - memberBalance
    : 0;

  const showMoreInformation = () => navigate(`/giveaways/${props.giveawayId}`);

  const stakeMoreTokens = useCallback(async () => {
    setLoading(true);
    const txHash = await depositTokens(amountToAdd);
    // ! Don't do this in the component. It should be dumber
    // await connection.confirmTransaction(txHash, "finalized");
    setLoading(false);
  }, [amountToAdd]);

  const actions: Action[] = [
    {
      label: "More info",
      variant: "muted",
      onClick: showMoreInformation,
    },
    isDisabled
      ? {
          label: `Deposit more`,
          disabled: loading,
          onClick: stakeMoreTokens,
        }
      : {
          label: "Enter draw",
          disabled: false,
          onClick: enterGiveaway,
        },
  ];

  return (
    <div
      data-testid={testID}
      className={clsx(styles.frame, isDisabled && styles.disabled)}
      onClick={props.onClick}
    >
      <div className={styles.image}>
        <img src="/images/coin.png" alt={"coins"} width={160} height={160} />
      </div>

      <div className={styles.featured}>
        {isDisabled && (
          <ProgressIndicator
            testID={`${testID}.progress`}
            size="small"
            progress={getProgressFromBalance(constraints, memberBalance)}
          />
        )}
      </div>

      <div className={styles.content}>
        <h2 data-testid={`${testID}.label`} className={styles.title}>
          {props.label}
        </h2>

        <p className={styles.description}>{props.description}</p>

        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((action) => (
              <Button
                testID={`${testID}.button`}
                variant={action.variant}
                size={"small"}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
