import { ProfileType } from "../components/ConfigTimerFormTypes.ts";

export interface UseTimerStateIt {
  setCurrentActiveProfile: (newProfileValue: ProfileType) => void;
  pausedAt: number | undefined;
  setPausedAt: (pausedAt: number) => void;
  currentActiveProfile: ProfileType;
  lastUpdated: number;
  setLastUpdated: (lastUpdated: number) => void;
}
