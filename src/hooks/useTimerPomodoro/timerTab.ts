import { useEffect } from "react";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";
import { formatTime } from "../../utils/timeUtils.ts";

export const useTimerTab = (states: UseTimerStateIt): void => {
  const { currentActiveProfile } = states;

  const updateTab = (remainingTime: number): void => {
    document.title = "Pomotico - " + formatTime(remainingTime);
  };

  useEffect(() => {
    updateTab(currentActiveProfile.timer.remainingTime);
  }, [currentActiveProfile.timer.remainingTime]);
};
