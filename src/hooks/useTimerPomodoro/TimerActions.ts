import { useAtom } from "jotai/index";
import { useEffect } from "react";
import { lastUpdatedTime } from "../../atoms/Timer.tsx";
import { ConfigDataType, TimerFocusMode, TimerStatusType } from "../../types";
import { formatTime, toMilliseconds } from "../../utils/timeUtils";

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
  const [lastUpdated, setLastUpdated] = useAtom(lastUpdatedTime);

  const start = (): void => {
    setLastUpdated(Date.now());
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

  const skip = (): void => {
    setTimerState(handleTimerCompletion(true));
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

  const handleTimerCompletion = (skipped = false): TimerStatusType => {
    const updatedHistory = [
      ...history,
      { ...timerState, endTime: Date.now(), skipped },
    ];
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
      skipped: false,
      mode,
    };
  };

  const updateTab = (remainingTime: number): void => {
    document.title = "Pomotico - " + formatTime(remainingTime);
  };

  useEffect(() => {
    const updateTimer = (): void => {
      setTimerState((prevState) => {
        const now = Date.now();
        const elapsedTime = now - lastUpdated;

        if (prevState.remainingTime <= elapsedTime) {
          return handleTimerCompletion();
        }

        setLastUpdated(now);

        const remainingTime = prevState.remainingTime - elapsedTime;
        updateTab(remainingTime);
        return {
          ...prevState,
          remainingTime,
        };
      });
    };

    if (!timerState.isRunning) return;

    const interval = setInterval(updateTimer, 1000);

    return (): void => {
      clearInterval(interval);
    };
  }, [timerState.isRunning, setTimerState, handleTimerCompletion]);

  return {
    start,
    pause,
    reset,
    skip,
    getStartButtonText,
    handleTimerCompletion,
  };
};
