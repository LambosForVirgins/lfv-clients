import styles from "./LandingScene.module.css";
import { CommandPrompter } from "@/scenes/prompter/CommandPrompter";
import { Button } from "@/elements";
import { ChangeLabel } from "@/components/ChangeLabel/ChangeLabel";
import { LineChart } from "@/components/LineChart/LineChart";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { marketPricesAtom } from "@/state/treasury/atoms";
import { NavLink } from "react-router";
import { fullyDilutedValue } from "@/utils/pricing/fullyDilutedValue";
import { ContractAddress } from "@/elements/ContractAddress/ContractAddress";
import { MINT } from "@/utils/locker/constants";
import { TabControl } from "@/elements/TabControl/TabControl";
import clsx from "classnames";
import { faqAtom } from "@/state/application/atoms";

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
      <p>The only utility meme coin on a mission to reward token holders!</p>
      <h3>A Token with the Utility to Change Lives.</h3>
      <p>
        LambosForVirgins ($VIRGIN) is the only utility-meme coin and rewards
        club offering its members the chance to win everything from
        Lamborghini's to daily cash and token prizes. Our decentralized
        subscription program rewards members who stake tokens by providing
        exclusive access to merchandise, events, and promotional giveaways.
      </p>
      <p>
        The LambosForVirgin token ($VIRGIN) and program operate on the Solana
        blockchain network with a capped supply of 1 Billion tokens. After the
        initial burn of 105 Million tokens, the final circulating supply of 895
        million tokens.
      </p>
    </div>
  );
};

export const FAQSection = () => {
  const frequentlyAskedQuestions = useRecoilValue(faqAtom);

  return (
    <div className={styles.section}>
      {frequentlyAskedQuestions.map((faq) => (
        <span key={faq.id} className={styles.faq}>
          <h3>{faq.title}</h3>
          <p>{faq.content}</p>
        </span>
      ))}
    </div>
  );
};

export const MemberScene = ({
  testID = "members",
}: Partial<Common.ComponentProps>) => {
  return (
    <div className={styles.section}>
      <p>
        Gain access to exclusive member benefits and giveaways when you stake
        $VIRGIN for 30 days.
      </p>
      <Button testID={`${testID}.subscribe`} size={"small"}>
        Become a member
      </Button>
    </div>
  );
};

const TABS = [
  { label: "About", Component: AboutSection },
  {
    label: "Buy",
    Component: PurchaseSection,
  },
  { label: "FAQ", Component: FAQSection },
  { label: "Members", Component: MemberScene },
];

export const LandingScene = ({
  testID = "landing",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const headerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setExpanded] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const renderTab = () => {
    const Component = TABS[tabIndex].Component;
    return <Component testID={`${testID}.section`} />;
  };

  useEffect(() => {
    if (isExpanded && headerRef.current) {
      // contract down to 56px and hide images
      headerRef.current.style.height = "0px";
      headerRef.current.style.overflow = "hidden";
      headerRef.current.classList.add(styles.collapsed);
    } else if (headerRef.current) {
      headerRef.current.style.height = "auto";
      headerRef.current.classList.remove(styles.collapsed);
    }
  }, [isExpanded]);

  return (
    <section
      data-testid={testID}
      id={"membership"}
      className={clsx(styles.frame, styles.cash)}
    >
      <span ref={headerRef} className={styles.top}>
        <img
          src={"/images/logo-stamp.png"}
          alt={`VIRGIN stamp logo`}
          className={clsx(styles.hero, styles.logo)}
        />

        <ContractAddress
          testID={`${testID}.mint`}
          label={"CA"}
          mint={MINT.toBase58()}
          className={styles.hero}
        />
      </span>

      <div className={styles.content}>
        <span className={styles.navigation}>
          <TabControl
            testID={`${testID}.tabs`}
            name={"section"}
            value={TABS[tabIndex].label}
            options={TABS.map((tab) => ({
              label: tab.label,
              value: tab.label,
            }))}
            onChange={(value) => {
              setExpanded(true);
              setTabIndex(TABS.findIndex((tab) => tab.label === value));
            }}
            rounded
            dense
            outline
          />
          <button onClick={() => setExpanded(false)}>close</button>
        </span>

        {renderTab()}
      </div>

      <CommandPrompter />
    </section>
  );
};
