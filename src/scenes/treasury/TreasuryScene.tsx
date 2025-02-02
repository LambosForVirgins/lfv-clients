import { CircularProgress } from "@/components/CircularIndicator/CircularIndicator";
import styles from "./TreasuryScene.module.css";
import { VestingAccount } from "@/components/VestingAccount/VestingAccount";
import {
  tokenAllocationAtom,
  vestedAccountsAtom,
} from "@/state/treasury/atoms";

import { Routes as Switch, Route as Page, NavLink } from "react-router";
import { useRecoilValue } from "recoil";

const MARKET_CAP = 1_300_000,
  TOTAL_SUPPLY = 894_999_997,
  CIRCULATING_SUPPLY = 589_999_997;

export const TreasuryScene = ({
  testID = "treasury",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const vestedAccounts = useRecoilValue(vestedAccountsAtom);
  const allocation = useRecoilValue(tokenAllocationAtom);

  return (
    <section data-testid={testID} className={styles.frame}>
      <h2>Treasury Vesting Accounts</h2>
      <ul>
        {Object.keys(vestedAccounts).map((publicKey) => (
          <li key={publicKey}>
            <NavLink to={`/tokenomics/vesting/${publicKey}`}>
              {publicKey}
            </NavLink>
          </li>
        ))}
      </ul>
      <Switch>
        <Page path="/vesting/:publicKey" Component={VestingAccount} />
      </Switch>
      <div>
        <h2>Tokenomics</h2>
        <p>
          What started as a joke between friends has now become a matter of
          global importance.
        </p>
        <p>
          The world population is in decline and the alpha male GigaChad faces
          extinction.
        </p>

        {allocation.map((fund) => (
          <span
            key={fund.name}
            data-testid={`${testID}.fund`}
            className={styles.portion}
          >
            <CircularProgress testID={`${testID}.progress`} percentage={0} />
            <h2>${(MARKET_CAP * fund.portion).toLocaleString()} USD</h2>
            <p>{fund.name}</p>
          </span>
        ))}

        <span className={styles.split}>
          <h2>{0}%</h2>
          <p>Public Distribution</p>
          <p>{0}M tokens</p>
        </span>

        <span className={styles.split}>
          <h2>{11}%</h2>
          <p>Creators and Team</p>
          <p>{0}M tokens</p>
        </span>

        <span className={styles.split}>
          <h2>{11}%</h2>
          <p>Marketing</p>
          <p>{0}M tokens</p>
        </span>

        <span className={styles.split}>
          <h2>{11}%</h2>
          <p>Airdrop</p>
          <p>{0}M tokens</p>
        </span>

        <span className={styles.portion}>
          <h2>{(1).toLocaleString()}B Tokens</h2>
          <h2>{TOTAL_SUPPLY.toLocaleString()} Tokens</h2>
          <h2>{CIRCULATING_SUPPLY.toLocaleString()}B Tokens</h2>
          <p>Initial supply</p>
        </span>

        <span>
          <h2>Markets</h2>
          <ul>
            <li>Raydium</li>
            <li>Jupiter</li>
          </ul>
        </span>
      </div>
    </section>
  );
};
