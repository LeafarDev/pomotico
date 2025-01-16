import { useEffect } from "react";
import {
  TimerFocusMode,
  TimerStatusType,
} from "../../types/components/TimerTypes.ts";
import { UseTimerActionsIt } from "../../types/hooks/UseTimerActionsIt.ts";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";
import { UseTimerWorkerIt } from "../../types/hooks/UseTimerWorkerIt.ts";
import { formatTime, toMilliseconds } from "../../utils/timeUtils";
import { TimerEventDetailIt } from "../../types/webWorker/TimerEventDetailIt.ts";

export const useTimerActions = (
  states: UseTimerStateIt,
  useTimeWorkerActions: UseTimerWorkerIt,
  backgroundPlay: () => void,
): UseTimerActionsIt => {
  const {
    timerState,
    setTimerState,
    history,
    setHistory,
    setPausedAt,
    configData,
    setLastUpdated,
  } = states;

  const {
    skipWorker,
    onTimeWorkerMessage,
    startWorker,
    resetWorker,
    pauseWorker,
    resumeWorker,
  } = useTimeWorkerActions;

  onTimeWorkerMessage((e: TimerEventDetailIt) => {
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

    if (action === "finished") {
      const finishedTimer = handleTimerCompletion(false);
      setTimerState(finishedTimer);
    }
  });

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
    backgroundPlay();
  };

  const pause = (): void => {
    setPausedAt(Date.now());
    setLastUpdated(Date.now());
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

    const resetTimerState = {
      ...timerState,
      isRunning: false,
      remainingTime,
    };

    setTimerState(resetTimerState);

    resetWorker(resetTimerState);
    setLastUpdated(Date.now());
  };

  const skip = (): void => {
    const skippedTimer = handleTimerCompletion(true);
    skipWorker(skippedTimer);
    setLastUpdated(Date.now());
    setTimerState(skippedTimer);
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
      setLastUpdated(Date.now());
      resumeWorker(timerState);
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
