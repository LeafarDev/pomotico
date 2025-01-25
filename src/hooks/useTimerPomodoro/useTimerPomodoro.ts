import { useTimerActions } from "./timerActions.ts";
import { useTimerNotifications } from "./timerNotifications.ts";
import { useTimerState } from "./timerState.ts";
import { useTimerStatusDescriptions } from "./timerStatusDescriptions.ts";
import { useTimerTab } from "./timerTab.ts";
import { useTimerWorker } from "./useTimerWorker.ts";
import { TimerPomodoroIt } from "../../types/hooks/TimerPomodoroIt.ts";
import { useBackgroundSound } from "../useBackgroundSound";
export const useTimerPomodoro = (): TimerPomodoroIt => {
  const states = useTimerState();

  const { currentActiveProfile, pausedAt } = states;

  const useTimeWorkerActions = useTimerWorker();

  const { backgroundPlay, isBackgroundPlaying } = useBackgroundSound();

  const actions = useTimerActions(
    states,
    useTimeWorkerActions,
    backgroundPlay,
    isBackgroundPlaying,
  );

  const { getStartButtonText, getStatusText, getStatusGif } =
    useTimerStatusDescriptions(
      states,
      actions.checkCurrentProfileAlreadyStarted,
    );

  useTimerNotifications(
    currentActiveProfile,
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
  };
};
