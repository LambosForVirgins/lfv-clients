import React, { useEffect, useRef, useState } from "react";
import styles from "./CommandPrompt.module.css";
import clsx from "classnames";
import { StepFunction } from "./types";

interface CommandPromptProps extends Common.ComponentProps {
  title?: string;
  steps: StepFunction[];
  onDismiss: () => void;
  onComplete?: () => void;
}

export const CommandPrompt = ({
  testID,
  steps = [],
  ...props
}: CommandPromptProps) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (steps[stepIndex]) {
      steps[stepIndex]();
      setStepIndex(stepIndex + 1);
    }

    scrollContainer.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [stepIndex]);

  return (
    <div data-testid={testID} className={styles.frame}>
      <div data-testid={`${testID}.header`} className={styles.header}>
        <span data-testid={`${testID}.title`}>
          {props.title || "LambosForVirgins.exe"}
        </span>
        <button data-testid={`${testID}.dismiss`} onClick={props.onDismiss}>
          close
        </button>
      </div>
      <div
        data-testid={`${testID}.window`}
        ref={scrollContainer}
        className={styles.window}
      >
        {steps.slice(0, stepIndex + 1).map((fn) => {
          const block = fn();

          return (
            <div
              key={block.key}
              data-testid={"block"}
              className={clsx(
                styles.block,
                block.align === "center" && styles.center
              )}
            >
              {block.lines.map((line) => (
                <div
                  key={block.key}
                  data-testid={"line"}
                  className={styles.output}
                >
                  {line}
                </div>
              ))}

              {block.options && (
                <fieldset
                  data-testid={`${testID}.options`}
                  className={styles.options}
                >
                  {block.options.map((option) => (
                    <label
                      key={option.key}
                      htmlFor={option.key}
                      onClick={option.onSelect}
                      className={clsx(styles.wallet)}
                    >
                      <input
                        type="radio"
                        name={option.key}
                        disabled={option.disabled}
                        checked={block.selected === option.value}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </fieldset>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
