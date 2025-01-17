import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import Swal from "sweetalert2";
import { useHookFormMask } from "use-mask-input";
import {
  isConfigModalOpen,
  sprintConfigData,
  timerData,
} from "../../atoms/Timer.tsx";
import { sprintFormSchema } from "../../components/Configuration/configTimerFormValidation.ts";
import { SoundNotificationManager } from "../../notifications/soundNotificationManager.ts";
import { TextNotificationManager } from "../../notifications/textNotificationManager.ts";
import { useServiceWorker } from "../../serviceWorker/ServiceWorkerContext.tsx";
import {
  ConfigDataToFormType,
  ConfigDataType,
} from "../../types/components/ConfigTimerFormTypes.ts";
import { TimerFocusMode } from "../../types/components/TimerTypes.ts";
import { UseSprintFormLogicIt } from "../../types/hooks/UseSprintFormLogicIt.ts";
import { toMilliseconds } from "../../utils/timeUtils.ts";
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

export const useSprintFormLogic = (): UseSprintFormLogicIt => {
  const [formData, setFormData] = useAtom(sprintConfigData);
  const [timer, setTimer] = useAtom(timerData);
  const [isModalOpen, setIsModalOpen] = useAtom(isConfigModalOpen);
  const { sw } = useServiceWorker();
  const {
    isPermissionGranted: canSendTextNotification,
    requestPermission: requestTextPermission,
  } = TextNotificationManager(sw);

  const [textNotificationsAllowed, setTextNotificationsAllowed] =
    useState(false);
  const { notify: soundNotify } = SoundNotificationManager(true);

  const handleTextNotificationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.checked) {
      if (sw) {
        const canSend = canSendTextNotification();
        if (!canSend) {
          await requestTextPermission();
        } else {
          setTextNotificationsAllowed(true);
        }
      }
      return;
    }
    setTextNotificationsAllowed(false);
  };

  const handleSoundNotificationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.checked) {
      try {
        await soundNotify.activateNotification();
      } catch (error) {
        console.error("Failed to activate sound notification", error);
      }
    }
  };

  useEffect(() => {
    if (sw) {
      if (formData.allowTextNotifications) {
        setTextNotificationsAllowed(canSendTextNotification());
      } else {
        setTextNotificationsAllowed(false);
      }
    }
  }, [sw]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConfigDataToFormType>({
    resolver: zodResolver(sprintFormSchema),
  });

  const registerWithMask = useHookFormMask<
    ConfigDataToFormType,
    RegisterOptions
  >(register);

  const resetForm = () => {
    if (formData) {
      reset({
        ...formData,
        qtySprintForLongBreak: String(formData.qtySprintForLongBreak),
        sprintTime: {
          minutes: String(formData.sprintTime.minutes),
          seconds: String(formData.sprintTime.seconds),
        },
        restTime: {
          minutes: String(formData.restTime.minutes),
          seconds: String(formData.restTime.seconds),
        },
        longBreakTime: {
          hours: String(formData.longBreakTime.hours),
          minutes: String(formData.longBreakTime.minutes),
          seconds: String(formData.longBreakTime.seconds),
        },
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const onSubmit = (data: ConfigDataToFormType) => {
    const formattedData: ConfigDataType = {
      qtySprintForLongBreak: parseInt(String(data.qtySprintForLongBreak), 10),
      sprintTime: {
        minutes: parseInt(String(data.sprintTime.minutes), 10),
        seconds: parseInt(String(data.sprintTime.seconds), 10),
      },
      restTime: {
        minutes: parseInt(String(data.restTime.minutes), 10),
        seconds: parseInt(String(data.restTime.seconds), 10),
      },
      longBreakTime: {
        hours: parseInt(String(data.longBreakTime.hours), 10),
        minutes: parseInt(String(data.longBreakTime.minutes), 10),
        seconds: parseInt(String(data.longBreakTime.seconds), 10),
      },
      allowSoundNotifications: data.allowSoundNotifications,
      allowTextNotifications: data.allowTextNotifications,
    };

    setFormData(formattedData);

    if (timer.mode === TimerFocusMode.Focusing) {
      const remainingTime = toMilliseconds(
        parseInt(String(data.sprintTime.minutes), 10),
        parseInt(String(data.sprintTime.seconds), 10),
      );
      setTimer({ ...timer, remainingTime });
    } else {
      const remainingTime = toMilliseconds(
        parseInt(String(data.restTime.minutes), 10),
        parseInt(String(data.restTime.seconds), 10),
      );
      setTimer({ ...timer, remainingTime });
    }

    setIsModalOpen(false);
    Toast.fire({
      icon: "success",
      title: "Configurações salvas",
    });
  };

  useEffect(() => {
    if (formData) {
      resetForm();
    }
  }, [formData, reset]);

  return {
    register,
    registerWithMask,
    handleSubmit,
    errors,
    closeModal,
    onSubmit,
    isModalOpen,
    handleTextNotificationChange,
    textNotificationsAllowed,
    handleSoundNotificationChange,
  };
};
