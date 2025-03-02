import clsx from "classnames";
import { MemberButton } from "../MemberButton/MemberButton";
import { HeaderButton } from "../HeaderButton/HeaderButton";
import styles from "./Header.module.css";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { outstandingRewardsSelector } from "@/state/subscription/selectors";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDevToggles } from "@/state/application/useDevToggles";

interface HeaderProps extends Common.ComponentProps {
  className?: string;
}

const MENU_ITEMS = [
  { key: "home", label: "Home", path: "/", icon: "home" },
  { key: "giveaways", label: "Giveaways", path: "/giveaways", icon: "present" },
  {
    key: "subscription",
    label: "Subscription",
    path: "/subscription",
    icon: "star",
  },
];

export const Header = ({ testID, ...props }: HeaderProps) => {
  const { t } = useTranslation("Header");
  const { allEnabled } = useDevToggles();
  const navigate = useNavigate();

  const navigateToPath = (path: string) => () => navigate(path);

  const { publicKey } = useWallet();
  const outstandingRewards = useRecoilValue(outstandingRewardsSelector);

  const shouldDisplay = (key: string) => {
    switch (key) {
      case "home":
      case "buy":
        return !publicKey;
      case "giveaways":
      case "subscription":
        return !!publicKey;
      default:
        return true;
    }
  };

  const shouldDisable = (key: string) => {
    switch (key) {
      case "giveaways":
        return !allEnabled("daily_giveaways", "giveaways");
      default:
        return false;
    }
  };

  const shouldHighlight = (key: string) => {
    switch (key) {
      case "subscription":
        return outstandingRewards > 0;
      default:
        return false;
    }
  };

  // Menu actions should be configurable per route and also communicate via channels with pages

  return (
    <nav data-testid={testID} className={clsx(props.className, styles.frame)}>
      {MENU_ITEMS.filter(({ key }) => shouldDisplay(key)).map((item) => (
        <HeaderButton
          key={item.key}
          testID={`${testID}.button`}
          onClick={navigateToPath(item.path)}
          highlight={shouldHighlight(item.key)}
          disabled={shouldDisable(item.key)}
          label={item.label}
          icon={item.icon}
        />
      ))}
      <span data-testid={`${testID}.spacer`} className={styles.spacer} />
      <MemberButton testID={`${testID}.member`} />
    </nav>
  );
};
