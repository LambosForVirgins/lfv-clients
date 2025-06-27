import styles from "./LandingScene.module.css";
import { CommandPrompter } from "@/scenes/prompter/CommandPrompter";
import { Button } from "@/elements";
import { ChangeLabel } from "@/components/ChangeLabel/ChangeLabel";
import { LineChart } from "@/components/LineChart/LineChart";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { marketPricesAtom } from "@/state/treasury/atoms";
import { useNavigate } from "react-router";
import { fullyDilutedValue } from "@/utils/pricing/fullyDilutedValue";
import { ContractAddress } from "@/elements/ContractAddress/ContractAddress";
import { MINT } from "@/utils/locker/constants";
import { TabControl } from "@/elements/TabControl/TabControl";
import clsx from "classnames";
import { faqAtom } from "@/state/application/atoms";
import { marketCapSelector } from "@/state/treasury/selectors";
import { TEMP_onBoardingDisplayAtom } from "@/state/subscription/atoms";
import { getMintTradeInTransaction } from "@/utils/transactions/getMintTradeInTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { findVaultTokenAccountAddress } from "../../utils/locker/PDA";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
  PublicKey,
  Connection,
  ParsedTransactionWithMeta,
} from "@solana/web3.js";
import { PixelButton } from "@/elements/Buttons/PixelButton";
import { PixelCell } from "@/elements/Buttons/PixelCell";

const markets = [
  {
    key: "raydium",
    label: "Raydium",
    href: "https://raydium.io/swap/?outputMint=7kB8ZkSBJr2uiBWfveqkVBN7EpZMFom5PqeWUB62DCRD",
  },
  {
    key: "jupiter",
    label: "Jupiter",
    href: "https://jupiter-terminal.dexscreener.com/?inputMint=7kB8ZkSBJr2uiBWfveqkVBN7EpZMFom5PqeWUB62DCRD&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  },
];

export const PurchaseSection = ({
  id,
  testID,
}: Common.ComponentProps & { id: string }) => {
  const dataPoints = useRecoilValue(marketPricesAtom);
  const marketCap = useRecoilValue(marketCapSelector);

  const change = useMemo(() => {
    const lastDataPoint = dataPoints[dataPoints.length - 1];
    const firstDataPoint = dataPoints[0];

    const priceChange = lastDataPoint[1] - firstDataPoint[1];
    const amount = Math.floor(fullyDilutedValue(priceChange) * 100) / 100;
    const percentage = (priceChange / firstDataPoint[1]) * 100;

    return { amount, percentage };
  }, [dataPoints.length]);

  const navigateTo = useCallback(
    (href: string) => () => {
      window.location.replace(href);
    },
    []
  );

  return (
    <div id={id} data-testid={testID} className={styles.section}>
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
      <h3>Already have Solana?</h3>
      <p>
        $VIRGIN is available for swaps on all Solana based decentralized
        exchanges.
      </p>
      <span data-testid={`${testID}.actions`} className={styles.actions}>
        {markets.map((market) => (
          <Button
            key={market.key}
            testID={`${testID}.market`}
            onClick={navigateTo(market.href)}
          >
            {market.label}
          </Button>
        ))}
      </span>
    </div>
  );
};

export const AboutSection = ({
  id,
  testID,
}: Common.ComponentProps & { id: string }) => {
  return (
    <div id={id} data-testid={testID} className={styles.section}>
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

export const FAQSection = ({
  id,
  testID,
}: Common.ComponentProps & { id: string }) => {
  const frequentlyAskedQuestions = useRecoilValue(faqAtom);

  return (
    <div id={id} data-testid={testID} className={styles.section}>
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
  id,
  testID = "members",
}: Partial<Common.ComponentProps> & { id: string }) => {
  const setIsOpen = useSetRecoilState(TEMP_onBoardingDisplayAtom);

  return (
    <div id={id} data-testid={testID} className={styles.section}>
      <p>
        Gain access to exclusive member benefits and giveaways when you stake
        $VIRGIN for 30 days.
      </p>
      <Button
        testID={`${testID}.subscribe`}
        size={"small"}
        onClick={() => setIsOpen(true)}
      >
        Become a member
      </Button>
    </div>
  );
};

const TABS = [
  { id: "about", label: "About", Component: AboutSection },
  {
    id: "buy",
    label: "Buy",
    Component: PurchaseSection,
  },
  { id: "faq", label: "FAQ", Component: FAQSection },
  { id: "members", label: "Members", Component: MemberScene },
];

export const LandingScene = ({
  testID = "landing",
}: Readonly<Partial<Common.ComponentProps>>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { connection } = useConnection();
  const { sendTransaction, publicKey } = useWallet();
  const [pending, setPending] = useState(!!publicKey);

  const renderTab = useCallback(
    (index: number) => {
      const { Component, id } = TABS[index];
      return <Component testID={`${testID}.section`} id={id} />;
    },
    [TABS]
  );

  const executeTradeIn = async () => {
    if (!publicKey || !sendTransaction) return;
    const mint = new PublicKey("M1NTik1ex6rm7XFvAzNDuUWddBeYxnQgXY2DbTKzqiB");
    const refundRecipient = new PublicKey(
      "5MfChgQ19yvt7u7r1o2pkSLi6q98wbQoMYNnxBaihUGj"
    );
    const tokenAccount = getAssociatedTokenAddressSync(mint, publicKey, false);
    const transaction = await getMintTradeInTransaction(
      connection,
      tokenAccount,
      mint,
      publicKey,
      refundRecipient
    );

    await sendTransaction(transaction, connection)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <section
      data-testid={testID}
      ref={containerRef}
      className={clsx(styles.frame, styles.cash)}
    >
      <div className={styles.banner}>
        <h1>Shitcoin Exchange</h1>
        <p>
          Still hodling your bag of worthless Solana meme coins? Now you can
          swap any token for a chance to win real prizes!
        </p>
        <div className={styles.list}>
          <PixelCell>Shitcoin burned</PixelCell>
          <PixelCell>Confirming transaction</PixelCell>
          <PixelCell>Awaiting reward mint</PixelCell>
        </div>
        <PixelButton
          testID={`${testID}.exchange`}
          disabled={pending}
          onClick={executeTradeIn}
        >
          Trade-in
        </PixelButton>
        <PixelButton
          testID={`${testID}.exchange`}
          variant="accent"
          onClick={executeTradeIn}
        >
          Cancel
        </PixelButton>
      </div>

      <span data-testid={`${testID}.header`} className={styles.top}>
        <ContractAddress
          testID={`${testID}.mint`}
          label={"CA"}
          mint={MINT.toBase58()}
          className={styles.hero}
        />
      </span>

      <div ref={contentRef} className={styles.content}>
        <span
          className={styles.navigation}
          onClick={() => {
            // TODO: Assign the changing tab component to a ref and scroll into view each time it changes
            contentRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
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
        </span>

        {renderTab(tabIndex)}
      </div>

      <CommandPrompter />
    </section>
  );
};
