import clsx from "classnames";
import { MemberButton } from "../MemberButton/MemberButton";
import { HeaderButton } from "../HeaderButton/HeaderButton";
import styles from "./Header.module.css";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useClaimRewards } from "@/hooks/useClaimRewards";
import { useRecoilValue } from "recoil";
import { outstandingRewardsSelector } from "@/state/subscription/selectors";
import { useWallet } from "@solana/wallet-adapter-react";

const GuestMenuItems = [
  {
    key: "About",
    url: "/#about",
  },
  {
    key: "Store",
    url: "/store",
  },
  {
    key: "Community",
    url: "/#community",
  },
  {
    key: "Submissions",
    url: "/#submissions",
  },
];

const MENU_ACTIONS = [];

interface HeaderProps extends Common.ComponentProps {
  className?: string;
}

export const Header = ({ testID, ...props }: HeaderProps) => {
  const { t } = useTranslation("Header");
  const navigate = useNavigate();

  const navigateToPath = (path: string) => () => navigate(path);

  const { publicKey } = useWallet();
  const outstandingRewards = useRecoilValue(
    outstandingRewardsSelector(publicKey)
  );

  // Menu actions should be configurable per route and also communicate via channels with pages

  return (
    <nav data-testid={testID} className={clsx(props.className, styles.frame)}>
      <HeaderButton
        testID={`${testID}.giveaways`}
        onClick={navigateToPath("/giveaways")}
        label={`Giveaways`}
        icon={"present"}
      />
      <HeaderButton
        testID={`${testID}.subscription`}
        onClick={navigateToPath("/subscription")}
        label={`Store`}
        icon={"star"}
        highlight={outstandingRewards > 0}
      />

      {/* <HeaderButton
        testID={`${testID}.discounts`}
        onClick={navigateToPath("/benefits")}
        label={`Discounts`}
        progress={10}
        highlight={outstandingRewards > 0}
      /> */}
      <span data-testid={`${testID}.spacer`} className={styles.spacer} />
      <MemberButton testID={`${testID}.member`} />
    </nav>
  );
};
