import { useEffect } from "react";
import { AmbienceTracks } from "../../types/components/ConfigTimerFormTypes.ts";
import {
  TimerFocusMode,
  TimerStatusType,
} from "../../types/components/TimerTypes.ts";
import { UseTimerActionsIt } from "../../types/hooks/UseTimerActionsIt.ts";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";
import { UseTimerWorkerIt } from "../../types/hooks/UseTimerWorkerIt.ts";
import { TimerEventDetailIt } from "../../types/webWorker/TimerEventDetailIt.ts";
import { toMilliseconds } from "../../utils/timeUtils";

export const useTimerActions = (
  states: UseTimerStateIt,
  useTimeWorkerActions: UseTimerWorkerIt,
  backgroundPlay: (songValue: AmbienceTracks, testMode: boolean) => void,
): UseTimerActionsIt => {
  const {
    timerState,
    setTimerState,
    histories,
    setHistory,
    setPausedAt,
    currentActiveProfile,
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

  const getNextMode = (mode: TimerFocusMode): TimerFocusMode => {
    const { Focusing, Resting, LongBreak } = TimerFocusMode;
    const { qtySprintForLongBreak } = currentActiveProfile;
    const historiesLength = histories.length;

    if (mode === Focusing) {
      return Resting;
    } else if (mode === Resting) {
      if (historiesLength) {
        const qtyRestsFinished =
          histories.filter((item) => item.mode === Resting).length + 1;

        if (qtyRestsFinished >= qtySprintForLongBreak) {
          const lastLongBreakIndex = histories.findLastIndex(
            (history) => history.mode === LongBreak,
          );

          if (
            lastLongBreakIndex > 0 ||
            qtyRestsFinished === qtySprintForLongBreak
          ) {
            const partialHistories = histories
              .slice(lastLongBreakIndex + 1)
              .filter((item) => item.mode === Resting);

            const qtyRestingPartials = partialHistories.length + 1;
            if (qtyRestingPartials >= qtySprintForLongBreak) {
              return LongBreak;
            }
          }
        }
      }
    }
    return Focusing;
  };

  const getOriginalRemainingTime = (mode: TimerFocusMode): number => {
    const { Resting, LongBreak } = TimerFocusMode;

    switch (mode) {
      case Resting:
        return toMilliseconds(
          currentActiveProfile.restTime.minutes,
          currentActiveProfile.restTime.seconds,
        );
      case LongBreak:
        return toMilliseconds(
          currentActiveProfile.longBreakTime.minutes,
          currentActiveProfile.longBreakTime.seconds,
        );
      default:
        return toMilliseconds(
          currentActiveProfile.sprintTime.minutes,
          currentActiveProfile.sprintTime.seconds,
        );
    }
  };

  const handleTimerCompletion = (skipped = false): TimerStatusType => {
    const updatedHistory = [
      ...histories,
      { ...timerState, endTime: Date.now(), skipped },
    ];
    const nextMode = getNextMode(timerState.mode);
    const remainingTime = getOriginalRemainingTime(nextMode);
    setHistory(updatedHistory);

    const nextTimer: TimerStatusType = {
      remainingTime,
      isRunning: false,
      skipped: false,
      mode: nextMode,
    };

    setTimerState(nextTimer);
    setLastUpdated(Date.now());
    return nextTimer;
  };

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
      handleTimerCompletion(false);
    }
  });

  const start = (): void => {
    setLastUpdated(Date.now());
    const alreadyStarted = checkTimerAlreadyStarted();
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
    backgroundPlay(currentActiveProfile.ambienceSoundTrack, false);
  };

  const pause = (): void => {
    setPausedAt(Date.now());
    setLastUpdated(Date.now());
    pauseWorker();
    setTimerState({ ...timerState, isRunning: false });
  };

  const reset = (): void => {
    const remainingTime = getOriginalRemainingTime(timerState.mode);

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
    const nextTimer = handleTimerCompletion(true);
    skipWorker(nextTimer);
  };

  const checkTimerAlreadyStarted = (): boolean => {
    const { mode: currentMode } = timerState;

    const originalRemainingTime = getOriginalRemainingTime(currentMode);

    return <boolean>(
      (timerState.startTime && timerState.remainingTime < originalRemainingTime)
    );
  };

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
    checkAlreadyStarted: checkTimerAlreadyStarted,
  };
};
