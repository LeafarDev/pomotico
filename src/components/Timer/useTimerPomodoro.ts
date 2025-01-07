import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  pausedTime,
  sprintConfigData,
  sprintHistory,
  timerData,
} from "../../atoms/Timer.tsx";
import { useServiceWorker } from "../../ServiceWorker/ServiceWorkerContext.tsx";
import {
  TimerFocusMode,
  TimerPomodoroIt,
  TimerStatusType,
} from "../../types.ts";
import {
  differenceInMinutes,
  minutesToMilliseconds,
  toMilliseconds,
} from "../../utils/timeUtils.ts";
import { SoundNotificationManager } from "../Notification/soundNotificationManager.ts";
import { TextNotificationManager } from "../Notification/textNotificationManager.ts";

export const useTimerPomodoro = (): TimerPomodoroIt => {
  const [configData] = useAtom(sprintConfigData);
  const [historyTimers, setHistoryTimers] = useAtom(sprintHistory);
  const [timer, setTimer] = useAtom(timerData);
  const [pausedAt, setPausedAt] = useAtom(pausedTime);

  const [startButtonText, setstartButtonText] = useState("Iniciar Sprint");
  const { sw } = useServiceWorker();
  const {
    requestPermission: requestTextPermission,
    isPermissionGranted: canSendTextNotification,
    sendNotification,
  } = TextNotificationManager(sw);
  const { notify: soundManagerNotify } = SoundNotificationManager();
  const wakeUpTimeLimit = 2;

  const checkAlreadyStarted = (): boolean => {
    if (timer.mode === TimerFocusMode.Focusing && timer.startTime) {
      const originalRemainingtime = toMilliseconds(
        configData.sprintTime.minutes,
        configData.sprintTime.seconds,
      );
      return timer.remainingTime < originalRemainingtime;
    }
    if (timer.mode === TimerFocusMode.Resting && timer.startTime) {
      const originalRemainingtime = toMilliseconds(
        configData.restTime.minutes,
        configData.restTime.seconds,
      );

      return timer.remainingTime < originalRemainingtime;
    }
    return false;
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

  const sendFinishedAlert = (): void => {
    if (sw) {
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

  const makeNewFocusModeObject = (): TimerStatusType => {
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

  const makeNewRestModeObject = (): TimerStatusType => {
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

  const handleTimerCompletion = (): TimerStatusType => {
    sendFinishedAlert();
    const currentTimer = { ...timer, endTime: Date.now() };
    setHistoryTimers([...historyTimers, currentTimer]);

    if (timer.mode === TimerFocusMode.Focusing) {
      return makeNewRestModeObject();
    }
    return makeNewFocusModeObject();
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

  useEffect(() => {
    const updateTimerEverySecond = (): void => {
      setTimer((timerStatus: TimerStatusType): TimerStatusType => {
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
  }, [configData, timer, setTimer, handleTimerCompletion]);

  const sendWakeUpAlert = (): void => {
    if (sw) {
      const title = "Volte aqui!!!";
      const body = "Detectamos sua inatividade, volte ao foco";

      if (timer.mode === TimerFocusMode.Resting) {
        soundManagerNotify.wakeUpFocus();
      } else {
        soundManagerNotify.wakeUpRest();
      }

      if (!canSendTextNotification()) {
        requestTextPermission();
      } else {
        sendNotification(title, body);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timer.isRunning) {
        const now = new Date().getTime();
        if (timer.startTime && !timer.endTime && pausedAt) {
          const diff = differenceInMinutes(now, pausedAt);
          if (diff > wakeUpTimeLimit) {
            sendWakeUpAlert();
          }
        } else if (timer.startTime && timer.endTime) {
          const diff = differenceInMinutes(now, timer.endTime);
          if (diff > wakeUpTimeLimit) {
            sendWakeUpAlert();
          }
        } else if (historyTimers.length > 0) {
          const lastTimerFinished = historyTimers[historyTimers.length - 1];
          if (lastTimerFinished.endTime) {
            const diff = differenceInMinutes(now, lastTimerFinished.endTime);
            if (diff > wakeUpTimeLimit) {
              sendWakeUpAlert();
            }
          }
        }
      }
    }, minutesToMilliseconds(3));
    return () => clearInterval(interval);
  }, [pausedAt, sendWakeUpAlert, timer]);

  const start = (): void => {
    const alreadyStarted = checkAlreadyStarted();

    if (!alreadyStarted) {
      if (timer.mode === TimerFocusMode.Focusing) {
        soundManagerNotify.startFocus();
      } else {
        soundManagerNotify.startRest();
      }
      setTimer({ ...timer, isRunning: true, startTime: Date.now() });
    } else {
      setTimer({ ...timer, isRunning: true });
    }

    if (sw) {
      if (!checkAlreadyStarted()) {
        requestTextPermission();
      }
    }
  };

  const pause = (): void => {
    setPausedAt(Date.now());
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
