import { useTimerActions } from "./timerActions.ts";
import { useTimerNotifications } from "./timerNotifications.ts";
import { useTimerState } from "./timerState.ts";
import { useTimerWorker } from "./useTimerWorker.ts";
import { TimerPomodoroIt } from "../../types/types.ts";

export const useTimerPomodoro = (
  sw: ServiceWorkerRegistration | null,
): TimerPomodoroIt => {
  const {
    timerState,
    setTimerState,
    history,
    setHistory,
    pausedAt,
    setPausedAt,
    configData,
    lastUpdated,
    setLastUpdated,
  } = useTimerState();

  useTimerNotifications(sw, timerState, history, pausedAt);

  const { sendTimeWorkerMessage, onTimeWorkerMessage } = useTimerWorker();

  const actions = useTimerActions(
    timerState,
    setTimerState,
    setPausedAt,
    history,
    setHistory,
    configData,
    lastUpdated,
    setLastUpdated,
    sendTimeWorkerMessage,
    onTimeWorkerMessage,
  );

  return {
    start: actions.start,
    pause: actions.pause,
    reset: actions.reset,
    skip: actions.skip,
    startButtonText: actions.getStartButtonText(),
  };
};
