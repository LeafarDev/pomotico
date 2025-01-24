import { useEffect } from "react";
import { checkTimerAlreadyStarted } from "./checkTimerAlreadyStarted.ts";
import { getOriginalRemainingTime } from "./getOriginalRemainingTime.ts";
import { AmbienceTracks } from "../../types/components/ConfigTimerFormTypes.ts";
import {
  TimerFocusMode,
  TimerStatusType,
} from "../../types/components/TimerTypes.ts";
import { UseTimerActionsIt } from "../../types/hooks/UseTimerActionsIt.ts";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";
import { UseTimerWorkerIt } from "../../types/hooks/UseTimerWorkerIt.ts";
import { TimerEventDetailIt } from "../../types/webWorker/TimerEventDetailIt.ts";

export const useTimerActions = (
  states: UseTimerStateIt,
  useTimeWorkerActions: UseTimerWorkerIt,
  backgroundPlay: (songValue: AmbienceTracks, testMode: boolean) => void,
): UseTimerActionsIt => {
  const {
    currentTimerState,
    setCurrentTimerState,
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

  const handleTimerCompletion = (skipped = false): TimerStatusType => {
    const updatedHistory = [
      ...histories,
      { ...currentTimerState, endTime: Date.now(), skipped },
    ];
    const nextMode = getNextMode(currentTimerState.mode);
    const remainingTime = getOriginalRemainingTime({
      mode: nextMode,
      profile: currentActiveProfile,
    });
    setHistory(updatedHistory);

    const nextTimer: TimerStatusType = {
      remainingTime,
      isRunning: false,
      skipped: false,
      mode: nextMode,
    };

    setCurrentTimerState(nextTimer);
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
        setCurrentTimerState(timerState);
      }
    }

    if (action === "finished") {
      handleTimerCompletion(false);
    }
  });

  const start = (): void => {
    setLastUpdated(Date.now());

    const alreadyStarted = checkCurrentProfileAlreadyStarted();

    if (!alreadyStarted) {
      const newTimerState = {
        ...currentTimerState,
        isRunning: true,
        startTime: Date.now(),
      };

      setCurrentTimerState(newTimerState);

      startWorker(newTimerState);
    } else {
      const newTimerState = { ...currentTimerState, isRunning: true };
      setCurrentTimerState(newTimerState);
      startWorker(newTimerState);
    }
    backgroundPlay(currentActiveProfile.ambienceSoundTrack, false);
  };

  const pause = (): void => {
    setPausedAt(Date.now());
    setLastUpdated(Date.now());
    pauseWorker();
    setCurrentTimerState({ ...currentTimerState, isRunning: false });
  };
  const checkCurrentProfileAlreadyStarted = () => {
    return checkTimerAlreadyStarted({
      timerStatus: currentTimerState,
      profile: currentActiveProfile,
    });
  };
  const reset = (): void => {
    const remainingTime = getOriginalRemainingTime({
      mode: currentTimerState.mode,
      profile: currentActiveProfile,
    });

    const resetTimerState = {
      ...currentTimerState,
      isRunning: false,
      remainingTime,
    };

    setCurrentTimerState(resetTimerState);

    resetWorker(resetTimerState);
    setLastUpdated(Date.now());
  };

  const skip = (): void => {
    const nextTimer = handleTimerCompletion(true);
    skipWorker(nextTimer);
  };

  useEffect(() => {
    if (currentTimerState.isRunning) {
      setLastUpdated(Date.now());
      resumeWorker(currentTimerState);
    }
  }, []);

  return {
    start,
    pause,
    reset,
    skip,
    checkCurrentProfileAlreadyStarted,
  };
};
