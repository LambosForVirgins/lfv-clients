import clsx from "classnames";
import { MemberButton } from "../MemberButton/MemberButton";
import { BoostButton } from "../BoostButton/BoostButton";
import styles from "./Header.module.css";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

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

  // Menu actions should be configurable per route and also communicate via channels with pages

  return (
    <nav data-testid={testID} className={clsx(props.className, styles.frame)}>
      <BoostButton
        testID={`${testID}.giveaways`}
        onClick={navigateToPath("/giveaways")}
        label={`Giveaways`}
        icon={"present"}
      />
      <BoostButton
        testID={`${testID}.store`}
        onClick={navigateToPath("/store")}
        label={`Store`}
        icon={"store"}
      />
      <BoostButton
        testID={`${testID}.discounts`}
        onClick={navigateToPath("/benefits")}
        label={`Discounts`}
        progress={10}
        highlight
        disabled
      />
      <span data-testid={`${testID}.spacer`} className={styles.spacer} />
      <MemberButton testID={`${testID}.member`} />
    </nav>
  );
};
