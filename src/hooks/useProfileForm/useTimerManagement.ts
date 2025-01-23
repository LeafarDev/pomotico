import { ProfileType } from "../../types/components/ConfigTimerFormTypes.ts";
import { TimerFocusMode } from "../../types/components/TimerTypes.ts";
import { UseFormStateIt } from "../../types/hooks/useProfileForm/UseFormStateIt.ts";
import { UseTimerManagementIt } from "../../types/hooks/useProfileForm/UseTimerManagementIt.ts";
import { toMilliseconds } from "../../utils/timeUtils.ts";
import { useTimerWorker } from "../useTimerPomodoro";

export const useTimerManagement = ({
  states,
}: {
  states: UseFormStateIt;
}): UseTimerManagementIt => {
  const useTimeWorkerActions = useTimerWorker();
  const {
    currentActiveProfile,
    setCurrentActiveProfile,
    setProfiles,
    activeTimer,
    setActiveTimer,
    formMode,
    profiles,
    currentEditingProfile,
  } = states;

  const updateProfilesList = (formattedProfile: ProfileType) => {
    if (formMode === "creating") {
      if (formattedProfile.active) {
        return profiles
          .map((profile) => ({ ...profile, active: false }))
          .concat(formattedProfile);
      }

      return profiles.concat(formattedProfile);
    } else {
      if (formattedProfile.active) {
        return profiles
          .filter((profile) => profile.id !== currentEditingProfile?.id)
          .map((profile) => ({ ...profile, active: false }))
          .concat(formattedProfile);
      }
      return profiles
        .filter((profile) => profile.id !== currentEditingProfile?.id)
        .concat(formattedProfile);
    }
  };

  const swapProfile = (profile: ProfileType, formattedData: ProfileType) => {
    const profiles = updateProfilesList(formattedData);
    if (!profile.active) {
      setProfiles(profiles);
      return;
    }
    useTimeWorkerActions.pauseWorker();
    if (currentActiveProfile.id !== profile.id) {
      const updatedProfiles = profiles.map((item) => {
        if (item.id === currentActiveProfile.id) {
          return {
            ...item,
            timer: activeTimer,
          };
        }
        return item;
      });
      setActiveTimer(profile.timer);
      setCurrentActiveProfile(profile);
      setProfiles(updatedProfiles);
      useTimeWorkerActions.resetWorker(profile.timer);
    } else if (currentActiveProfile.id === profile.id) {
      const mode =
        activeTimer.mode === TimerFocusMode.Focusing
          ? "sprintTime"
          : "restTime";

      if (
        currentActiveProfile[mode].minutes !== profile[mode].minutes ||
        currentActiveProfile[mode].seconds !== profile[mode].seconds
      ) {
        const remainingTime = toMilliseconds(
          parseInt(String(profile[mode].minutes), 10),
          parseInt(String(profile[mode].seconds), 10),
        );

        const updatedTimer = { ...activeTimer, remainingTime };
        setActiveTimer(updatedTimer);
        useTimeWorkerActions.resetWorker(updatedTimer);
      }

      setCurrentActiveProfile(profile);
      setProfiles(profiles);
    }
  };

  return {
    swapProfile,
  };
};
