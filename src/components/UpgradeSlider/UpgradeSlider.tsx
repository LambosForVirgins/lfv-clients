import { useEffect, useState } from "react";
import TierSlider from "../TierSlider/TierSlider";

interface SubscriptionTierSlider extends Common.ComponentProps {
  currentBalance: number;
}

export const UpgradeSlider = ({ testID, ...props }: SubscriptionTierSlider) => {
  const [balance, setBalance] = useState<number>(props.currentBalance);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const resolution = 100; //Should be number of frames in the lottie animation

  useEffect(() => {
    const loadAnimation = async () => {
      const data = await import("../../../public/lottie/evolution.json");
      setAnimationData(data.default || data);
    };

    loadAnimation();
  }, []);

  return (
    <div data-testid={testID}>
      <h1>{balance}</h1>
      {animationData ? (
        <TierSlider
          testID={`${testID}.slider`}
          step={10_000}
          min={1000}
          max={5_000_000}
          animationData={animationData}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
