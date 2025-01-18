import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import {
  AmbienceSoundOptions,
  ConfigDataToFormType,
  tracksValues,
} from "../components/ConfigTimerFormTypes.ts";

export interface UseSprintFormLogicIt {
  closeModal: () => void;
  errors: FieldErrors<ConfigDataToFormType>;
  handleSoundNotificationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<ConfigDataToFormType>;
  handleTextNotificationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  isModalOpen: boolean;
  onSubmit: (data: ConfigDataToFormType) => void;
  register: UseFormRegister<ConfigDataToFormType>;
  registerWithMask: ReturnType<typeof useHookFormMask>;
  textNotificationsAllowed: boolean;
  ambianceSoundOptions: AmbienceSoundOptions;
  handleTestSound: () => void;
  handleSoundChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAllowAmbienceSoundChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  ambienceSoundChecked: boolean;
  selectedSound: tracksValues;
  isTestAmbienceButtonDisabled: boolean;
  testAmbienceButtonText: string;
}
