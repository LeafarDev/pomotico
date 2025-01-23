import React, { ChangeEvent } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { UseFormStateIt } from "./UseFormStateIt.ts";
import { currentActiveProfileToFormType } from "../../components/ConfigTimerFormTypes.ts";

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
  handleSubmit: UseFormHandleSubmit<currentActiveProfileToFormType>;
  register: UseFormRegister<currentActiveProfileToFormType>;
  errors: FieldErrors<currentActiveProfileToFormType>;
  onSubmit: (data: currentActiveProfileToFormType) => void;
  handleCreateNewProfile: () => void;
  handleSelectProfileOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleButtonTestSound: () => void;
  handleSoundChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAllowAmbienceSoundChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}
