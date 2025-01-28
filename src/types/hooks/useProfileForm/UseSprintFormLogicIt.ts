import React, { ChangeEvent } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { UseFormStateIt } from "./UseFormStateIt.ts";
import { ProfileToFormDataType } from "../../components/ConfigTimerFormTypes.ts";

export interface UseProfileFormIt {
  states: UseFormStateIt;
  handleTextNotificationChange: (
    e: ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  handleSoundNotificationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  registerWithMask: ReturnType<typeof useHookFormMask>;
  closeModal: () => void;
  handleSubmit: UseFormHandleSubmit<ProfileToFormDataType>;
  register: UseFormRegister<ProfileToFormDataType>;
  errors: FieldErrors<ProfileToFormDataType>;
  onSubmit: (data: ProfileToFormDataType) => void;
  handleCreateNewProfile: () => void;
  handleDeleteProfile: () => Promise<void>;
  handleSelectProfileOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleButtonTestSound: () => void;
  handleSoundChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAllowAmbienceSoundChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}
