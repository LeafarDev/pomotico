import { useTimerActions } from "./timerActions.ts";
import { useTimerNotifications } from "./timerNotifications.ts";
import { useTimerState } from "./timerState.ts";
import { TimerPomodoroIt } from "../../types";

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
  } = useTimerState();

  useTimerNotifications(sw, timerState, history, pausedAt);

  const actions = useTimerActions(
    timerState,
    setTimerState,
    setPausedAt,
    history,
    setHistory,
    configData,
  );

  return {
    start: actions.start,
    pause: actions.pause,
    reset: actions.reset,
    skip: actions.skip,
    startButtonText: actions.getStartButtonText(),
  };
};
