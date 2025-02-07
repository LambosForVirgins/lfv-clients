import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import Lottie, { AnimationItem } from "lottie-web";
import styles from "./TierSlider.module.css";

interface TierSliderProps extends Common.ComponentProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  animationData: object;
  onChange: (value: number) => void;
}

export const TierSlider = forwardRef<HTMLInputElement, TierSliderProps>(
  ({ min, max, step = 1, animationData, onChange, ...props }, ref) => {
    const lottieRef = useRef<AnimationItem | null>(null);
    const lottieContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (lottieContainerRef.current) {
        lottieRef.current = Lottie.loadAnimation({
          container: lottieContainerRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData,
        });

        lottieRef.current.setDirection(1);
      }

      return () => {
        lottieRef.current?.destroy();
      };
    }, [animationData]);

    useEffect(() => {
      updateAnimation(props.value);
    }, [props.value]);

    const updateAnimation = useCallback(
      (value: number) => {
        if (!lottieRef.current) return;
        // Determine the frame based on the slider completion
        const progress = Math.min(
          Math.max((value - min) / (max - min), 0),
          0.99
        );
        const frame = Math.floor(progress * lottieRef.current.totalFrames);
        // Update the animation frame
        lottieRef.current.goToAndStop(frame, true);
      },
      [lottieRef.current, min, max]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      updateAnimation(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    const completion = (props.value - min) / (max - min);

    return (
      <div data-testid={props.testID} className={styles.frame}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={props.value}
          onChange={handleChange}
        />
        <div
          ref={lottieContainerRef}
          className={styles.player}
          style={{
            left: `${completion * 100}%`,
            transform: `translateX(${-100 * completion}%)`,
          }}
        />
        <span className={styles.channel} data-max={70} data-value={`30%`} />
      </div>
    );
  }
);
