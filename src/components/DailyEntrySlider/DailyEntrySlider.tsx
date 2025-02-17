import { useDailyGiveaway } from "@/state/giveaways/useDailyGiveaway";
import { ConfirmationSlider } from "../ConfirmationSlider/ConfirmationSlider";
import { useState } from "react";

export const DailyEntrySlider = ({ testID }: Common.ComponentProps) => {
  const [hasEntered, setHasEntered] = useState(false);
  const { pending, draw, enterDraw, errors } = useDailyGiveaway();

  const enterDailyDraw = async (): Promise<boolean> => {
    try {
      if (!draw) throw new Error("No draw available");

      const result = await enterDraw({
        id: "",
        address: "abc123",
        name: "Test",
      });

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
    <ConfirmationSlider
      testID={testID}
      name={"daily"}
      label={`Slide to enter today's draw`}
      onComplete={enterDailyDraw}
      disabled={!draw || pending}
      loading={pending}
    />
  );
};
