import { useEffect, useState } from "react";
import { SoundNotificationManager } from "../../Notifications/soundNotificationManager.ts";
import { TextNotificationManager } from "../../Notifications/textNotificationManager.ts";
import {
  TimerFocusMode,
  TimerStatusType,
} from "../../types/components/TimerTypes.ts";
import {
  differenceInMinutes,
  minutesToMilliseconds,
} from "../../utils/timeUtils.ts";

export const useTimerNotifications = (
  sw: ServiceWorkerRegistration | null,
  timerState: TimerStatusType,
  historyState: TimerStatusType[],
  pausedAt: number | undefined,
) => {
  const [lastNotified, setLastNotified] = useState(-1);

  const { notify: soundNotify } = SoundNotificationManager();
  const {
    sendNotification,
    requestPermission: requestTextPermission,
    isPermissionGranted: canSendTextNotification,
  } = TextNotificationManager(sw);
  const wakeUpTimeLimit = 2;

  const sendFinishedAlert = (mode: TimerFocusMode): void => {
    if (sw) {
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
    }
  };

  const sendWakeUpAlert = (): void => {
    if (sw) {
      const title = "Volte aqui!!!";
      const body = "Detectamos sua inatividade, volte ao foco";

      if (timerState.mode === TimerFocusMode.Resting) {
        soundNotify.wakeUpFocus();
      } else {
        soundNotify.wakeUpRest();
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
      if (!timerState.isRunning) {
        const now = new Date().getTime();
        if (timerState.startTime && !timerState.endTime && pausedAt) {
          const diff = differenceInMinutes(now, pausedAt);
          if (diff > wakeUpTimeLimit) {
            sendWakeUpAlert();
          }
        } else if (timerState.startTime && timerState.endTime) {
          const diff = differenceInMinutes(now, timerState.endTime);
          if (diff > wakeUpTimeLimit) {
            sendWakeUpAlert();
          }
        } else if (historyState.length > 0) {
          const lastTimerFinished = historyState[historyState.length - 1];
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
  }, [
    historyState,
    pausedAt,
    sendWakeUpAlert,
    timerState.endTime,
    timerState.isRunning,
    timerState.startTime,
  ]);

  useEffect(() => {
    if (timerState.startTime) {
      if (timerState.mode === TimerFocusMode.Resting) {
        soundNotify.startRest();
      } else {
        soundNotify.startFocus();
      }
    }
    if (historyState.length) {
      const lastFinishedIndex = historyState.length - 1;
      if (
        historyState[historyState.length - 1].endTime &&
        lastNotified !== lastFinishedIndex
      ) {
        setLastNotified(lastFinishedIndex);
        sendFinishedAlert(historyState[historyState.length - 1].mode);
      }
    }
  }, [timerState.startTime, historyState]);
};
