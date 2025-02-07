import { Button, Divider } from "@/elements";
import styles from "./SubscriptionOption.module.css";
import clsx from "classnames";

interface SubscriptionOptionProps extends Common.ComponentProps {
  title: string;
  name: string;
  benefits: { label: string }[];
  amount: number;
  amountRemaining?: number;
  /**
   * Specifies if the current subscription is the one
   * the user already has applied.
   */
  applied?: boolean;
  highlight?: boolean;
  selected?: boolean;
  disabled?: boolean;
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

export const SubscriptionOption = ({
  testID,
  amountRemaining = 0,
  ...props
}: SubscriptionOptionProps) => {
  const selectMembershipAmount = () => {
    props.onClick?.(amountRemaining);
  };

  return (
    <label
      data-testid={testID}
      htmlFor={props.amount.toString()}
      className={clsx(
        props.className,
        styles.frame,
        props.highlight && styles.highlight
      )}
    >
      <div data-testid={`${testID}.header`} className={styles.header}>
        <h3 data-testid={`${testID}.title`}>{props.title}</h3>
        <small data-testid={`${testID}.subtitle`} className={styles.subtitle}>
          {formatNumber(props.amount)} VIRGINS
        </small>
        <h4 data-testid={`${testID}.subtitle`} className={styles.subtitle}>
          +{amountRemaining.toLocaleString()}
        </h4>
      </div>
      <Divider
        testID={`${testID}.divider`}
        label={"Benefits"}
        align={"left"}
        className={styles.divider}
      />
      <ul data-testid={`${testID}.benefits`} className={styles.content}>
        {props.benefits.map((benefit) => (
          <li key={benefit.label} data-testid={`${testID}.item`}>
            {benefit.label}
          </li>
        ))}
      </ul>
      <input
        id={props.amount.toString()}
        name={props.name}
        type={"radio"}
        onChange={selectMembershipAmount}
        checked={props.selected}
        disabled={props.disabled}
      />
    </label>
  );
};
