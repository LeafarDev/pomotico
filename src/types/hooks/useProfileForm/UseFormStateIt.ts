import {
  ProfileType,
  AmbienceTracks,
} from "../../components/ConfigTimerFormTypes.ts";

export interface UseFormStateIt {
  ambianceSoundOptions: {
    author: string;
    description: string;
    label: string;
    url: string;
    value: string;
  }[];
  ambienceSoundChecked: boolean;
  currentActiveProfile: ProfileType;
  currentEditingProfile: ProfileType | undefined;
  formMode: "creating" | "updating";
  isModalOpen: boolean;
  isTestAmbienceButtonDisabled: boolean;
  profiles: ProfileType[];
  selectedSound: AmbienceTracks;
  testAmbienceButtonText: string;
  textNotificationsAllowed: boolean;
  setAmbienceSoundChecked: (
    value: boolean | ((prev: boolean) => boolean),
  ) => void;
  setCurrentActiveProfile: (
    value: ProfileType | ((prev: ProfileType) => ProfileType),
  ) => void;
  setCurrentEditingProfile: (value: ProfileType | undefined) => void;
  setFormMode: (value: "creating" | "updating") => void;
  setIsModalOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  setIsTestAmbienceButtonDisabled: (
    value: boolean | ((prev: boolean) => boolean),
  ) => void;
  setProfiles: (
    value: ProfileType[] | ((prev: ProfileType[]) => ProfileType[]),
  ) => void;
  setSelectedSound: (
    value: AmbienceTracks | ((prev: AmbienceTracks) => AmbienceTracks),
  ) => void;
  setTestAmbienceButtonText: (
    value: string | ((prev: string) => string),
  ) => void;
  setTextNotificationsAllowed: (
    value: boolean | ((prev: boolean) => boolean),
  ) => void;
}
