import styles from "./LandingScene.module.css";
import { CommandPrompter } from "@/scenes/prompter/CommandPrompter";
import { Button } from "@/elements";
import { ChangeLabel } from "@/components/ChangeLabel/ChangeLabel";
import { LineChart } from "@/components/LineChart/LineChart";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { marketPricesAtom } from "@/state/treasury/atoms";
import { NavLink } from "react-router";
import { fullyDilutedValue } from "@/utils/pricing/fullyDilutedValue";
import { ContractAddress } from "@/elements/ContractAddress/ContractAddress";
import { MINT } from "@/utils/locker/constants";
import { TabControl } from "@/elements/TabControl/TabControl";

export const PurchaseSection = ({ testID }: Common.ComponentProps) => {
  const dataPoints = useRecoilValue(marketPricesAtom);

  const marketCap = useMemo(() => {
    const lastDataPoint = dataPoints[dataPoints.length - 1];
    const lastPrice = lastDataPoint[1];

    return Math.floor(fullyDilutedValue(lastPrice));
  }, [dataPoints.length]);

  const change = useMemo(() => {
    const lastDataPoint = dataPoints[dataPoints.length - 1];
    const firstDataPoint = dataPoints[0];

    const priceChange = lastDataPoint[1] - firstDataPoint[1];
    const amount = Math.floor(fullyDilutedValue(priceChange) * 100) / 100;
    const percentage = (priceChange / firstDataPoint[1]) * 100;

    return { amount, percentage };
  }, [dataPoints.length]);

  return (
    <div data-testid={testID} className={styles.section}>
      <span className={styles.header}>
        <h1>${marketCap.toLocaleString()}</h1>
        <ChangeLabel
          testID={`${testID}.change`}
          amount={change.amount}
          percentage={change.percentage}
        />
      </span>
      <LineChart testID={`${testID}.chart`} data={dataPoints} />
      <span>
        <p>
          Buy tokens early, subscribe by staking, and reap the member benefits.
        </p>
        <ol>
          <li>
            Download and connect your Solana wallet of choice. We like to use
            Phantom wallet.
          </li>
          <li>
            Purchase SOL to your wallet through MoonPay transfer from your
            favorite exchange.
          </li>
          <li>
            Purchase $VIRGIN by swapping SOL through Phantom wallet or one of
            the decentralized exchanges below.
          </li>
        </ol>
      </span>
      <span className={styles.actions}>
        <Button testID={`${testID}.raydium`}>Buy on Raydium</Button>
        <Button testID={`${testID}.raydium`}>Buy on Jupiter</Button>
      </span>
    </div>
  );
};

export const AboutSection = () => {
  return (
    <div className={styles.section}>
      <p>
        The LambosForVirgin token ($VIRGIN) is minted on the Solana blockchain
        with a limited supply of 1 Billion tokens. We initially burned 105
        Million tokens to celebrate the 1 million dollar market cap milestone,
        leaving a final circulating supply of 895 million tokens.
      </p>
      <h3>A Token with the Utility to Change Lives.</h3>
      <p>
        It's not just about Lambo's, it's a token with the power to a better
        life.
      </p>
    </div>
  );
};

export const FAQSection = () => {
  return (
    <div className={styles.section}>
      <h3>What is a meme?</h3>
      <p>
        An idea, behavior, style, or usage that spreads from person to person
        within a culture. -- Merriam-Webster's meme noun
      </p>
      <h3>Why is KYC required to claim a giveaway?</h3>
      <p>
        How else are we going to send you any goods? Our next best idea was just
        leaving a Lambo unlocked and hoping you'd be the first to take it.
        Genius ideas aside, it's important we try to keep with local laws and
        regulations regarding promotional giveaways, and knowing our customers
        is the first step to most jurisdictions.
      </p>
      <h3>How much do the founders own?</h3>
      <p>
        The founders share in a combined 11% of total token supply which is
        locked into the{" "}
        <a href={"https://github.com/Bonfida/token-vesting"}>
          Bonfida vesting contract
        </a>{" "}
        and released weekly over 18 months. You can view the vesting state and
        wallets in the{" "}
        <NavLink to={"tokenomics"}>tokenomics section here</NavLink>.
      </p>
    </div>
  );
};

export const MemberScene = () => {
  return (
    <div className={styles.section}>
      <p>
        Gain access to exclusive member benefits and giveaways when you stake
        $VIRGIN for 30 days.
      </p>
    </div>
  );
};

const TABS = [
  {
    label: "Buy",
    Component: PurchaseSection,
  },
  { label: "About", Component: AboutSection },
  { label: "FAQ", Component: FAQSection },
  { label: "Members", Component: MemberScene },
];

export const LandingScene = ({
  testID = "landing",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const [tabIndex, setTabIndex] = useState(2);

  const renderTab = () => {
    const Component = TABS[tabIndex].Component;
    return <Component testID={`${testID}.section`} />;
  };

  return (
    <div data-testid={testID} id={"membership"} className={styles.frame}>
      <img
        src={"/images/logo-stamp.png"}
        alt={`VIRGIN stamp logo`}
        width={400}
        className={styles.hero}
      />
      <img
        src={"/images/banner.png"}
        alt={"banner"}
        width={618}
        className={styles.hero}
      />
      <ContractAddress
        testID={`${testID}.mint`}
        label={"CA"}
        mint={MINT.toBase58()}
        className={styles.hero}
      />
      <span className={styles.cash} />

      <div className={styles.content}>
        <TabControl
          testID={`${testID}.tabs`}
          name={"section"}
          value={TABS[tabIndex].label}
          options={TABS.map((tab) => ({
            label: tab.label,
            value: tab.label,
          }))}
          onChange={(value) => {
            setTabIndex(TABS.findIndex((tab) => tab.label === value));
          }}
          rounded
          dense
          outline
        />

        {renderTab()}
      </div>

      {/* <CommandPrompter testID={`${testID}.onboarding`} /> */}
    </div>
  );
};
