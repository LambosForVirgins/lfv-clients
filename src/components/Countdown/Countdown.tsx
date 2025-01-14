import { format } from "date-fns/format";
import { useEffect, useRef, useState } from "react";

interface CountdownProps {
  timeRemaining?: number;
  onComplete?: () => void;
}

const formatRemainingSeconds = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return format(date, "mm:ss");
};

export const Countdown = ({
  timeRemaining: initialTimeRemaining = 0,
  ...props
}: CountdownProps) => {
  const startTimeRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const [timeRemaining, setTimeRemaining] =
    useState<number>(initialTimeRemaining);

  useEffect(() => {
    const updateCountdown = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const newTimeLeft = Math.max(initialTimeRemaining - elapsed, 0);

      setTimeRemaining(newTimeLeft);

      if (newTimeLeft > 0) {
        animationFrameId.current = requestAnimationFrame(updateCountdown);
      } else {
        props.onComplete?.();
      }
    };

    animationFrameId.current = requestAnimationFrame(updateCountdown);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initialTimeRemaining]);

  return (
    <h2 className="text-2xl font-bold">
      {timeRemaining > 0
        ? `Closes ${formatRemainingSeconds(timeRemaining)}`
        : "Closed"}
    </h2>
  );
};
