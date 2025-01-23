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
import { useServiceWorker } from "../../serviceWorker/ServiceWorkerContext.tsx";
import { currentActiveProfileToFormType } from "../../types/components/ConfigTimerFormTypes.ts";
import { UseProfileFormIt } from "../../types/hooks/useProfileForm/UseSprintFormLogicIt.ts";
import { useBackgroundSound } from "../useBackgroundSound";

export const useProfileForm = (): UseProfileFormIt => {
  const states = useFormStates();
  const { sw } = useServiceWorker();
  const { backgroundPlay, backgroundPause } = useBackgroundSound();
  const { notify: soundNotify } = SoundNotificationManager();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<currentActiveProfileToFormType>({
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
    backgroundPause,
  });
  const {
    isPermissionGranted: canSendTextNotification,
    requestPermission: requestTextPermission,
  } = TextNotificationManager(sw);

  const { resetForm, resetFormByProfileData } = UseResetForm({
    states,
    reset,
    enableAmbienceTestButton,
  });

  const { closeModal } = UseCloseModal({ states, resetForm });

  const registerWithMask = useHookFormMask<
    currentActiveProfileToFormType,
    RegisterOptions
  >(register);

  const { handleTextNotificationChange, handleSoundNotificationChange } =
    useNotificationHandlers({
      states,
      canSendTextNotification,
      requestTextPermission,
      sw,
      soundNotify,
    });

  const { swapProfile } = useTimerManagement({
    states,
  });

  const { onSubmit, handleCreateNewProfile, handleSelectProfileOnChange } =
    useFormHandlers({
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
  };
};
