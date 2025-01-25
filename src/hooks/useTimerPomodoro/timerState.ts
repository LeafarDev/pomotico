import { useAtom } from "jotai";
import {
  lastUpdatedTime,
  pausedTime,
  activeProfile,
  profileTypes,
} from "../../atoms/Timer";

import { ProfileType } from "../../types/components/ConfigTimerFormTypes.ts";
import { UseTimerStateIt } from "../../types/hooks/UseTimerStateIt.ts";

export const useTimerState = (): UseTimerStateIt => {
  const [profiles, setProfiles] = useAtom(profileTypes);
  const [pausedAt, setPausedAt] = useAtom(pausedTime);
  const [currentActiveProfile, _setCurrentActiveProfile] =
    useAtom(activeProfile);
  const [lastUpdated, setLastUpdated] = useAtom(lastUpdatedTime);

  const setCurrentActiveProfile = (newProfileValue: ProfileType) => {
    const profilesUpdated = profiles.map((profileItem) => {
      if (profileItem.id === currentActiveProfile.id) {
        return newProfileValue;
      }
      return profileItem;
    });

    setProfiles(profilesUpdated);
    _setCurrentActiveProfile(newProfileValue);
  };

  return {
    pausedAt,
    setPausedAt,
    currentActiveProfile,
    setCurrentActiveProfile,
    lastUpdated,
    setLastUpdated,
  };
};
