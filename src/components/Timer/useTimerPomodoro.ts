import { useAtom } from "jotai";
import { useEffect } from "react";
import { isRunningAtom, remainingTimeAtom } from "../../atoms/Timer.tsx";
import { TimerPomodoro } from "../../types.ts";

export const useTimerPomodoro = (): TimerPomodoro => {
  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom);
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return (): void => clearInterval(interval);
  }, [isRunning, setIsRunning, setRemainingTime]);

  const start = (): void => setIsRunning(true);
  const pause = (): void => setIsRunning(false);
  const reset = (): void => {
    setIsRunning(false);
    setRemainingTime(25 * 60 * 1000);
  };

  const formatTime = (): string => {
    const minutes = Math.floor(remainingTime / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = ((remainingTime % 60000) / 1000)
      .toFixed(0)
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return {
    remainingTime,
    isRunning,
    start,
    pause,
    reset,
    formatTime,
  };
};
