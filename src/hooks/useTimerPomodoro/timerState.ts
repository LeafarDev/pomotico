import { useAtom } from "jotai";
import {
  lastUpdatedTime,
  pausedTime,
  activeProfile,
  sprintHistory,
  profileTypes,
  activeProfileTimerData,
} from "../../atoms/Timer";

import { TimerStatusType } from "../../types/components/TimerTypes.ts";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";

export const useTimerState = (): UseTimerStateIt => {
  const [currentTimerState, _setCurrentTimerState] = useAtom(
    activeProfileTimerData,
  );
  const [profiles, setProfiles] = useAtom(profileTypes);
  const [history, setHistory] = useAtom(sprintHistory);
  const [pausedAt, setPausedAt] = useAtom(pausedTime);
  const [currentActiveProfile, setCurrentActiveProfile] =
    useAtom(activeProfile);
  const [lastUpdated, setLastUpdated] = useAtom(lastUpdatedTime);

  const setCurrentTimerState = (newTimerValue: TimerStatusType) => {
    _setCurrentTimerState(newTimerValue);
    const profilesUpdated = profiles.map((profileItem) => {
      if (profileItem.id === currentActiveProfile.id) {
        return { ...profileItem, timer: newTimerValue };
      }
      return profileItem;
    });
    setProfiles(profilesUpdated);
    setCurrentActiveProfile({
      ...currentActiveProfile,
      timer: newTimerValue,
    });
  };

  return {
    currentTimerState,
    setCurrentTimerState,
    histories: history,
    setHistory,
    pausedAt,
    setPausedAt,
    currentActiveProfile,
    lastUpdated,
    setLastUpdated,
  };
};
