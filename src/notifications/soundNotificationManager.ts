import { Howl } from "howler";
import activateNotificationWav from "../assets/songs/activatenotification.wav";
import endFocusWav from "../assets/songs/endfocus.wav";
import endRestWav from "../assets/songs/endrest.wav";
import startFocusWav from "../assets/songs/startFocus.wav";
import startRestWav from "../assets/songs/startRest.wav";
import wakeUpFocusAlertWav from "../assets/songs/wakeupfocustalert.wav";
import wakeUpRestAlertWav from "../assets/songs/wakeuprestalert.wav";

export const SoundNotificationManager = () => {
  const getSound = (soundKey: string) => {
    const soundFiles: { [key: string]: string } = {
      activateNotification: activateNotificationWav,
      endFocus: endFocusWav,
      endRest: endRestWav,
      startFocus: startFocusWav,
      startRest: startRestWav,
      wakeUpFocus: wakeUpFocusAlertWav,
      wakeUpRest: wakeUpRestAlertWav,
    };

    if (soundFiles[soundKey]) {
      return new Howl({ src: [soundFiles[soundKey]] });
    }

    return null;
  };

  const play = async (soundKey: string): Promise<void> => {
    const sound = getSound(soundKey);

    if (sound) {
      try {
        sound.play();
      } catch (error) {
        console.error(`Failed to play sound ${soundKey}:`, error);
      }
    } else {
      console.error(`Sound ${soundKey} not found.`);
    }
  };

  const playMultipleTimes = async (soundKey: string, repeatCount: number): Promise<void> => {
    const sound = getSound(soundKey);

    if (sound) {
      let count = 0;
      const playNext = () => {
        count++;
        if (count < repeatCount) {
          sound.seek(0);
          sound.play();
        } else {
          sound.off("end", playNext);
        }
      };

      sound.on("end", playNext);
      sound.play();
    } else {
      console.error(`Sound ${soundKey} not found.`);
    }
  };

  const notify = {
    activateNotification: () => play("activateNotification"),
    startFocus: () => play("startFocus"),
    endFocus: () => playMultipleTimes("endFocus", 3),
    startRest: () => play("startRest"),
    endRest: () => playMultipleTimes("endRest", 3),
    wakeUpFocus: () => playMultipleTimes("wakeUpFocus", 3),
    wakeUpRest: () => playMultipleTimes("wakeUpRest", 3),
  };

  return {
    notify,
  };
};
