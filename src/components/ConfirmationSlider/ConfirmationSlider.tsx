import styles from "./ConfirmationSlider.module.css";
import clsx from "classnames";
import { useRef, useState } from "react";
import { v4 as generateRandom } from "uuid";

interface ConfirmationSliderProps extends Common.ComponentProps {
  name?: string;
  label: string;
  tolerance?: number;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (percentage: number) => void;
  onComplete?: (metrics: InteractionMetrics) => Promise<boolean>;
}

type InteractionMetrics = {
  name?: string;
  timeStarted: number;
  duration: number;
  turbulence?: number;
  confidence?: number;
};

const DEFAULT_COMPLETION_TOLERANCE = 0.65;

const RESOLUTION = 0.00001;

const MAX_VALUE = 100;

/**
 * The confirmation slider should serve as a
 * Captcha style slider to enter the daily draw
 * and prevent bots from spamming entries.
 *
 * Honeypot: A hidden input field to catch bots who often
 * fill out all fields in a form. If this field is filled
 * the entry is rejected.
 *
 * Seed: Another random code generated to catch bots. If this
 * code is not sent with the entry, the entry is rejected.
 */
export const ConfirmationSlider = ({
  testID,
  tolerance = DEFAULT_COMPLETION_TOLERANCE,
  ...props
}: ConfirmationSliderProps) => {
  const containerRef = useRef<HTMLLabelElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const handleRef = useRef<HTMLOutputElement>(null);
  const mousePosition = useRef<{ x: number; y: number }>();
  const [completion, setCompletion] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [reactionTime, setReactionTime] = useState(0);

  const handleComplete = async () => {
    if (!props.onComplete) return;
    const success = await props.onComplete({
      name: props.name,
      timeStarted: startTime,
      duration: Date.now() - startTime,
    });

    if (!success) {
      updateSliderPosition(0);
    }
  };

  const updateSliderPosition = (position: number) => {
    setCompletion(position);
    if (props.onChange) {
      props.onChange(position);
    }

    if (!handleRef.current || !containerRef.current || !labelRef.current)
      return;

    const boundingWidth = containerRef.current.getBoundingClientRect().width,
      elementSize = handleRef.current.offsetWidth,
      leftPosition = position * (boundingWidth - elementSize);

    labelRef.current.style.opacity = `${tolerance - position}`;
    handleRef.current.style.transform = `translateX(${leftPosition}px)`;
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
    setStartTime(Date.now());
  };

  const deselectSliderHandle = () => {
    if (completion >= tolerance) {
      handleComplete();
      updateSliderPosition(1);
    } else {
      updateSliderPosition(0);
    }
  };

  const handleSlideProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!containerRef.current || !handleRef.current) return;

    const progress = parseFloat(event.target.value) / 100;
    // Store randomness data
    // setRandomness((prev) => [...prev, deltaX]);
    updateSliderPosition(progress);

    if (reactionTime === null) {
      setReactionTime(Date.now() - (startTime || 0));
    }
  };

  return (
    <label
      ref={containerRef}
      data-testid={testID}
      data-seed={generateRandom()}
      htmlFor={props.name}
      className={clsx(
        props.className,
        styles.frame,
        props.loading && styles.loading
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={deselectSliderHandle}
      onMouseLeave={deselectSliderHandle}
    >
      <span ref={labelRef} className={clsx(styles.label, styles.pulse)}>
        {props.label}
      </span>
      <input
        type="range"
        value={completion * MAX_VALUE}
        min={0}
        max={MAX_VALUE}
        step={RESOLUTION}
        name={props.name}
        onChange={handleSlideProgress}
      />
      <output
        ref={handleRef}
        name={`${props.name}-output`}
        htmlFor={props.name}
        data-testid={`${testID}.handle`}
        onMouseDown={handleMouseDown}
        className={styles.handle}
      />
      <input type="checkbox" name="humanity" className={styles.honeypot} />
    </label>
  );
};
