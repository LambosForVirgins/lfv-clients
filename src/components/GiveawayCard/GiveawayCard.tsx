import { type EntryCriteria } from "@/state/types";
import styles from "./GiveawayCard.module.css";
import clsx from "classnames";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";

import { getProgressFromBalance } from "@/utils/membership/getProgressFromBalance";
import { validateEntryCriteria } from "@/utils/entry-criteria/validateEntryCriteria";
import { useRecoilValue } from "recoil";
import { drawEntryCountSelector } from "@/state/giveaways/selectors";
import { useGiveaways } from "@/state/giveaways/useGiveaways";
import {
  associatedDrawsSelector,
  roundSelector,
} from "@/state/draws/selectors";
import { useNavigate } from "react-router";
import { Button } from "@/elements";
import { ButtonVariant } from "@/elements/Button/Button";

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
  const draws = useRecoilValue(associatedDrawsSelector(props.giveawayId));
  const navigate = useNavigate();
  const lastDraw = draws[draws.length - 1] || null;

  const enterGiveaway = async (drawId: string) => {
    console.log("Entering giveaway", drawId);
    // await enterDraw(drawId, {
    //   address: "LFV2q8VY5xnVbYpYMbmZQekjy7uuVCwo3oWgttxUy5j",
    //   name: "test",
    // });
  };

  const isDisabled = errors.length > 0 || !lastDraw;

  const showMoreInformation = () => navigate(`/giveaways/${props.giveawayId}`);

  const stakeMoreTokens = () => {
    console.log("Should stake more");
  };

  const actions: Action[] = [
    {
      label: "More info",
      variant: "muted",
      onClick: showMoreInformation,
    },
    isDisabled
      ? {
          label: "Stake more",
          disabled: false,
          onClick: stakeMoreTokens,
        }
      : {
          label: "Enter draw",
          disabled: false,
          onClick: () => enterGiveaway(lastDraw.id),
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
