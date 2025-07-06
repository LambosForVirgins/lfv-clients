import { DrawRound } from "~/state/draws/types";
import { SwipeControl } from "~/elements/SwipeControl";
import { useState } from "react";
import { v4 as generateRandom } from "uuid";

interface DailyEntrySliderProps extends Common.ComponentProps {
  draw: DrawRound | null;
  loading?: boolean;
  enterDraw: (drawId: DrawRound["id"]) => Promise<void>;
}

export const DailyEntrySlider = ({
  testID,
  ...props
}: DailyEntrySliderProps) => {
  const [hasEntered, setHasEntered] = useState(false);

  const enterDailyDraw = async (): Promise<boolean> => {
    try {
      if (!props.draw) throw new Error("No draw available");

      const result = await props.enterDraw(props.draw.id);

      console.log("REsult", JSON.stringify(result, null, " "));
      setHasEntered(true);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  if (hasEntered) {
    return (
      <div>
        <h2>{`You're entered into today's draw!`}</h2>
        <p>{`Come back tomorrow to find out if you've won!`}</p>
      </div>
    );
  }

  return (
    <SwipeControl
      testID={testID}
      name={"daily"}
      label={`Slide to enter today's draw`}
      onComplete={enterDailyDraw}
      disabled={!props.draw || props.loading}
      loading={props.loading}
      honeypot={{ seed: generateRandom() }}
    />
  );
};
