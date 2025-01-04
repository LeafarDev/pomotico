import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { sprintConfigData, timerData } from "../../atoms/Timer.tsx";
import { TimerFocusMode, TimerPomodoro, TimerStatus } from "../../types.ts";
import { toMilliseconds } from "../../utils/timeUtils.ts";

export const useTimerPomodoro = (): TimerPomodoro => {
  const [configData] = useAtom(sprintConfigData);
  const [timer, setTimer] = useAtom(timerData);
  const [startButtonText, setstartButtonText] = useState("Iniciar Sprint");

  const checkAlreadyStarted = (): boolean => {
    let originalRemainingtime = toMilliseconds(
      configData.restTime.minutes,
      configData.restTime.seconds,
    );
    if (timer.mode === TimerFocusMode.Focusing) {
      originalRemainingtime = toMilliseconds(
        configData.sprintTime.minutes,
        configData.sprintTime.seconds,
      );
    }
    return timer.remainingTime < originalRemainingtime;
  };

  const getStartButtonText = (
    isRunning: boolean,
    mode: TimerFocusMode,
    alreadyStarted: boolean,
  ): string => {
    if (isRunning) {
      return "Pausar";
    }

    if (mode === TimerFocusMode.Focusing) {
      return alreadyStarted ? "Retomar Sprint" : "Iniciar Sprint";
    }

    return alreadyStarted ? "Retomar Descanso" : "Iniciar Foco";
  };

  useEffect(() => {
    const alreadyStarted = checkAlreadyStarted();
    const buttonText = getStartButtonText(
      timer.isRunning,
      timer.mode,
      alreadyStarted,
    );
    setstartButtonText(buttonText);
  }, [checkAlreadyStarted, timer]);

  const makeNewFocusModeObject = (): TimerStatus => {
    const remainingTime = toMilliseconds(
      configData.sprintTime.minutes,
      configData.sprintTime.seconds,
    );
    return {
      remainingTime,
      isRunning: false,
      mode: TimerFocusMode.Focusing,
    };
  };

  const makeNewRestModeObject = (): TimerStatus => {
    const remainingTime = toMilliseconds(
      configData.restTime.minutes,
      configData.restTime.seconds,
    );
    return {
      remainingTime,
      isRunning: false,
      mode: TimerFocusMode.Resting,
    };
  };

  const handleTimerCompletion = (): TimerStatus => {
    if (timer.mode === TimerFocusMode.Focusing) {
      return makeNewRestModeObject();
    }
    return makeNewFocusModeObject();
  };

  useEffect(() => {
    const updateTimerEverySecond = (): void => {
      setTimer((timerStatus: TimerStatus): TimerStatus => {
        if (timerStatus.remainingTime <= 1000) {
          return handleTimerCompletion();
        }
        return {
          ...timer,
          remainingTime: timerStatus.remainingTime - 1000,
        };
      });
    };

    if (!timer.isRunning) return;

    const interval = setInterval(updateTimerEverySecond, 1000);

    return (): void => clearInterval(interval);
  }, [timer.isRunning, configData]);

  const start = (): void => {
    setTimer({ ...timer, isRunning: true });
  };

  const pause = (): void => setTimer({ ...timer, isRunning: false });

  const reset = (): void => {
    const { sprintTime, restTime } = configData;
    setTimer({ ...timer, isRunning: false });

    if (timer.mode === TimerFocusMode.Focusing) {
      setTimer({
        ...timer,
        remainingTime: toMilliseconds(sprintTime.minutes, sprintTime.seconds),
        isRunning: false,
      });
    } else {
      setTimer({
        ...timer,
        remainingTime: toMilliseconds(restTime.minutes, restTime.seconds),
      });
    }
  };

  return {
    start,
    pause,
    reset,
    startButtonText,
  };
};
