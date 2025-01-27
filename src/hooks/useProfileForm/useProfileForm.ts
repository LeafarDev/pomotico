import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, RegisterOptions } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { useAmbienceSoundHandlers } from "./useAmbienceSoundHandlers.ts";
import { UseCloseModal } from "./useCloseModal.ts";
import { useFormHandlers } from "./useFormHandlers.ts";
import { useFormStates } from "./useFormStates.ts";
import { useNotificationHandlers } from "./useNotificationHandlers.ts";
import { UseResetForm } from "./useResetForm.ts";
import { useTimerManagement } from "./useTimerManagement.ts";
import { sprintFormSchema } from "../../components/ProfileConfiguration/configProfileFormValidation.ts";
import { SoundNotificationManager } from "../../notifications/soundNotificationManager.ts";
import { TextNotificationManager } from "../../notifications/textNotificationManager.ts";
import { ProfileToFormDataType } from "../../types/components/ConfigTimerFormTypes.ts";
import { UseProfileFormIt } from "../../types/hooks/useProfileForm/UseSprintFormLogicIt.ts";
import { useBackgroundSound } from "../useBackgroundSound";

export const useProfileForm = (): UseProfileFormIt => {
  const states = useFormStates();

  const { backgroundPlay, backgroundStop } = useBackgroundSound();
  const { notify: soundNotify } = SoundNotificationManager(
    states.currentActiveProfile,
  );
  const {
    isPermissionGranted: canSendTextNotification,
    requestPermission: requestTextPermission,
  } = TextNotificationManager(states.currentActiveProfile);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileToFormDataType>({
    resolver: zodResolver(sprintFormSchema),
  });

  const {
    enableAmbienceTestButton,
    handleButtonTestSound,
    handleSoundChange,
    handleAllowAmbienceSoundChange,
  } = useAmbienceSoundHandlers({
    states,
    backgroundPlay,
    backgroundStop,
  });

  const { resetForm, resetFormByProfileData } = UseResetForm({
    states,
    reset,
    enableAmbienceTestButton,
  });

  const registerWithMask = useHookFormMask<
    ProfileToFormDataType,
    RegisterOptions
  >(register);

  const { swapProfile } = useTimerManagement({
    states,
  });

  const { closeModal } = UseCloseModal({ states, resetForm });

  const { handleTextNotificationChange, handleSoundNotificationChange } =
    useNotificationHandlers({
      states,
      canSendTextNotification,
      requestTextPermission,
      soundNotify,
    });

  const {
    onSubmit,
    handleCreateNewProfile,
    handleSelectProfileOnChange,
    handleDeleteProfile,
  } = useFormHandlers({
    states,
    resetForm,
    resetFormByProfileData,
    swapProfile,
    closeModal,
  });

  return {
    states,
    handleTextNotificationChange,
    handleSoundNotificationChange,
    registerWithMask,
    closeModal,
    handleSubmit,
    register,
    errors,
    onSubmit,
    handleCreateNewProfile,
    handleSelectProfileOnChange,
    handleButtonTestSound,
    handleSoundChange,
    handleAllowAmbienceSoundChange,
    handleDeleteProfile,
  };
};
