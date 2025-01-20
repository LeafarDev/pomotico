import { useAtom } from "jotai";
import {
  lastUpdatedTime,
  pausedTime,
  activeProfile,
  sprintHistory,
  activeProfileTimerData,
} from "../../atoms/Timer";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";

export const useTimerState = (): UseTimerStateIt => {
  const [timerState, setTimerState] = useAtom(activeProfileTimerData);
  const [history, setHistory] = useAtom(sprintHistory);
  const [pausedAt, setPausedAt] = useAtom(pausedTime);
  const [currentActiveProfile] = useAtom(activeProfile);
  const [lastUpdated, setLastUpdated] = useAtom(lastUpdatedTime);

  return {
    timerState,
    setTimerState,
    histories: history,
    setHistory,
    pausedAt,
    setPausedAt,
    currentActiveProfile,
    lastUpdated,
    setLastUpdated,
  };
};
