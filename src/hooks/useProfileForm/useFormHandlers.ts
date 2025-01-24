import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { defaultProfile } from "../../atoms/Timer.tsx";
import {
  ProfileToFormDataType,
  ProfileType,
} from "../../types/components/ConfigTimerFormTypes.ts";
import {
  TimerFocusMode,
  TimerStatusType,
} from "../../types/components/TimerTypes.ts";
import {
  UseFormHandlerProps,
  UseFormHandlersIt,
} from "../../types/hooks/useProfileForm/UseFormHandlersIt.ts";
import { parseStringTime } from "../../utils/timeUtils.ts";

export const useFormHandlers = ({
  states,
  resetFormByProfileData,
  swapProfile,
  resetForm,
  closeModal,
}: UseFormHandlerProps): UseFormHandlersIt => {
  const { formMode, setFormMode, currentEditingProfile } = states;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSelectProfileOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const selectedProfileId = e.target.value;
    resetForm(selectedProfileId);
  };

  const handleCreateNewProfile = () => {
    setFormMode("creating");
    resetFormByProfileData({
      ...defaultProfile,
      qtySprintForLongBreak: String(defaultProfile.qtySprintForLongBreak),
      id: "",
      title: "",
      sprintTime: {
        minutes: String(defaultProfile.sprintTime.minutes),
        seconds: String(defaultProfile.sprintTime.seconds),
      },
      restTime: {
        minutes: String(defaultProfile.restTime.minutes),
        seconds: String(defaultProfile.restTime.seconds),
      },
      longBreakTime: {
        hours: String(defaultProfile.longBreakTime.hours || 0),
        minutes: String(defaultProfile.longBreakTime.minutes),
        seconds: String(defaultProfile.longBreakTime.seconds),
      },
    });
  };

  const getTimer = (dataFromForm: ProfileToFormDataType): TimerStatusType => {
    if (formMode === "updating") {
      return currentEditingProfile?.timer as TimerStatusType;
    }

    return {
      mode: TimerFocusMode.Focusing,
      skipped: false,
      remainingTime: Number(dataFromForm.sprintTime.minutes) * 60 * 1000,
      isRunning: false,
    };
  };

  const onSubmit = (dataFromForm: ProfileToFormDataType) => {
    const id =
      formMode === "updating" && currentEditingProfile
        ? currentEditingProfile.id
        : uuidv4();

    const newTimer = getTimer(dataFromForm);

    const formattedData: ProfileType = {
      id,
      timer: newTimer,
      title: dataFromForm.title,
      active: dataFromForm.active,
      qtySprintForLongBreak: parseInt(
        String(dataFromForm.qtySprintForLongBreak),
        10,
      ),
      sprintTime: parseStringTime(dataFromForm.sprintTime),
      restTime: parseStringTime(dataFromForm.restTime),
      longBreakTime: parseStringTime(dataFromForm.longBreakTime) as {
        hours: number;
        minutes: number;
        seconds: number;
      },
      allowSoundNotifications: dataFromForm.allowSoundNotifications,
      allowTextNotifications: dataFromForm.allowTextNotifications,
      allowAmbienceSound: dataFromForm.allowAmbienceSound,
      ambienceSoundTrack: dataFromForm.ambienceSoundTrack,
    };

    swapProfile(formattedData);
    closeModal();

    Toast.fire({
      icon: "success",
      title: "Configurações salvas",
    });
  };

  return {
    handleCreateNewProfile,
    onSubmit,
    handleSelectProfileOnChange,
  };
};
