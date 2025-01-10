import { useEffect } from "react";
import {
  ConfigDataType,
  TimerEventDetail,
  TimerFocusMode,
  TimerStatusType,
} from "../../types/types.ts";
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
  lastUpdated: number,
  setLastUpdated: (lastUpdated: number) => void,
  sendTimeWorkerMessage: (message: unknown) => void,
  onTimeWorkerMessage,
) => {
  onTimeWorkerMessage((e: TimerEventDetail) => {
    const { action, value, lastUpdated } = e;
    const timerState = value as TimerStatusType;
    if (lastUpdated) {
      setLastUpdated(lastUpdated);
    }

    if (action === "updateTimer") {
      if (value) {
        setTimerState(timerState);
      }
    }
  });
  const startWorker = (timerState: TimerStatusType) => {
    const now = Date.now();

    setLastUpdated(now);
    sendTimeWorkerMessage({
      action: "start",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };

  const pauseWorker = (timerState: TimerStatusType) => {
    const now = Date.now();
    setLastUpdated(now);
    sendTimeWorkerMessage({
      action: "pause",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };
  const resetWorker = (timerState: TimerStatusType) => {
    const now = Date.now();
    setLastUpdated(now);
    sendTimeWorkerMessage({
      action: "reset",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };

  const skipWorker = (timerState: TimerStatusType) => {
    const now = Date.now();
    setLastUpdated(now);
    sendTimeWorkerMessage({
      action: "skip",
      type: "background",
      value: timerState,
      lastUpdated: now,
    });
  };
  const start = (): void => {
    setLastUpdated(Date.now());
    const alreadyStarted = checkAlreadyStarted();
    if (!alreadyStarted) {
      const newTimerState = {
        ...timerState,
        isRunning: true,
        startTime: Date.now(),
      };

      setTimerState(newTimerState);

      startWorker(newTimerState);
    } else {
      const newTimerState = { ...timerState, isRunning: true };
      setTimerState(newTimerState);
      startWorker(newTimerState);
    }
  };

  const pause = (): void => {
    setPausedAt(Date.now());
    const pausedTimer = { ...timerState, isRunning: false };
    pauseWorker(pausedTimer);
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

    const resetedTimerState = {
      ...timerState,
      isRunning: false,
      remainingTime,
    };

    setTimerState(resetedTimerState);

    resetWorker(resetedTimerState);
  };

  const skip = (): void => {
    const skipedTimer = handleTimerCompletion(true);
    skipWorker(skipedTimer);
    setTimerState(skipedTimer);
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
    updateTab(timerState.remainingTime);
  }, [timerState.remainingTime]);

  useEffect(() => {
    if (timerState.isRunning) {
      startWorker(timerState);
    }
  }, []);

  return {
    start,
    pause,
    reset,
    skip,
    getStartButtonText,
    handleTimerCompletion,
  };
};
