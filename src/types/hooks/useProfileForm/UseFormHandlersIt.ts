import { ChangeEvent } from "react";
import { UseFormStateIt } from "./UseFormStateIt.ts";
import {
  ProfileToFormDataType,
  ProfileType,
} from "../../components/ConfigTimerFormTypes.ts";

export interface UseFormHandlerProps {
  states: UseFormStateIt;
  resetFormByProfileData: (data: ProfileToFormDataType) => void;
  swapProfile: (profile: ProfileType) => void;
  resetForm: (id: string | undefined) => void;
  closeModal: () => void;
}
export interface UseFormHandlersIt {
  handleCreateNewProfile: () => void;
  handleSelectProfileOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (dataFromForm: ProfileToFormDataType) => void;
}
