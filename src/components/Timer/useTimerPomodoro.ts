import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  isRunningAtom,
  remainingTimeAtom,
  sprintConfigData,
} from "../../atoms/Timer.tsx";
import { TimerPomodoro } from "../../types.ts";

export const useTimerPomodoro = (): TimerPomodoro => {
  const [configData, _] = useAtom(sprintConfigData);
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
  }, [isRunning, setIsRunning, setRemainingTime, configData]);

  const secondsToMilliseconds = (seconds: number): number => seconds * 1000;
  const minutesToMilliseconds = (minutes: number): number =>
    minutes * 60 * 1000;

  const start = (): void => setIsRunning(true);

  const pause = (): void => setIsRunning(false);

  const reset = (): void => {
    const { sprintTime } = configData;
    setIsRunning(false);
    const remainingTime =
      secondsToMilliseconds(sprintTime.seconds) +
      minutesToMilliseconds(sprintTime.minutes);
    setRemainingTime(remainingTime);
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
