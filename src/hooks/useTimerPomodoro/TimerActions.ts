import { useEffect } from "react";
import { ConfigDataType, TimerFocusMode, TimerStatusType } from "../../types";
import { toMilliseconds } from "../../utils/timeUtils";

export const useTimerActions = (
  timerState: TimerStatusType,
  setTimerState: (
    timerStatus:
      | TimerStatusType
      | ((prevState: TimerStatusType) => TimerStatusType),
  ) => void,
  setPausedAt: (pausedAt: number) => void,
  history: TimerStatusType[],
  setHistory: (history: TimerStatusType[]) => void,
  configData: ConfigDataType,
) => {
  const start = (): void => {
    const alreadyStarted = checkAlreadyStarted();
    if (!alreadyStarted) {
      setTimerState({
        ...timerState,
        isRunning: true,
        startTime: Date.now(),
      });
    } else {
      setTimerState({ ...timerState, isRunning: true });
    }
  };

  const pause = (): void => {
    setPausedAt(Date.now());
    setTimerState({ ...timerState, isRunning: false });
  };

  const reset = (): void => {
    const remainingTime =
      timerState.mode === TimerFocusMode.Focusing
        ? toMilliseconds(
            configData.sprintTime.minutes,
            configData.sprintTime.seconds,
          )
        : toMilliseconds(
            configData.restTime.minutes,
            configData.restTime.seconds,
          );

    setTimerState({
      ...timerState,
      isRunning: false,
      remainingTime,
    });
  };

  const getStartButtonText = (): string => {
    if (timerState.isRunning) return "Pausar";
    if (timerState.mode === TimerFocusMode.Focusing) {
      return checkAlreadyStarted() ? "Retomar Sprint" : "Iniciar Foco";
    }
    return checkAlreadyStarted() ? "Retomar Descanso" : "Iniciar Descanso";
  };

  const checkAlreadyStarted = (): boolean => {
    const originalRemainingTime =
      timerState.mode === TimerFocusMode.Focusing
        ? toMilliseconds(
            configData.sprintTime.minutes,
            configData.sprintTime.seconds,
          )
        : toMilliseconds(
            configData.restTime.minutes,
            configData.restTime.seconds,
          );

    return <boolean>(
      (timerState.startTime && timerState.remainingTime < originalRemainingTime)
    );
  };

  const handleTimerCompletion = (): TimerStatusType => {
    const updatedHistory = [...history, { ...timerState, endTime: Date.now() }];
    setHistory(updatedHistory);

    const remainingTime =
      timerState.mode === TimerFocusMode.Focusing
        ? toMilliseconds(
            configData.restTime.minutes,
            configData.restTime.seconds,
          )
        : toMilliseconds(
            configData.sprintTime.minutes,
            configData.sprintTime.seconds,
          );

    const mode =
      timerState.mode === TimerFocusMode.Focusing
        ? TimerFocusMode.Resting
        : TimerFocusMode.Focusing;

    return {
      remainingTime,
      isRunning: false,
      mode,
    };
  };

  useEffect(() => {
    const updateTimerEverySecond = (): void => {
      setTimerState((timerStatus) => {
        if (timerStatus.remainingTime <= 1000) {
          return handleTimerCompletion();
        }
        return {
          ...timerStatus,
          remainingTime: timerStatus.remainingTime - 1000,
        };
      });
    };

    if (!timerState.isRunning) return;

    const interval = setInterval(updateTimerEverySecond, 1000);

    return (): void => {
      clearInterval(interval);
    };
  }, [timerState.isRunning, setTimerState, handleTimerCompletion]);

  return {
    start,
    pause,
    reset,
    getStartButtonText,
    handleTimerCompletion,
  };
};
