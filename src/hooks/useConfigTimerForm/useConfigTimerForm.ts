import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useHookFormMask } from "use-mask-input";
import { sprintFormSchema } from "./configTimerFormValidation.ts";
import {
  isConfigModalOpen,
  sprintConfigData,
  timerData,
} from "../../atoms/Timer.tsx";
import { SoundNotificationManager } from "../../Notifications/soundNotificationManager.ts";
import { TextNotificationManager } from "../../Notifications/textNotificationManager.ts";
import { useServiceWorker } from "../../ServiceWorker/ServiceWorkerContext.tsx";
import {
  ConfigDataToFormType,
  ConfigDataType,
  TimerFocusMode,
} from "../../types.ts";
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

export const useSprintFormLogic = () => {
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
  ) => {
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
  ) => {
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
  }, [sw, formData.allowSoundNotifications]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConfigDataToFormType>({
    resolver: zodResolver(sprintFormSchema),
  });

  const registerWithMask = useHookFormMask(register);

  const resetForm = () => {
    if (formData) {
      reset({
        ...formData,
        sprintGoal: String(formData.sprintGoal),
        sprintTime: {
          minutes: String(formData.sprintTime.minutes),
          seconds: String(formData.sprintTime.seconds),
        },
        restTime: {
          minutes: String(formData.restTime.minutes),
          seconds: String(formData.restTime.seconds),
        },
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const onSubmit = (data: ConfigDataToFormType) => {
    const formattedData = {
      sprintGoal: parseInt(String(data.sprintGoal), 10),
      sprintTime: {
        minutes: parseInt(String(data.sprintTime.minutes), 10),
        seconds: parseInt(String(data.sprintTime.seconds), 10),
      },
      restTime: {
        minutes: parseInt(String(data.restTime.minutes), 10),
        seconds: parseInt(String(data.restTime.seconds), 10),
      },
      allowSoundNotifications: data.allowSoundNotifications,
      allowTextNotifications: data.allowTextNotifications,
    } as ConfigDataType;

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
