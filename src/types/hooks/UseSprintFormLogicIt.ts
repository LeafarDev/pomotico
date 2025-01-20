import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import {
  AmbienceSoundOptions,
  currentActiveProfileToFormType,
  ProfileType,
  tracksValues,
} from "../components/ConfigTimerFormTypes.ts";

export interface UseSprintFormLogicIt {
  formMode: "creating" | "updating";
  closeModal: () => void;
  errors: FieldErrors<currentActiveProfileToFormType>;
  handleSoundNotificationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<currentActiveProfileToFormType>;
  handleTextNotificationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  isModalOpen: boolean;
  onSubmit: (data: currentActiveProfileToFormType) => void;
  register: UseFormRegister<currentActiveProfileToFormType>;
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
  currentEditingProfile: ProfileType | undefined;
  profiles: ProfileType[];
  handleCreateNewProfile: () => void;
  handleSelectProfileOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}
