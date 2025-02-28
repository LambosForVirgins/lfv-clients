import styles from "./TreasuryScene.module.css";
import { VestingAccount } from "@/components/VestingAccount/VestingAccount";
import { vestedAccountsAtom } from "@/state/treasury/atoms";

import { NavLink } from "react-router";
import { useRecoilValue } from "recoil";
import {
  marketCapSelector,
  tokenAllocationSelector,
} from "@/state/treasury/selectors";
import { totalTokenBalanceSelector } from "@/state/mints/selectors";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import { prettyAddress } from "@/utils/string/prettyAddress";
import clsx from "classnames";
import { MAXIMUM_SUPPLY, TOTAL_SUPPLY } from "@/utils/locker/constants";
import { fullyDilutedValue } from "@/utils/pricing/fullyDilutedValue";
import { AccountAllocation } from "@/components/AccountAllocation/AccountAllocation";
import { TreasuryDepartment } from "@/state/treasury/types";

export const TreasuryScene = ({
  testID = "treasury",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const { wallet, publicKey } = useWallet();
  const currentMarketCap = useRecoilValue(marketCapSelector);
  const [marketCap, setMarketCap] = useState(fullyDilutedValue(0.00019));
  const vestedAccounts = useRecoilValue(vestedAccountsAtom);
  const allocation = useRecoilValue(tokenAllocationSelector);
  const totalHoldingBalance = useRecoilValue(
    totalTokenBalanceSelector(publicKey)
  );

  const tokenPrice = useMemo(() => marketCap / MAXIMUM_SUPPLY, [marketCap]);

  const totalAllocation = useMemo(
    () => allocation.reduce((sum, acc) => sum + acc.portion, 0),
    [allocation]
  );

  return (
    <section data-testid={testID} className={styles.frame}>
      <h2>Treasury Vesting Accounts</h2>
      <p>
        {`There's ${(894_999_999).toLocaleString()} tokens available today, starting from the initial 1 billion supply and burning ${(1_000_000_000 - 894_999_999).toLocaleString()}. The founding team allocation is vested over 18 months, beginning January 2025.`}
      </p>
      <ul>
        {Object.keys(vestedAccounts).map((publicKey) => (
          <li key={publicKey}>
            <NavLink to={`/tokenomics/vesting/${publicKey}`}>
              {prettyAddress(publicKey)}
            </NavLink>
          </li>
        ))}
      </ul>
      <VestingAccount testID={`${testID}.vesting`} />
      <div>
        <h2>Tokenomics</h2>
        {allocation.map((group) =>
          group.department === TreasuryDepartment.Founders ? (
            <AccountAllocation
              key={group.label}
              testID={`${testID}.fund`}
              name={group.name}
              marketCap={marketCap}
              portion={group.portion}
              remainingPortion={group.remainingPortion}
            />
          ) : (
            <AccountAllocation
              key={group.label}
              testID={`${testID}.fund`}
              name={group.name}
              marketCap={marketCap}
              portion={group.portion}
              remainingPortion={group.remainingPortion}
            />
          )
        )}
      </div>
      <div>
        <span className={styles.portion}>
          <h2>{Math.floor(totalAllocation * 10000) / 100}% Allocated</h2>
          <h2>{(1).toLocaleString()}B Tokens</h2>
          <h2>{MAXIMUM_SUPPLY.toLocaleString()} Tokens</h2>
          <h2>{TOTAL_SUPPLY.toLocaleString()}B Tokens</h2>
          <p>Initial supply</p>
        </span>

        <span>
          <h2>Projection</h2>
          <p>Future you looks good. </p>
          <input
            type="range"
            min={currentMarketCap}
            max={3_000_000_000}
            step={100_000_000}
            disabled={!wallet}
            onChange={({ target }) => setMarketCap(+target.value)}
          />
          <p>Multiply your balance by the number of Lambo's given away.</p>
        </span>

        <span>
          <h2>Your holdings</h2>
          {!wallet && <p>Connect your wallet to see your balance</p>}
          <p className={clsx(!wallet && styles.disabled)}>
            {totalHoldingBalance.toLocaleString()} VIRGIN
          </p>
          <p className={clsx(!wallet && styles.disabled)}>
            $
            {(
              Math.floor(tokenPrice * totalHoldingBalance * 100) / 100
            ).toLocaleString()}{" "}
            USD
          </p>
        </span>
      </div>
    </section>
  );
};
