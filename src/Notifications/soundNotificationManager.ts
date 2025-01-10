import { useAtom } from "jotai";

import activateNotificationWav from "../assets/songs/activatenotification.wav";
import endFocusWav from "../assets/songs/endfocus.wav";
import endRestWav from "../assets/songs/endrest.wav";
import startFocusWav from "../assets/songs/startFocus.wav";
import startRestWav from "../assets/songs/startRest.wav";
import wakeUpFocusAlertWav from "../assets/songs/wakeupfocustalert.wav";
import wakeUpRestAlertWav from "../assets/songs/wakeuprestalert.wav";
import { sprintConfigData } from "../atoms/Timer.tsx";
import { SoundNotificationManagerIt, soundNotifyType } from "../types/types.ts";

export const SoundNotificationManager = (
  allowNotificationForce: boolean = false,
): SoundNotificationManagerIt => {
  const [{ allowSoundNotifications }] = useAtom(sprintConfigData);

  const play = async (path: string): Promise<void> => {
    if (allowNotificationForce || allowSoundNotifications) {
      await new Audio(path).play();
    }
  };

  const playMultipleTimes = async (audioPath: string, repeatCount: number) => {
    if (allowNotificationForce || allowSoundNotifications) {
      const audio = new Audio(audioPath);
      let playCount = 0;

      const playNext = async () => {
        playCount++;
        if (playCount < repeatCount) {
          audio.currentTime = 0;
          await audio.play();
        } else {
          audio.removeEventListener("ended", playNext);
        }
      };

      audio.addEventListener("ended", playNext);
      await audio.play();
    }
  };

  const activateNotification = async (): Promise<void> => {
    await play(activateNotificationWav);
  };

  const getNotify = () => {
    const startFocus = async (): Promise<void> => {
      await play(startFocusWav);
    };

    const wakeUpFocus = async (): Promise<void> => {
      await playMultipleTimes(wakeUpFocusAlertWav, 3);
    };

    const endFocus = async (): Promise<void> => {
      await playMultipleTimes(endFocusWav, 3);
    };

    const startRest = async (): Promise<void> => {
      await play(startRestWav);
    };

    const wakeUpRest = async (): Promise<void> => {
      await playMultipleTimes(wakeUpRestAlertWav, 3);
    };

    const endRest = async (): Promise<void> => {
      await playMultipleTimes(endRestWav, 3);
    };

    return {
      startFocus,
      endFocus,
      startRest,
      endRest,
      wakeUpFocus,
      wakeUpRest,
      activateNotification,
    };
  };

  const notify = getNotify() as soundNotifyType;

  return {
    notify,
  };
};
