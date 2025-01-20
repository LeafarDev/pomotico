import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import Swal from "sweetalert2";
import { useHookFormMask } from "use-mask-input";
import { v4 as uuidv4 } from "uuid";
import {
  activeProfile,
  ambianceOptions,
  defaultProfile,
  isConfigModalOpen,
  profileTypes,
  activeProfileTimerData,
  defaultTimer,
} from "../../atoms/Timer.tsx";
import { sprintFormSchema } from "../../components/ProfileConfiguration/configProfileFormValidation.ts";
import { SoundNotificationManager } from "../../notifications/soundNotificationManager.ts";
import { TextNotificationManager } from "../../notifications/textNotificationManager.ts";
import { useServiceWorker } from "../../serviceWorker/ServiceWorkerContext.tsx";
import {
  currentActiveProfileToFormType,
  ProfileType,
  tracksValues,
} from "../../types/components/ConfigTimerFormTypes.ts";
import { TimerFocusMode } from "../../types/components/TimerTypes.ts";
import { UseSprintFormLogicIt } from "../../types/hooks/UseSprintFormLogicIt.ts";
import { toMilliseconds } from "../../utils/timeUtils.ts";
import { useBackgroundSound } from "../useBackgroundSound";
import { useTimerWorker } from "../useTimerPomodoro";

export const useSprintFormLogic = (): UseSprintFormLogicIt => {
  const useTimeWorkerActions = useTimerWorker();
  const [formMode, setFormMode] = useState<"creating" | "updating">("updating");
  const [profiles, setProfiles] = useAtom<ProfileType[]>(profileTypes);
  const { backgroundPlay, backgroundPause } = useBackgroundSound();
  const [isTestAmbienceButtonDisabled, setIsTestAmbienceButtonDisabled] =
    useState(false);
  const [testAmbienceButtonText, setTestAmbienceButtonText] = useState("Ouvir");
  const [ambianceSoundOptions] = useAtom(ambianceOptions);
  const [currentActiveProfile, setCurrentActiveProfile] =
    useAtom(activeProfile);

  const [currentEditingProfile, setCurrentEditingProfile] =
    useState<ProfileType>();
  const [activeTimer, setActiveTimer] = useAtom(activeProfileTimerData);
  const [ambienceSoundChecked, setAmbienceSoundChecked] = useState(false);
  const [selectedSound, setSelectedSound] = useState<tracksValues>("city17");

  const [isModalOpen, setIsModalOpen] = useAtom(isConfigModalOpen);
  const { sw } = useServiceWorker();
  const {
    isPermissionGranted: canSendTextNotification,
    requestPermission: requestTextPermission,
  } = TextNotificationManager(sw);

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

  const disableTestButton = (): void => {
    setIsTestAmbienceButtonDisabled(true);
    setTestAmbienceButtonText("Tocando");
    backgroundPlay(selectedSound, true);
  };

  const enableTestButton = (): void => {
    setIsTestAmbienceButtonDisabled(false);
    setTestAmbienceButtonText("Ouvir");
    backgroundPause();
  };

  const handleButtonTestSound = (): void => {
    disableTestButton();

    setTimeout(() => {
      enableTestButton();
    }, 35000);
  };

  const handleSoundChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    enableTestButton();
    const songValue = e.target.value as tracksValues;
    setSelectedSound(songValue);
  };

  const handleAllowAmbienceSoundChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (e.target.checked) {
      setAmbienceSoundChecked(true);
    } else {
      setAmbienceSoundChecked(false);
    }
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

  const handleCreateNewProfile = () => {
    setFormMode("creating");
    reset({
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
        hours: String(defaultProfile.longBreakTime.hours),
        minutes: String(defaultProfile.longBreakTime.minutes),
        seconds: String(defaultProfile.longBreakTime.seconds),
      },
    });
  };

  useEffect(() => {
    if (sw) {
      if (currentActiveProfile?.allowTextNotifications) {
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
  } = useForm<currentActiveProfileToFormType>({
    resolver: zodResolver(sprintFormSchema),
  });

  const registerWithMask = useHookFormMask<
    currentActiveProfileToFormType,
    RegisterOptions
  >(register);

  const handleSelectProfileOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const selectedProfileId = e.target.value;
    resetForm(selectedProfileId);
  };

  const resetForm = (id: string | undefined = undefined) => {
    let profile: ProfileType = currentActiveProfile;
    if (id) {
      profile = profiles.find((profile) => profile.id === id) as ProfileType;
      setCurrentEditingProfile(profile);
      setFormMode("updating");
    } else {
      setCurrentEditingProfile(undefined);
      setFormMode("creating");
    }

    if (profile) {
      if (profile.ambienceSoundTrack) {
        setSelectedSound(profile.ambienceSoundTrack);
      }
      reset({
        ...profile,
        sprintTime: {
          minutes: String(profile.sprintTime.minutes),
          seconds: String(profile.sprintTime.seconds),
        },
        restTime: {
          minutes: String(profile.restTime.minutes),
          seconds: String(profile.restTime.seconds),
        },
        longBreakTime: {
          hours: String(profile.longBreakTime.hours),
          minutes: String(profile.longBreakTime.minutes),
          seconds: String(profile.longBreakTime.seconds),
        },
        qtySprintForLongBreak: String(profile.qtySprintForLongBreak),
      });
      setAmbienceSoundChecked(profile.allowAmbienceSound);
      enableTestButton();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const activeProfile = profiles.find((profile) => profile.active);
    resetForm(activeProfile?.id);
  };

  const updateProfilesList = (formattedProfile: ProfileType) => {
    if (formMode === "creating") {
      if (formattedProfile.active) {
        return profiles
          .map((profile) => ({ ...profile, active: false }))
          .concat(formattedProfile);
      }

      return profiles.concat(formattedProfile);
    } else {
      if (formattedProfile.active) {
        return profiles
          .filter((profile) => profile.id !== currentEditingProfile?.id)
          .map((profile) => ({ ...profile, active: false }))
          .concat(formattedProfile);
      }
      return profiles
        .filter((profile) => profile.id !== currentEditingProfile?.id)
        .concat(formattedProfile);
    }
  };

  const parseTime = (time: {
    minutes: string;
    seconds: string;
    hours?: string;
  }) => ({
    hours: time.hours ? parseInt(String(time.hours), 10) : undefined,
    minutes: parseInt(String(time.minutes), 10),
    seconds: parseInt(String(time.seconds), 10),
  });

  const swapProfile = (profile: ProfileType, profiles: ProfileType[]) => {
    if (!profile.active) {
      setProfiles(profiles);
      return;
    }

    useTimeWorkerActions.pauseWorker();
    if (currentActiveProfile.id !== profile.id) {
      const updatedProfiles = profiles.map((item) => {
        if (item.id === currentActiveProfile.id) {
          return {
            ...item,
            timer: activeTimer,
          };
        }
        return item;
      });
      setActiveTimer(profile.timer);
      setCurrentActiveProfile(profile);
      setProfiles(updatedProfiles);
      useTimeWorkerActions.resetWorker(profile.timer);
    } else if (currentActiveProfile.id === profile.id) {
      const mode =
        activeTimer.mode === TimerFocusMode.Focusing
          ? "sprintTime"
          : "restTime";

      if (
        currentActiveProfile[mode].minutes !== profile[mode].minutes ||
        currentActiveProfile[mode].seconds !== profile[mode].seconds
      ) {
        const remainingTime = toMilliseconds(
          parseInt(String(profile[mode].minutes), 10),
          parseInt(String(profile[mode].seconds), 10),
        );

        const updatedTimer = { ...activeTimer, remainingTime };
        setActiveTimer(updatedTimer);
        useTimeWorkerActions.resetWorker(updatedTimer);
      }

      setCurrentActiveProfile(profile);
      setProfiles(profiles);
    }
  };

  const onSubmit = (dataFromForm: currentActiveProfileToFormType) => {
    const id =
      formMode === "updating" && currentEditingProfile
        ? currentEditingProfile.id
        : uuidv4();

    const newTimer =
      formMode === "updating" && currentEditingProfile
        ? currentEditingProfile.timer
        : defaultTimer;

    const formattedData: ProfileType = {
      id,
      timer: newTimer,
      title: dataFromForm.title,
      active: dataFromForm.active,
      qtySprintForLongBreak: parseInt(
        String(dataFromForm.qtySprintForLongBreak),
        10,
      ),
      sprintTime: parseTime(dataFromForm.sprintTime),
      restTime: parseTime(dataFromForm.restTime),
      longBreakTime: parseTime(dataFromForm.longBreakTime) as {
        hours: number;
        minutes: number;
        seconds: number;
      },
      allowSoundNotifications: dataFromForm.allowSoundNotifications,
      allowTextNotifications: dataFromForm.allowTextNotifications,
      allowAmbienceSound: dataFromForm.allowAmbienceSound,
      ambienceSoundTrack: dataFromForm.ambienceSoundTrack,
    };

    swapProfile(formattedData, updateProfilesList(formattedData));

    const activeProfile = profiles.find(
      (profile) => profile.active,
    ) as ProfileType;
    resetForm(activeProfile?.id);
    setIsModalOpen(false);

    Toast.fire({
      icon: "success",
      title: "Configurações salvas",
    });
  };

  useEffect(() => {
    if (currentActiveProfile) {
      resetForm(currentActiveProfile.id);
    }
  }, [currentActiveProfile]);

  return {
    formMode,
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
    ambianceSoundOptions,
    handleTestSound: handleButtonTestSound,
    handleSoundChange,
    handleAllowAmbienceSoundChange,
    ambienceSoundChecked,
    selectedSound,
    isTestAmbienceButtonDisabled,
    testAmbienceButtonText,
    currentEditingProfile,
    profiles,
    handleCreateNewProfile,
    handleSelectProfileOnChange,
  };
};
