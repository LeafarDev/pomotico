import { useAtom } from "jotai";
import {
  lastUpdatedTime,
  pausedTime,
  sprintConfigData,
  sprintHistory,
  timerData,
} from "../../atoms/Timer";

export const useTimerState = () => {
  const [timerState, setTimerState] = useAtom(timerData);
  const [history, setHistory] = useAtom(sprintHistory);
  const [pausedAt, setPausedAt] = useAtom(pausedTime);
  const [configData] = useAtom(sprintConfigData);
  const [lastUpdated, setLastUpdated] = useAtom(lastUpdatedTime);
  return {
    timerState,
    setTimerState,
    history,
    setHistory,
    pausedAt,
    setPausedAt,
    configData,
    lastUpdated,
    setLastUpdated,
  };
};
