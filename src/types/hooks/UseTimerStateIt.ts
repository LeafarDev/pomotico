import { ProfileType } from "../components/ConfigTimerFormTypes.ts";
import { TimerStatusType } from "../components/TimerTypes.ts";

export interface UseTimerStateIt {
  currentTimerState: TimerStatusType;
  setCurrentTimerState: (timerStatus: TimerStatusType) => void;
  histories: TimerStatusType[];
  setHistory: (history: TimerStatusType[]) => void;
  pausedAt: number | undefined;
  setPausedAt: (pausedAt: number) => void;
  currentActiveProfile: ProfileType;
  lastUpdated: number;
  setLastUpdated: (lastUpdated: number) => void;
}
