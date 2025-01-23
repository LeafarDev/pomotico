import { useAtom } from "jotai";
import { useState } from "react";
import {
  activeProfile,
  ambianceOptions,
  isConfigModalOpen,
  profileTypes,
  activeProfileTimerData,
} from "../../atoms/Timer";
import {
  AmbienceTracks,
  ProfileType,
} from "../../types/components/ConfigTimerFormTypes";

import { UseFormStateIt } from "../../types/hooks/useProfileForm/UseFormStateIt.ts";

export const useFormStates = (): UseFormStateIt => {
  const [formMode, setFormMode] = useState<"creating" | "updating">("updating");
  const [profiles, setProfiles] = useAtom(profileTypes);
  const [isTestAmbienceButtonDisabled, setIsTestAmbienceButtonDisabled] =
    useState(false);
  const [testAmbienceButtonText, setTestAmbienceButtonText] = useState("Ouvir");
  const [ambianceSoundOptions] = useAtom(ambianceOptions);
  const [currentActiveProfile, setCurrentActiveProfile] =
    useAtom(activeProfile);
  const [currentEditingProfile, setCurrentEditingProfile] =
    useState<ProfileType>();
  const [activeTimer, setActiveTimer] = useAtom(activeProfileTimerData);
  const [ambienceSoundChecked, setAmbienceSoundChecked] = useState(false);
  const [selectedSound, setSelectedSound] = useState<AmbienceTracks>(
    AmbienceTracks.City17,
  );
  const [isModalOpen, setIsModalOpen] = useAtom(isConfigModalOpen);
  const [textNotificationsAllowed, setTextNotificationsAllowed] =
    useState(false);

  return {
    formMode,
    setFormMode,
    profiles,
    setProfiles,
    isTestAmbienceButtonDisabled,
    setIsTestAmbienceButtonDisabled,
    testAmbienceButtonText,
    setTestAmbienceButtonText,
    ambianceSoundOptions,
    currentActiveProfile,
    setCurrentActiveProfile,
    currentEditingProfile,
    setCurrentEditingProfile,
    activeTimer,
    setActiveTimer,
    ambienceSoundChecked,
    setAmbienceSoundChecked,
    selectedSound,
    setSelectedSound,
    isModalOpen,
    setIsModalOpen,
    textNotificationsAllowed,
    setTextNotificationsAllowed,
  };
};
