import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ConfigDataToFormType } from "../../types/components/ConfigTimerFormTypes";

export interface UseSprintFormLogicIt {
  register: UseFormRegister<ConfigDataToFormType>;
  registerWithMask: unknown;
  handleSubmit: UseFormHandleSubmit<ConfigDataToFormType>;
  errors: FieldErrors<ConfigDataToFormType>;
  closeModal: () => void;
  onSubmit: (data: ConfigDataToFormType) => void;
  isModalOpen: boolean;
  handleTextNotificationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  textNotificationsAllowed: boolean;
  handleSoundNotificationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
}
