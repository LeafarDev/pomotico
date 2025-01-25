import { useAtom } from "jotai/index";
import { useEffect } from "react";
import { lastEndedNotified } from "../../atoms/Timer.tsx";
import { SoundNotificationManager } from "../../notifications/soundNotificationManager.ts";
import { TextNotificationManager } from "../../notifications/textNotificationManager.ts";
import { ProfileType } from "../../types/components/ConfigTimerFormTypes.ts";
import { TimerFocusMode } from "../../types/components/TimerTypes.ts";
import {
  differenceInMinutes,
  minutesToMilliseconds,
} from "../../utils/timeUtils.ts";

export const useTimerNotifications = (
  currentActiveProfile: ProfileType,
  pausedAt: number | undefined,
  checkAlreadyStarted: () => boolean,
): void => {
  const [lastNotified, setLastNotified] = useAtom(lastEndedNotified);

  const { notify: soundNotify } = SoundNotificationManager();
  const {
    sendNotification,
    requestPermission: requestTextPermission,
    isPermissionGranted: canSendTextNotification,
  } = TextNotificationManager();
  const wakeUpTimeLimit = 2;

  const sendFinishedAlert = (mode: TimerFocusMode): void => {
    let title = "Sprint finalizada!";
    let body = "Hora de descansar! Acione o modo descanso :)";

    if (mode === TimerFocusMode.Resting) {
      title = "Descanso finalizado";
      body = "Vamos focar! Acione a próxima sprint";
      soundNotify.endRest();
    } else {
      soundNotify.endFocus();
    }

    if (!canSendTextNotification()) {
      requestTextPermission();
    } else {
      sendNotification(title, body);
    }
  };

  const sendWakeUpAlert = (): void => {
    const title = "Volte aqui!!!";
    const body = "Detectamos sua inatividade, volte ao foco";

    if (currentActiveProfile.timer.mode === TimerFocusMode.Resting) {
      soundNotify.wakeUpFocus();
    } else {
      soundNotify.wakeUpRest();
    }

    if (!canSendTextNotification()) {
      requestTextPermission();
    } else {
      sendNotification(title, body);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentActiveProfile.timer.isRunning) {
        const now = new Date().getTime();
        if (
          currentActiveProfile.timer.startTime &&
          !currentActiveProfile.timer.endTime &&
          pausedAt
        ) {
          const diff = differenceInMinutes(now, pausedAt);
          if (diff > wakeUpTimeLimit) {
            sendWakeUpAlert();
          }
        } else if (
          currentActiveProfile.timer.startTime &&
          currentActiveProfile.timer.endTime
        ) {
          const diff = differenceInMinutes(
            now,
            currentActiveProfile.timer.endTime,
          );
          if (diff > wakeUpTimeLimit) {
            sendWakeUpAlert();
          }
        } else if (currentActiveProfile.history.length > 0) {
          const lastTimerFinished =
            currentActiveProfile.history[
              currentActiveProfile.history.length - 1
            ];
          if (lastTimerFinished.endTime) {
            const diff = differenceInMinutes(now, lastTimerFinished.endTime);
            if (diff > wakeUpTimeLimit) {
              sendWakeUpAlert();
            }
          }
        }
      }
    }, minutesToMilliseconds(3));
    return (): void => clearInterval(interval);
  }, [
    currentActiveProfile.history,
    pausedAt,
    sendWakeUpAlert,
    currentActiveProfile.timer.endTime,
    currentActiveProfile.timer.isRunning,
    currentActiveProfile.timer.startTime,
  ]);

  useEffect(() => {
    if (currentActiveProfile.history.length) {
      const lastFinishedIndex = currentActiveProfile.history.length - 1;
      if (
        currentActiveProfile.history[currentActiveProfile.history.length - 1]
          .endTime &&
        lastNotified !== lastFinishedIndex
      ) {
        setLastNotified(lastFinishedIndex);
        sendFinishedAlert(
          currentActiveProfile.history[currentActiveProfile.history.length - 1]
            .mode,
        );
      }
    }
  }, [currentActiveProfile.history]);

  useEffect(() => {
    const started = checkAlreadyStarted();
    if (
      currentActiveProfile.timer.startTime &&
      currentActiveProfile.timer.isRunning &&
      !started
    ) {
      if (currentActiveProfile.timer.mode === TimerFocusMode.Resting) {
        soundNotify.startRest();
      } else {
        soundNotify.startFocus();
      }
    }
  }, [currentActiveProfile.timer.mode]);
};
