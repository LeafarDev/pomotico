import { useBackgroundSound } from "./backgroundSound.ts";
import { useTimerActions } from "./timerActions.ts";
import { useTimerNotifications } from "./timerNotifications.ts";
import { useTimerState } from "./timerState.ts";
import { useTimerWorker } from "./useTimerWorker.ts";
import { TimerPomodoroIt } from "../../types/types.ts";

export const useTimerPomodoro = (
  sw: ServiceWorkerRegistration | null,
): TimerPomodoroIt => {
  const states = useTimerState();

  const { timerState, history, pausedAt } = states;

  useTimerNotifications(sw, timerState, history, pausedAt);

  const useTimeWorkerActions = useTimerWorker();

  const { backgroundPlay, iframeRef } = useBackgroundSound();

  const actions = useTimerActions(states, useTimeWorkerActions, backgroundPlay);

  return {
    start: actions.start,
    pause: actions.pause,
    reset: actions.reset,
    skip: actions.skip,
    startButtonText: actions.getStartButtonText(),
    iframeRef,
  };
};
