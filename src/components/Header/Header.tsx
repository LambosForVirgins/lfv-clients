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
import { useSession } from "@/providers/Sessions/SessionProvider";

interface HeaderProps extends Common.ComponentProps {
  className?: string;
}

export const Header = ({ testID, ...props }: HeaderProps) => {
  const { t } = useTranslation("Header");
  const { allEnabled } = useDevToggles();
  const navigate = useNavigate();
  const { wallet } = useWallet();
  const { loadSession } = useSession();

  const navigateToPath = (path: string) => () => navigate(path);

  const { publicKey } = useWallet();
  const outstandingRewards = useRecoilValue(
    outstandingRewardsSelector(publicKey)
  );

  // Menu actions should be configurable per route and also communicate via channels with pages

  return (
    <nav data-testid={testID} className={clsx(props.className, styles.frame)}>
      {!!wallet && (
        <HeaderButton
          testID={`${testID}.giveaways`}
          onClick={navigateToPath("/giveaways")}
          label={`Giveaways`}
          icon={"present"}
          disabled={!allEnabled("daily_giveaways", "giveaways")}
        />
      )}
      {!!wallet && (
        <HeaderButton
          testID={`${testID}.subscription`}
          onClick={navigateToPath("/subscription")}
          label={`Store`}
          icon={"star"}
          highlight={outstandingRewards > 0}
        />
      )}

      {/* <HeaderButton
        testID={`${testID}.discounts`}
        onClick={navigateToPath("/benefits")}
        label={`Discounts`}
        progress={10}
        highlight={outstandingRewards > 0}
      /> */}
      <span data-testid={`${testID}.spacer`} className={styles.spacer} />
      <MemberButton testID={`${testID}.member`} onClick={loadSession} />
    </nav>
  );
};
