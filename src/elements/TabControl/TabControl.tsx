import { useState, useRef, useEffect } from "react";

import styles from "./TabControl.module.css";
import clsx from "classnames";

type TabOption<TValue> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

interface TabControlProps<TValue> extends Common.ComponentProps {
  value?: TValue;
  defaultValue?: TValue;
  options?: TabOption<TValue>[];
  dense?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  name: string;
  outline?: boolean;
  background?: boolean;
  variant?: "dot" | "underline";
  onChange?: (value: TValue) => void;
}

export const TabControl = <TValue extends string>({
  testID,
  value,
  defaultValue,
  options = [],
  dense,
  disabled,
  rounded,
  name,
  outline,
  background,
  onChange,
  variant,
}: TabControlProps<TValue>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const isControlled = value !== undefined && onChange !== undefined;
  const [internalValue, setInternalValue] = useState<TValue | undefined>(
    defaultValue
  );

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (containerRef.current) {
      const targetElement =
        containerRef.current.querySelector<HTMLInputElement>(
          'input[type="radio"]:checked'
        );
      if (!targetElement?.parentElement) return;

      adjustLayout(targetElement.parentElement);
    }
  }, [internalValue, dense]);

  const adjustLayout = (targetElement: HTMLElement) => {
    if (!targetElement.parentElement) return;
    const boundingRect = targetElement.getBoundingClientRect();
    const parentRect = targetElement.parentElement.getBoundingClientRect();

    if (indicatorRef.current) {
      // TODO: breaks when resizing screen
      indicatorRef.current.style.width = `${boundingRect.width}px`;
      indicatorRef.current.style.left = `${
        boundingRect.left - parentRect.left
      }px`;
    }
  };

  const handleSelectionChange = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(currentTarget.value as TValue);
    }

    if (onChange) {
      onChange(currentTarget.value as TValue);
    }
  };

  return (
    <div
      data-testid={testID}
      ref={containerRef}
      role={"tablist"}
      className={clsx(
        styles.frame,
        dense && styles.dense,
        outline && styles.outline,
        rounded && styles.rounded,
        background && styles.background,
        variant && styles[variant]
      )}
    >
      <span
        ref={indicatorRef}
        className={clsx(styles.indicator)}
        role={"presentation"}
        aria-hidden
      />
      {options.map((option) => (
        <label key={option.value} id={option.value} role={"presentation"}>
          <input
            type={"radio"}
            id={option.value}
            name={name}
            role={"tab"}
            value={option.value}
            checked={option.value === internalValue}
            aria-label={option.label}
            onChange={handleSelectionChange}
            disabled={option.disabled ?? disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};
