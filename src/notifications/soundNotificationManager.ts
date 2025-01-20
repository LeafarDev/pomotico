import { useAtom } from "jotai";
import Swal from "sweetalert2";
import activateNotificationWav from "../assets/songs/activatenotification.wav";
import endFocusWav from "../assets/songs/endfocus.wav";
import endRestWav from "../assets/songs/endrest.wav";
import startFocusWav from "../assets/songs/startFocus.wav";
import startRestWav from "../assets/songs/startRest.wav";
import wakeUpFocusAlertWav from "../assets/songs/wakeupfocustalert.wav";
import wakeUpRestAlertWav from "../assets/songs/wakeuprestalert.wav";
import { activeProfile } from "../atoms/Timer.tsx";
import { SoundNotificationManagerIt } from "../types/notifications/SoundNotificationManagerIt.ts";

export const SoundNotificationManager = (
  allowNotificationForce: boolean = false,
): SoundNotificationManagerIt => {
  const [{ allowSoundNotifications }] = useAtom(activeProfile);

  const play = async (path: string): Promise<void> => {
    if (allowNotificationForce || allowSoundNotifications) {
      try {
        await new Audio(path).play();
      } catch (error) {
        if (error instanceof DOMException) {
          await requestAudioPermission();
        }
      }
    }
  };

  async function requestAudioPermission(): Promise<void> {
    try {
      const result = await Swal.fire({
        title: "Notificações sonoras bloqueadas pelo navegador",
        text: "Deseja permitir notificações sonoras?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Negar",
        confirmButtonText: "Permitir",
      });

      if (result.isConfirmed) {
        await activateNotification();
        await Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        }).fire({
          icon: "success",
          title: "Notificações sonoras permitidas",
        });
      } else {
        await Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        }).fire({
          icon: "warning",
          title: "Notificações sonoras não permitidas",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Playback Failed",
        text: "Audio playback was prevented by your browser or an error occurred.",
      });
      console.error("Error while trying to play audio:", error);
    }
  }

  const playMultipleTimes = async (
    audioPath: string,
    repeatCount: number,
  ): Promise<void> => {
    if (allowNotificationForce || allowSoundNotifications) {
      const audio = new Audio(audioPath);
      let playCount = 0;
      try {
        const playNext = async (): Promise<void> => {
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
      } catch (error) {
        if (error instanceof DOMException) {
          await requestAudioPermission();
        }
      }
    }
  };

  const activateNotification = async (): Promise<void> => {
    await play(activateNotificationWav);
  };

  const getNotify = (): {
    activateNotification: () => Promise<void>;
    endFocus: () => Promise<void>;
    endRest: () => Promise<void>;
    startFocus: () => Promise<void>;
    startRest: () => Promise<void>;
    wakeUpFocus: () => Promise<void>;
    wakeUpRest: () => Promise<void>;
  } => {
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

  const notify = getNotify();

  return {
    notify,
  };
};
