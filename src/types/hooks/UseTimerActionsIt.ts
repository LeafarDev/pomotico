import { TimerStatusType } from "../components/TimerTypes.ts";

export interface UseTimerActionsIt {
  getStartButtonText: () => string;
  handleTimerCompletion: (skipped?: boolean) => TimerStatusType;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  start: () => void;
}
