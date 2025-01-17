import { useEffect } from "react";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";
import { formatTime } from "../../utils/timeUtils.ts";

export const useTimerTab = (states: UseTimerStateIt): void => {
  const { timerState } = states;

  const updateTab = (remainingTime: number): void => {
    document.title = "Pomotico - " + formatTime(remainingTime);
  };

  useEffect(() => {
    updateTab(timerState.remainingTime);
  }, [timerState.remainingTime]);
};
