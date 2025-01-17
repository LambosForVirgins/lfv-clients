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
  min: number;
  max: number;
  step?: number;
  animationData: object;
  onChange?: (value: number) => void;
}

const TierSlider = forwardRef<HTMLInputElement, TierSliderProps>(
  ({ min, max, step = 1, animationData, onChange, ...props }, ref) => {
    const lottieRef = useRef<AnimationItem | null>(null);
    const lottieContainerRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<number>(min);

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

    const updateAnimation = useCallback(
      (value: number) => {
        if (!lottieRef.current) return;
        // Determine the frame based on the slider completion
        const progress = (value - min) / (max - min);
        const frame = Math.floor(progress * lottieRef.current.totalFrames);
        // Update the animation frame
        lottieRef.current.goToAndStop(frame, true);
      },
      [lottieRef.current, min, max]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      setValue(newValue);
      updateAnimation(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <div data-testid={props.testID} className={styles.frame}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />
        <div
          ref={lottieContainerRef}
          className={styles.player}
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
    );
  }
);

export default TierSlider;
