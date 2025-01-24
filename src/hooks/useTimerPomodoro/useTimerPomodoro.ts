import { useTimerActions } from "./timerActions.ts";
import { useTimerNotifications } from "./timerNotifications.ts";
import { useTimerState } from "./timerState.ts";
import { useTimerStatusDescriptions } from "./timerStatusDescriptions.ts";
import { useTimerTab } from "./timerTab.ts";
import { useTimerWorker } from "./useTimerWorker.ts";
import { TimerPomodoroIt } from "../../types/hooks/TimerPomodoroIt.ts";
import { useBackgroundSound } from "../useBackgroundSound";
export const useTimerPomodoro = (
  sw: ServiceWorkerRegistration | null,
): TimerPomodoroIt => {
  const states = useTimerState();

  const { currentTimerState, histories, pausedAt } = states;

  const useTimeWorkerActions = useTimerWorker();

  const { backgroundPlay, iframeRef } = useBackgroundSound();

  const actions = useTimerActions(states, useTimeWorkerActions, backgroundPlay);

  const { getStartButtonText, getStatusText, getStatusGif } =
    useTimerStatusDescriptions(
      states,
      actions.checkCurrentProfileAlreadyStarted,
    );

  useTimerNotifications(
    sw,
    currentTimerState,
    histories,
    pausedAt,
    actions.checkCurrentProfileAlreadyStarted,
  );
  useTimerTab(states);

  return {
    start: actions.start,
    pause: actions.pause,
    reset: actions.reset,
    skip: actions.skip,
    startButtonText: getStartButtonText(),
    statusDescriptionText: getStatusText(),
    statusGif: getStatusGif(),
    iframeRef,
  };
};
