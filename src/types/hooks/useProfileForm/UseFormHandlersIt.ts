import { ChangeEvent } from "react";
import { UseFormStateIt } from "./UseFormStateIt.ts";
import {
  currentActiveProfileToFormType,
  ProfileType,
} from "../../components/ConfigTimerFormTypes.ts";

export interface UseFormHandlerProps {
  states: UseFormStateIt;
  resetFormByProfileData: (data: currentActiveProfileToFormType) => void;
  swapProfile: (profile: ProfileType, profiles: ProfileType) => void;
  resetForm: (id: string | undefined) => void;
  closeModal: () => void;
}
export interface UseFormHandlersIt {
  handleCreateNewProfile: () => void;
  handleSelectProfileOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (dataFromForm: currentActiveProfileToFormType) => void;
}
