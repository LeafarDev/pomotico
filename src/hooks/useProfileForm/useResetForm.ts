import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import {
  ProfileToFormDataType,
  ProfileType,
} from "../../types/components/ConfigTimerFormTypes.ts";
import { UseFormStateIt } from "../../types/hooks/useProfileForm/UseFormStateIt.ts";

export const UseResetForm = ({
  states,
  reset,
  enableAmbienceTestButton,
}: {
  states: UseFormStateIt;
  reset: UseFormReset<ProfileToFormDataType>;
  enableAmbienceTestButton: () => void;
}) => {
  const {
    setCurrentEditingProfile,
    profiles,
    setSelectedSound,
    setFormMode,
    setAmbienceSoundChecked,
    currentActiveProfile,
    isModalOpen,
  } = states;

  useEffect(() => {
    if (currentActiveProfile) {
      resetForm(currentActiveProfile.id);
    }
  }, [isModalOpen]);

  const resetForm = (id: string | undefined = undefined) => {
    let profile: ProfileType = currentActiveProfile;
    if (id) {
      profile = profiles.find((profile) => profile.id === id) as ProfileType;
      setCurrentEditingProfile(profile);
      setFormMode("updating");
    } else {
      setCurrentEditingProfile(undefined);
      setFormMode("creating");
    }

    if (profile) {
      if (profile.ambienceSoundTrack) {
        setSelectedSound(profile.ambienceSoundTrack);
      }

      reset({
        ...profile,
        sprintTime: {
          minutes: String(profile.sprintTime.minutes),
          seconds: String(profile.sprintTime.seconds),
        },
        restTime: {
          minutes: String(profile.restTime.minutes),
          seconds: String(profile.restTime.seconds),
        },
        longBreakTime: {
          hours: String(profile.longBreakTime.hours),
          minutes: String(profile.longBreakTime.minutes),
          seconds: String(profile.longBreakTime.seconds),
        },
        qtySprintForLongBreak: String(profile.qtySprintForLongBreak),
      });
      setAmbienceSoundChecked(profile.allowAmbienceSound);
      enableAmbienceTestButton();
    }
  };

  const resetFormByProfileData = (data: ProfileToFormDataType) => {
    reset(data);
  };

  return {
    resetForm,
    resetFormByProfileData,
  };
};
