import { Button } from "@/elements";
import styles from "./MemberPackageCard.module.css";
import clsx from "classnames";

interface MembershipPackageCardProps extends Common.ComponentProps {
  title: string;
  benefits: { label: string }[];
  amount: number;
  /**
   * Specifies if the current subscription is the one
   * the user already has applied.
   */
  applied?: boolean;
  highlight?: boolean;
  className?: string;
  onClick?: (amount: number) => void;
}

export const formatNumber = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)} Million`; // Millions with one decimal
  } else if (value >= 100_000) {
    return `${Math.floor(value / 1_000)}K`; // Thousands with no decimals
  } else {
    return value.toLocaleString(); // Comma-separated for values below 100K
  }
};

export const MemberPackageCard = ({
  testID,
  ...props
}: MembershipPackageCardProps) => {
  const selectMembershipAmount = () => {
    props.onClick?.(props.amount);
  };

  return (
    <div
      data-testid={testID}
      className={clsx(
        props.className,
        styles.frame,
        props.highlight && styles.highlight
      )}
    >
      <div data-testid={`${testID}.header`}>
        <h3 data-testid={`${testID}.title`}>{props.title}</h3>
      </div>
      <h4 data-testid={`${testID}.subtitle`} className={styles.subtitle}>
        {formatNumber(props.amount)} VIRGINS
      </h4>
      <div data-testid={`${testID}.content`} className={styles.content}>
        <ul data-testid={`${testID}.benefits`}>
          {props.benefits.map((benefit) => (
            <li key={benefit.label} data-testid={`${testID}.item`}>
              {benefit.label}
            </li>
          ))}
        </ul>
      </div>
      <Button
        testID={`${testID}.action`}
        disabled={props.applied}
        onClick={selectMembershipAmount}
      >
        {props.applied ? "Current Plan" : "Select"}
      </Button>
    </div>
  );
};
