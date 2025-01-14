import styles from "./ConfirmationSlider.module.css";
import clsx from "classnames";
import { useRef, useState } from "react";
import { v4 as generateRandom } from "uuid";

interface ConfirmationSliderProps extends Common.ComponentProps {
  name?: string;
  label: string;
  tolerance?: number;
  className?: string;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);
  const mousePosition = useRef<{ x: number; y: number }>();
  const [completion, setCompletion] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [reactionTime, setReactionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
    setIsActive(true);
    mousePosition.current = { x: event.clientX, y: event.clientY };
    setStartTime(Date.now());
  };

  const deselectSliderHandle = () => {
    setIsActive(false);
    if (completion >= tolerance) {
      handleComplete();
      updateSliderPosition(1);
    } else {
      updateSliderPosition(0);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !isActive ||
      !containerRef.current ||
      !handleRef.current ||
      !mousePosition.current
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect(),
      maxSlide = containerRect.width - handleRef.current.offsetWidth;
    // Calculate new slider position as a percentage
    const deltaX = event.clientX - mousePosition.current.x,
      newSliderPosition = Math.max(0, Math.min(deltaX, maxSlide));
    // Store randomness data
    // setRandomness((prev) => [...prev, deltaX]);
    updateSliderPosition(newSliderPosition / maxSlide);

    if (reactionTime === null) {
      setReactionTime(Date.now() - (startTime || 0));
    }
  };

  return (
    <div
      ref={containerRef}
      data-testid={testID}
      data-seed={generateRandom()}
      className={clsx(
        props.className,
        styles.frame,
        styles.channel,
        props.loading && styles.loading
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={deselectSliderHandle}
      onMouseLeave={deselectSliderHandle}
    >
      <span
        ref={handleRef}
        data-testid={`${testID}.handle`}
        onMouseDown={handleMouseDown}
        className={styles.handle}
      />
      <span ref={labelRef} className={clsx(styles.label, styles.pulse)}>
        {props.label}
      </span>
      <input type="checkbox" name="humanity" className={styles.honeypot} />
    </div>
  );
};
