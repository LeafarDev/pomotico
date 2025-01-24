import { ProfileType } from "../../types/components/ConfigTimerFormTypes.ts";
import { UseFormStateIt } from "../../types/hooks/useProfileForm/UseFormStateIt.ts";
import { UseTimerManagementIt } from "../../types/hooks/useProfileForm/UseTimerManagementIt.ts";
import { useTimerWorker } from "../useTimerPomodoro";
import { checkTimerAlreadyStarted } from "../useTimerPomodoro/checkTimerAlreadyStarted.ts";
import { getOriginalRemainingTime } from "../useTimerPomodoro/getOriginalRemainingTime.ts";

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

  const setProfilesInactive = (formattedProfile: ProfileType) => {
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

  const swapProfile = (profile: ProfileType) => {
    const profiles = setProfilesInactive(profile);
    if (!profile.active) {
      setProfiles(profiles);
      return;
    }

    useTimeWorkerActions.pauseWorker();
    setActiveTimer({ ...activeTimer, isRunning: false });

    if (currentActiveProfile.id !== profile.id) {
      const alreadyStarted = checkTimerAlreadyStarted({
        profile,
        timerStatus: profile.timer,
      });

      if (alreadyStarted) {
        const updatedTimer = { ...profile.timer, isRunning: false };
        setActiveTimer(updatedTimer);
        useTimeWorkerActions.resetWorker(updatedTimer);
      } else {
        const remainingTime = getOriginalRemainingTime({
          profile,
          mode: profile.timer.mode,
        });
        const updatedTimer = {
          ...profile.timer,
          remainingTime,
          isRunning: false,
        };
        setActiveTimer(updatedTimer);
        useTimeWorkerActions.resetWorker(updatedTimer);
      }

      setCurrentActiveProfile(profile);
    } else if (currentActiveProfile.id === profile.id) {
      const alreadyStarted = checkTimerAlreadyStarted({
        profile,
        timerStatus: activeTimer,
      });

      if (!alreadyStarted) {
        const remainingTime = getOriginalRemainingTime({
          profile,
          mode: activeTimer.mode,
        });

        const updatedTimer = {
          ...activeTimer,
          remainingTime,
        };

        setActiveTimer(updatedTimer);
      } else if (activeTimer.isRunning) {
        useTimeWorkerActions.resetWorker(activeTimer);
        useTimeWorkerActions.startWorker(activeTimer);
      }

      setCurrentActiveProfile(profile);
    }
    setProfiles(profiles);
  };

  return {
    swapProfile,
  };
};