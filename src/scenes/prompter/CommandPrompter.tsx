import React, { useEffect, useRef, useState } from "react";
import styles from "./CommandPrompter.module.css";
import clsx from "classnames";
import { createActor } from "xstate";
import { memberOnboardingMachine } from "@/state/onboarding/machines";
import { StepDefinition } from "@/state/onboarding/types";
import { useSession } from "@/providers/Sessions/SessionProvider";

export const CommandPrompter = ({ testID }: Common.ComponentProps) => {
  const actorRef = useRef(createActor(memberOnboardingMachine));
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { showing, loadSession } = useSession();
  const [blocks, setBlocks] = useState<StepDefinition[]>([]);

  useEffect(() => {
    actorRef.current.subscribe((snapshot) => {
      console.log("State change: ", snapshot.value);
      console.log(snapshot.context);
      setBlocks(snapshot.context.blocks);
    });
  }, [actorRef.current]);

  const open = () => {
    dialogRef.current?.showModal();
    actorRef.current.start();
  };

  const close = () => {
    actorRef.current.stop();
    dialogRef.current?.close();
  };

  useEffect(() => {
    if (showing) {
      open();
    } else {
      close();
    }

    return () => {
      close();
    };
  }, [showing]);

  useEffect(() => {
    if (showing) {
      scrollContainer.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [blocks.length, showing]);

  return (
    <dialog ref={dialogRef} className={styles.frame}>
      <div data-testid={`${testID}.header`} className={styles.header}>
        <span data-testid={`${testID}.title`}>LambosForVirgins.exe</span>
        <button
          data-testid={`${testID}.dismiss`}
          onClick={() => {
            loadSession();
            close();
          }}
        >
          close
        </button>
      </div>
      <div
        data-testid={`${testID}.scroller`}
        ref={scrollContainer}
        className={styles.window}
      >
        {blocks.map((block) => (
          <div
            key={block.key}
            data-testid={`${testID}.block`}
            className={clsx(
              styles.block,
              block.align === "center" && styles.center
            )}
          >
            {block.lines.map((line, idx) => (
              <div
                key={`${block.key}.line.${idx}`}
                data-testid={"line"}
                className={styles.output}
              >
                {line}
              </div>
            ))}

            {block.options && (
              <div className={styles.options}>
                {block.options.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      actorRef.current.send({
                        type: option.event,
                        wallet: option.value,
                      });
                    }}
                    disabled={option.disabled}
                    className={clsx(
                      styles.wallet,
                      actorRef.current.getSnapshot().context.wallet?.name ===
                        option.value && styles.selected
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
