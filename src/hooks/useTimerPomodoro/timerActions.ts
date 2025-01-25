import { useEffect } from "react";
import Swal from "sweetalert2";
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
  isBackgroundPlaying: () => boolean,
): UseTimerActionsIt => {
  const {
    setPausedAt,
    currentActiveProfile,
    setCurrentActiveProfile,
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
    const { history, qtySprintForLongBreak } = currentActiveProfile;
    const { Focusing, Resting, LongBreak } = TimerFocusMode;

    if (mode === Focusing) return Resting;

    if (mode === Resting) {
      const completedRests =
        history.filter((item) => item.mode === Resting).length + 1;

      if (completedRests >= qtySprintForLongBreak) {
        const lastLongBreakIndex = history.findLastIndex(
          (h) => h.mode === LongBreak,
        );
        const recentRests = history
          .slice(lastLongBreakIndex + 1)
          .filter((item) => item.mode === Resting);

        if (recentRests.length + 1 >= qtySprintForLongBreak) {
          return LongBreak;
        }
      }
    }

    return Focusing;
  };

  const handleTimerCompletion = (skipped = false): TimerStatusType => {
    const { history, timer } = currentActiveProfile;
    const updatedHistory = [
      ...history,
      { ...timer, endTime: Date.now(), skipped },
    ];
    const nextMode = getNextMode(timer.mode);
    const remainingTime = getOriginalRemainingTime({
      mode: nextMode,
      profile: currentActiveProfile,
    });

    const nextTimer: TimerStatusType = {
      remainingTime,
      isRunning: false,
      skipped: false,
      mode: nextMode,
    };

    setLastUpdated(Date.now());
    setCurrentActiveProfile({
      ...currentActiveProfile,
      history: updatedHistory,
      timer: nextTimer,
    });

    return nextTimer;
  };

  const checkCurrentProfileAlreadyStarted = () => {
    const { timer } = currentActiveProfile;
    return checkTimerAlreadyStarted({
      timerStatus: timer,
      profile: currentActiveProfile,
    });
  };

  const start = (): void => {
    const { timer } = currentActiveProfile;
    const alreadyStarted = checkCurrentProfileAlreadyStarted();

    const newTimerState = {
      ...timer,
      isRunning: true,
      startTime: alreadyStarted ? timer.startTime : Date.now(),
    };

    setLastUpdated(Date.now());
    setCurrentActiveProfile({ ...currentActiveProfile, timer: newTimerState });
    startWorker(newTimerState);
    backgroundPlay(currentActiveProfile.ambienceSoundTrack, false);
  };

  const pause = (): void => {
    const { timer } = currentActiveProfile;

    setPausedAt(Date.now());
    setLastUpdated(Date.now());
    pauseWorker();
    setCurrentActiveProfile({
      ...currentActiveProfile,
      timer: { ...timer, isRunning: false },
    });
  };

  const reset = (): void => {
    const { timer } = currentActiveProfile;
    const remainingTime = getOriginalRemainingTime({
      mode: timer.mode,
      profile: currentActiveProfile,
    });

    const resetTimerState = { ...timer, isRunning: false, remainingTime };

    setLastUpdated(Date.now());
    setCurrentActiveProfile({
      ...currentActiveProfile,
      timer: resetTimerState,
    });
    resetWorker(resetTimerState);
  };

  const skip = (): void => {
    const nextTimer = handleTimerCompletion(true);
    skipWorker(nextTimer);
  };

  const interactionPrompt = Swal.mixin({
    toast: true,
    title: "Iniciar som ambiente?",
    showCancelButton: true,
    timer: 8000,
    timerProgressBar: true,
    confirmButtonText: "sim",
    cancelButtonText: "Agora não",
    allowOutsideClick: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    if (currentActiveProfile.allowAmbienceSound && !isBackgroundPlaying()) {
      const showInteractionPrompt = async () => {
        const result = await interactionPrompt.fire();
        if (result.isConfirmed) {
          backgroundPlay(currentActiveProfile.ambienceSoundTrack, false);
        }
      };
      showInteractionPrompt();
    }
  }, []);

  useEffect(() => {
    const { timer } = currentActiveProfile;

    if (timer.isRunning) {
      setLastUpdated(Date.now());
      resumeWorker(timer);
    }
  }, []);

  onTimeWorkerMessage((e: TimerEventDetailIt) => {
    const { action, value, lastUpdated } = e;

    if (lastUpdated) setLastUpdated(lastUpdated);

    if (action === "updateTimer" && value) {
      setCurrentActiveProfile({
        ...currentActiveProfile,
        timer: value as TimerStatusType,
      });
    }

    if (action === "finished") {
      handleTimerCompletion(false);
    }
  });

  return { start, pause, reset, skip, checkCurrentProfileAlreadyStarted };
};
