import { MemberPackageCard } from "../MemberPackageCard/MemberPackageCard";
import styles from "./MembershipSell.module.css";
import clsx from "classnames";
import { lamportsToMint } from "@/utils/locker/constants";
import { MemberTier, MemberTierValues } from "@/state/member/types";
import { useSubscription } from "@/hooks/useSubscription";

interface SubscriptionPlansProps extends Common.ComponentProps {}

const tieredPackages = [
  {
    tier: MemberTier.SuperChad,
    title: "SuperChad",
    benefits: [
      { label: "Shop virgin only merch" },
      { label: "Special event access" },
      { label: "Access to daily giveaways" },
    ],
    amount: MemberTierValues.Super,
  },
  {
    tier: MemberTier.MegaChad,
    title: "MegaChad",
    benefits: [
      { label: "10% off virgin only merch" },
      { label: "Exclusive event benefits" },
      { label: "Access to mega giveaways" },
    ],
    amount: MemberTierValues.Mega,
    highlight: true,
  },
  {
    tier: MemberTier.GigaChad,
    title: "GigaChad",
    benefits: [
      { label: "25% off virgin only merch" },
      { label: "VIP event access & treatment" },
      { label: "Access the biggest giveaways" },
    ],
    amount: MemberTierValues.Giga,
  },
];

export const MembershipSell = ({ testID }: SubscriptionPlansProps) => {
  const { tier, updateTier } = useSubscription();

  const changeMembershipTier = (amount: number) => {
    // This should attempt to deposit or release tokens to meet their desired tier
    updateTier(amount);
  };

  return (
    <div data-testid={testID} className={clsx(styles.options, styles.frame)}>
      {tieredPackages.map((product, idx) => (
        <MemberPackageCard
          key={`${product.tier}.${idx}`}
          testID={`${testID}.package`}
          title={product.title}
          amount={lamportsToMint(product.amount)}
          benefits={product.benefits}
          onClick={changeMembershipTier}
          applied={tier === product.tier}
          highlight={product.highlight}
        />
      ))}
    </div>
  );
};
