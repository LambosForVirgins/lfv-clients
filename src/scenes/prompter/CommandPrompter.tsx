import React, { useEffect, useRef, useState } from "react";
import styles from "./CommandPrompter.module.css";
import clsx from "classnames";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router";
import { useInitializeAccount } from "@/hooks/useInitializeAccount";

type StepOption<T> = {
  key: string;
  label: string;
  value: T;
  disabled?: boolean;
  onSelect: (value: T) => void;
};

type StepDefinition<T = any> = {
  key: string;
  lines: string[];
  selected?: T;
  options?: StepOption<T>[];
  delay?: number;
  noise?: number;
  align?: "center" | "left" | "right";
  onEnter?: () => void;
};

const isDev = !import.meta.env.PROD;

export const CommandPrompter: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [blockIndex, setBlockIndex] = useState(0);
  const { select, connected, wallet, wallets } = useWallet();
  const { status, initialize, loading } = useInitializeAccount();

  const navigate = useNavigate();

  // TODO: This is the worst shit I've seen in my life
  const loadingSteps: StepDefinition[] = [
    {
      key: "initialize",
      lines: [
        "\n",
        " __       ________ __     __ ",
        "|  \\     |        \\  \\   |  \\",
        "| ▓▓     | ▓▓▓▓▓▓▓▓ ▓▓   | ▓▓",
        "| ▓▓     | ▓▓__   | ▓▓   | ▓▓",
        "| ▓▓     | ▓▓  \\   \\▓▓\\ /  ▓▓",
        "| ▓▓     | ▓▓▓▓▓    \\▓▓\\  ▓▓ ",
        "| ▓▓_____| ▓▓        \\▓▓ ▓▓  ",
        "| ▓▓     \\ ▓▓         \\▓▓▓   ",
        " \\▓▓▓▓▓▓▓▓\\▓▓          \\▓    ",
        "\n",
      ],
      delay: 500,
      noise: 0.8,
      align: "center",
    },
    {
      key: "outlineMission",
      lines: [
        "Project:       LambosForVirgins",
        "Symbol:        $VIRGIN",
        "\n",
        "Objective:",
        "The virginity pandemic is in full effect and the world's population is in decline.",
        "\n",
        "Mission:",
        "Cure virginity, one lambo at a time.",
        "\n",
      ],
      delay: 1000,
    },
    {
      key: "establishConnection",
      lines: ["Establishing connection...", "\n"],
      delay: 2000,
    },
    {
      key: "selectWallet",
      lines: ["Please select a wallet below."],
      selected: wallet?.adapter.name,
      options: wallets.map(({ adapter, readyState }) => ({
        key: adapter.name,
        label: adapter.name,
        value: adapter.name,
        disabled: readyState === "NotDetected",
        onSelect: () => {
          select(adapter.name);
        },
      })),
      delay: 2000,
    },
    {
      key: "initializeMember",
      lines: ["Initializing ascension protocol..."],
      // options: [
      //   {
      //     key: "initialize",
      //     label: "Initialize",
      //     value: "initialize",
      //     disabled: loading,
      //     onSelect: () => {
      //       initialize();
      //     },
      //   },
      // ],
      onEnter: () => {
        if (status !== undefined) return;
        initialize().catch((err) => {
          console.error(err);
          setBlockIndex((prev) => prev - 1);
        });
      },
      delay: 1000,
    },
    {
      key: "loadingMember",
      lines: ["Checking virginity..."],
      delay: 5000,
    },
    {
      key: "loadingResult",
      lines: ["Loading lambos..."],
      delay: 2000,
    },
  ];

  if (isDev) {
    loadingSteps.push(
      {
        key: "checkVirginity",
        lines: ["Checking virginity...", "Virgin confirmed"],
        delay: 5000,
      },
      { key: "requestTokens", lines: ["Requesting tokens..."], delay: 3000 }
    );
  }

  useEffect(() => {
    open();

    return () => {
      // cleanupTerminal();
      close();
    };
  }, []);

  useEffect(() => {
    if (status !== undefined) {
      navigate("/giveaways");
    }
  }, [status]);

  useEffect(() => {
    if (loadingSteps[blockIndex]?.onEnter) {
      loadingSteps[blockIndex].onEnter();
    }
  }, [blockIndex]);

  useEffect(() => {
    const getStep = () => {
      if (status !== undefined) {
        return loadingSteps.findIndex(({ key }) => key === "redirect");
      } else if (loading) {
        return loadingSteps.findIndex(({ key }) => key === "loadingMember");
      } else if (connected && !status) {
        return loadingSteps.findIndex(({ key }) => key === "initializeMember");
      } else if (!wallet) {
        return loadingSteps.findIndex(({ key }) => key === "selectWallet");
      }

      return loadingSteps.findIndex(({ key }) => key === "establishConnection");
    };

    const nextStep = getStep();
    if (nextStep !== -1 && nextStep !== blockIndex) {
      const step = loadingSteps[nextStep];
      setTimeout(() => {
        setBlockIndex(nextStep);
      }, step.delay || 0);
    }
  }, [wallet, connected, status, loading]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <dialog ref={dialogRef} className={styles.frame}>
      <div className={styles.header}>
        <span>LambosForVirgins.exe</span>
        <button onClick={close}>close</button>
      </div>
      <div className={styles.window}>
        {loadingSteps.slice(0, blockIndex + 1).map((message) => (
          <div
            key={message.key}
            data-testid={"block"}
            className={clsx(
              styles.block,
              message.align === "center" && styles.center
            )}
          >
            {message.lines.map((line, i) => (
              <div
                key={`${message.key}.${i}`}
                data-testid={"line"}
                className={styles.output}
              >
                {line}
              </div>
            ))}

            {message.options && (
              <div className={styles.options}>
                {message.options.map((option) => (
                  <button
                    key={option.key}
                    onClick={option.onSelect}
                    disabled={option.disabled}
                    className={clsx(
                      styles.wallet,
                      message.selected === option.value && styles.selected
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </dialog>
  );
};
