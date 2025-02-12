import { CircularProgress } from "@/components/CircularIndicator/CircularIndicator";
import styles from "./TreasuryScene.module.css";
import { VestingAccount } from "@/components/VestingAccount/VestingAccount";
import { vestedAccountsAtom } from "@/state/treasury/atoms";

import { Routes as Switch, Route as Page, NavLink } from "react-router";
import { useRecoilValue } from "recoil";
import { tokenAllocationSelector } from "@/state/treasury/selectors";
import { totalTokenBalanceSelector } from "@/state/mints/selectors";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import { prettyAddress } from "@/utils/string/prettyAddress";

const MARKET_CAP = 1_300_000,
  TOTAL_SUPPLY = 894_999_997,
  CIRCULATING_SUPPLY = 589_999_997;

const markets = [
  {
    market: "Raydium",
    label: "Raydium",
    url: "https://raydium.io/swap/?outputCurrency=7kB8ZkSBJr2uiBWfveqkVBN7EpZMFom5PqeWUB62DCRD&inputMint=sol&outputMint=4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
  },
  {
    market: "Jupiter",
    label: "Jupiter",
    url: "https://jup.ag/tokens/7kB8ZkSBJr2uiBWfveqkVBN7EpZMFom5PqeWUB62DCRD",
  },
];

export const TreasuryScene = ({
  testID = "treasury",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { publicKey } = useWallet();
  const [marketCap, setMarketCap] = useState(MARKET_CAP);
  const vestedAccounts = useRecoilValue(vestedAccountsAtom);
  const allocation = useRecoilValue(tokenAllocationSelector);
  const totalHoldingBalance = useRecoilValue(
    totalTokenBalanceSelector(publicKey)
  );

  const tokenPrice = useMemo(() => marketCap / TOTAL_SUPPLY, [marketCap]);

  const isProjectedPrice = marketCap > MARKET_CAP;

  const totalAllocation = useMemo(
    () => allocation.reduce((sum, acc) => sum + acc.portion, 0),
    [allocation]
  );

  return (
    <section data-testid={testID} className={styles.frame}>
      <h2>Treasury Vesting Accounts</h2>
      <ul>
        {Object.keys(vestedAccounts).map((publicKey) => (
          <li key={publicKey}>
            <NavLink to={`/tokenomics/vesting/${publicKey}`}>
              {prettyAddress(publicKey)}
            </NavLink>
          </li>
        ))}
      </ul>
      <Switch>
        <Page path="/vesting/:publicKey" Component={VestingAccount} />
      </Switch>
      <div>
        <h2>Tokenomics</h2>

        {allocation.map((group) => (
          <span
            key={group.label}
            data-testid={`${testID}.fund`}
            className={styles.portion}
          >
            <CircularProgress
              testID={`${testID}.progress`}
              percentage={group.portion}
              label={`${Math.ceil(group.portion * 1000) / 10}%`}
            />
            <span className={styles.details}>
              {group.portion != group.remainingPortion && (
                <small style={{ textDecoration: "line-through" }}>
                  Initial balance $
                  {Math.floor(marketCap * group.portion).toLocaleString()} USD
                </small>
              )}
              <h2>
                $
                {Math.floor(
                  marketCap * group.remainingPortion
                ).toLocaleString()}{" "}
                USD
              </h2>
              <p>{group.name}</p>
              {group.description && <p>{group.description}</p>}
            </span>
          </span>
        ))}

        <span className={styles.portion}>
          <h2>{Math.floor(totalAllocation * 10000) / 100}% Allocated</h2>
          <h2>{(1).toLocaleString()}B Tokens</h2>
          <h2>{TOTAL_SUPPLY.toLocaleString()} Tokens</h2>
          <h2>{CIRCULATING_SUPPLY.toLocaleString()}B Tokens</h2>
          <p>Initial supply</p>
        </span>

        <span>
          <h2>Projection</h2>
          <p>Glimpse at future you.</p>
          <input
            type="range"
            min={MARKET_CAP}
            max={3_000_000_000}
            step={100_000_000}
            onChange={({ target }) => setMarketCap(+target.value)}
          />
          <p>Multiply your balance by the number of Lambo's given away.</p>
        </span>

        <span>
          <h2>Your holdings</h2>
          <p>{totalHoldingBalance.toLocaleString()} VIRGIN</p>
          <p>
            $
            {(
              Math.floor(tokenPrice * totalHoldingBalance * 100) / 100
            ).toLocaleString()}{" "}
            USD
          </p>
        </span>

        <span>
          <h2>Markets</h2>
          <ul>
            {markets.map(({ market, label, url }) => (
              <li key={market}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </span>
      </div>
    </section>
  );
};
