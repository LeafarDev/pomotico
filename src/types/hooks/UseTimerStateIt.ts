import { ConfigDataType } from "../components/ConfigTimerFormTypes.ts";
import { TimerStatusType } from "../components/TimerTypes.ts";

export interface UseTimerStateIt {
  timerState: TimerStatusType;
  setTimerState: (
    timerStatus:
      | TimerStatusType
      | ((prevState: TimerStatusType) => TimerStatusType),
  ) => void;
  history: TimerStatusType[];
  setHistory: (history: TimerStatusType[]) => void;
  pausedAt: number | undefined;
  setPausedAt: (pausedAt: number) => void;
  configData: ConfigDataType;
  lastUpdated: number;
  setLastUpdated: (lastUpdated: number) => void;
}
