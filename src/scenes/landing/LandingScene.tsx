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

    console.log(lastDataPoint, firstDataPoint);

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
      <p>
        The simplest way to buy is through the swap market with Solana or USDC
        through Phantom Wallet. Alternatively you can trade $VIRGIN on Raydium
        and Jupiter Exchange.
      </p>
      <Button testID={`${testID}.raydium`}>Buy on Raydium</Button>
      <Button testID={`${testID}.raydium`}>Buy on Jupiter</Button>
    </div>
  );
};

export const AboutSection = () => {
  return (
    <div>
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--size-300)",
      }}
    >
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
    <div>
      <p>
        Gain access to exclusive member benefits and giveaways when you stake
        $VIRGIN for 30 days.
      </p>
    </div>
  );
};

const TABS = [
  {
    label: "How to buy",
    Component: PurchaseSection,
  },
  { label: "About", Component: AboutSection },
  { label: "FAQ", Component: FAQSection },
  { label: "Members", Component: MemberScene },
];

export const LandingScene = ({
  testID = "landing",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderTab = () => {
    const Component = TABS[tabIndex].Component;
    return <Component testID={`${testID}.section`} />;
  };

  return (
    <div data-testid="membership" id={"membership"} className={styles.frame}>
      <div className={styles.header}>
        <div className={styles.banner}>
          <img
            src={"/images/logo-stamp.png"}
            alt={`VIRGIN stamp logo`}
            width={400}
            style={{ maxWidth: "100%" }}
          />
          <img
            src={"/images/banner.png"}
            alt={"banner"}
            width={618}
            style={{ maxWidth: "100%" }}
          />
        </div>

        <ContractAddress
          testID={`${testID}.mint`}
          label={"CA"}
          mint={MINT.toBase58()}
        />
      </div>

      <span className={styles.cash} />

      <div className={styles.content}>
        <span
          data-testid={`${testID}.navigation`}
          className={styles.navigation}
        >
          {TABS.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setTabIndex(index)}
              className={styles.tab}
            >
              {tab.label}
            </button>
          ))}
          {/* <button>close</button> */}
          {/* <Button
            testID={`${testID}.connect`}
            className={styles.button}
            size={"small"}
          >
            Connect wallet
          </Button> */}
        </span>

        {renderTab()}
      </div>

      <CommandPrompter testID={`${testID}.onboarding`} />
    </div>
  );
};
