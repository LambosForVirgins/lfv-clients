import { useEffect, useRef, useState } from "react";

interface CountdownOptions {
  startDate?: Date;
  targetDate: Date;
}

export const useCountdown = ({
  startDate = new Date(),
  targetDate,
}: CountdownOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Initialize the countdown
    const updateCountdown = () => {
      const timeSpan = Math.max(targetDate.getTime() - startDate.getTime(), 0);
      const elapsed = Date.now() - startDate.getTime();

      setProgress(Math.min(1, elapsed / timeSpan));
    };
    // Update the countdown immediately
    updateCountdown();
    // Set up the timer based on the remaining time
    const startTimer = () => {
      const now = new Date();
      const timeDifference = targetDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        updateCountdown();
        return;
      }
      // Set interval based on remaining time
      const interval = timeDifference > 60 * 1000 ? 60 * 1000 : 1000; // 1 minute or 1 second
      timerRef.current = setInterval(updateCountdown, interval);
    };

    startTimer();
    // Cleanup on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [targetDate]);

  return {
    progress,
  };
};
