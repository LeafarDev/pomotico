import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { sprintConfigData, timerData } from "../../atoms/Timer.tsx";
import { useServiceWorker } from "../../ServiceWorker/ServiceWorkerContext.tsx";
import { TimerFocusMode, TimerPomodoroIt, TimerStatus } from "../../types.ts";
import { toMilliseconds } from "../../utils/timeUtils.ts";
import { NotificationManager } from "../Notification/notificationManager.ts";
import { SoundNotificationManager } from "../Notification/soundNotificationManager.ts";

export const useTimerPomodoro = (): TimerPomodoroIt => {
  const [configData] = useAtom(sprintConfigData);
  const [timer, setTimer] = useAtom(timerData);
  const [startButtonText, setstartButtonText] = useState("Iniciar Sprint");
  const { sw } = useServiceWorker();
  const { notify: soundManagerNotify } = SoundNotificationManager();

  const checkAlreadyStarted = (): boolean => {
    let originalRemainingtime = toMilliseconds(
      configData.restTime.minutes,
      configData.restTime.seconds,
    );
    if (timer.mode === TimerFocusMode.Focusing) {
      originalRemainingtime = toMilliseconds(
        configData.sprintTime.minutes,
        configData.sprintTime.seconds,
      );
    }
    return timer.remainingTime < originalRemainingtime;
  };

  const getStartButtonText = (
    isRunning: boolean,
    mode: TimerFocusMode,
    alreadyStarted: boolean,
  ): string => {
    if (isRunning) {
      return "Pausar";
    }

    if (mode === TimerFocusMode.Focusing) {
      return alreadyStarted ? "Retomar Sprint" : "Iniciar Foco";
    }

    return alreadyStarted ? "Retomar Descanso" : "Iniciar Descanso";
  };

  useEffect(() => {
    const alreadyStarted = checkAlreadyStarted();
    const buttonText = getStartButtonText(
      timer.isRunning,
      timer.mode,
      alreadyStarted,
    );
    setstartButtonText(buttonText);
  }, [checkAlreadyStarted, timer]);

  const makeNewFocusModeObject = (): TimerStatus => {
    const remainingTime = toMilliseconds(
      configData.sprintTime.minutes,
      configData.sprintTime.seconds,
    );
    return {
      remainingTime,
      isRunning: false,
      mode: TimerFocusMode.Focusing,
    };
  };

  const makeNewRestModeObject = (): TimerStatus => {
    const remainingTime = toMilliseconds(
      configData.restTime.minutes,
      configData.restTime.seconds,
    );
    return {
      remainingTime,
      isRunning: false,
      mode: TimerFocusMode.Resting,
    };
  };

  const handleTimerCompletion = (): TimerStatus => {
    sendFinishedAlert();
    if (timer.mode === TimerFocusMode.Focusing) {
      return makeNewRestModeObject();
    }
    return makeNewFocusModeObject();
  };

  const sendFinishedAlert = (): void => {
    if (sw) {
      const {
        requestPermission: requestTextPermission,
        isPermissionGranted: canSendTextNotification,
        sendNotification,
      } = NotificationManager(sw);

      let title = "Sprint finalizada!";
      let body = "Hora de descansar! Acione o modo descanso :)";

      if (timer.mode === TimerFocusMode.Resting) {
        title = "Descanso finalizado";
        body = "Vamos focar! Acione a próxima sprint";
        soundManagerNotify.endRest();
      } else {
        soundManagerNotify.endFocus();
      }

      if (!canSendTextNotification()) {
        requestTextPermission();
      } else {
        sendNotification(title, body);
      }
    }
  };

  useEffect(() => {
    const updateTimerEverySecond = (): void => {
      setTimer((timerStatus: TimerStatus): TimerStatus => {
        if (timerStatus.remainingTime <= 1000) {
          return handleTimerCompletion();
        }
        return {
          ...timer,
          remainingTime: timerStatus.remainingTime - 1000,
        };
      });
    };

    if (!timer.isRunning) return;

    const interval = setInterval(updateTimerEverySecond, 1000);

    return (): void => clearInterval(interval);
  }, [timer.isRunning, configData]);

  const start = (): void => {
    const alreadyStarted = checkAlreadyStarted();

    if (!alreadyStarted) {
      if (timer.mode === TimerFocusMode.Focusing) {
        soundManagerNotify.startFocus();
      } else {
        soundManagerNotify.startRest();
      }
    }
    setTimer({ ...timer, isRunning: true });
  };

  const pause = (): void => {
    setTimer({ ...timer, isRunning: false });
  };

  const reset = (): void => {
    const { sprintTime, restTime } = configData;
    setTimer({ ...timer, isRunning: false });

    if (timer.mode === TimerFocusMode.Focusing) {
      setTimer({
        ...timer,
        remainingTime: toMilliseconds(sprintTime.minutes, sprintTime.seconds),
        isRunning: false,
      });
    } else {
      setTimer({
        ...timer,
        remainingTime: toMilliseconds(restTime.minutes, restTime.seconds),
      });
    }
  };

  return {
    start,
    pause,
    reset,
    startButtonText,
  };
};
