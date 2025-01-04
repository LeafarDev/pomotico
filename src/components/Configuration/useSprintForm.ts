import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useHookFormMask } from "use-mask-input";
import { sprintFormSchema, SprintFormValues } from "./sprintFormValidation.ts";
import { isConfigModalOpen, sprintConfigData } from "../../atoms/Timer.tsx";

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
  const [isModalOpen, setIsModalOpen] = useAtom(isConfigModalOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SprintFormValues>({
    resolver: zodResolver(sprintFormSchema),
  });

  const registerWithMask = useHookFormMask(register);

  const resetForm = () => {
    if (formData) {
      reset({
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

  const onSubmit = (data: SprintFormValues) => {
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
    };

    setFormData(formattedData);

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
    registerWithMask,
    handleSubmit,
    errors,
    closeModal,
    onSubmit,
    isModalOpen,
  };
};
