import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import Lottie from "lottie-web";
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
    const rangeRef = useRef<HTMLInputElement>(null);
    const lottieRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<number>(min);

    // Expose the range ref to parent if needed
    // useImperativeHandle(ref, () => ({
    //   setValue: (newValue: number) => {
    //     if (rangeRef.current) {
    //       rangeRef.current.value = newValue.toString();
    //       updateAnimation(newValue);
    //       setValue(newValue);
    //     }
    //   },
    // }));

    useEffect(() => {
      // Initialize Lottie animation
      if (lottieRef.current) {
        Lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData,
        });
      }

      return () => {
        Lottie.destroy();
      };
    }, [animationData]);

    const updateAnimation = (value: number) => {
      if (lottieRef.current) {
        const progress = (value - min) / (max - min);
        Lottie.setDirection(1);
        // @ts-expect-error - goToAndStop is not defined
        Lottie.goToAndStop(progress * 100, true);
      }
    };

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
          ref={rangeRef}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          style={{
            position: "absolute",
            width: "100%",
            appearance: "none",
            background: "transparent",
            pointerEvents: "all",
            zIndex: 1,
          }}
        />
        <div
          ref={lottieRef}
          style={{
            position: "absolute",
            left: `${((value - min) / (max - min)) * 100}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 2,
            width: "50px",
            height: "50px",
          }}
        />
      </div>
    );
  }
);

export default TierSlider;
