import { SoundNotificationManagerIt } from "../../types.ts";

export const SoundNotificationManager = (): SoundNotificationManagerIt => {
  const waveSongs = {
    startFocus: "/src/assets/songs/startfocus.wav",
    endFocus: "/src/assets/songs/endfocus.wav",
    startRest: "/src/assets/songs/startRest.wav",
    endRest: "/src/assets/songs/endrest.wav",
  };

  const play = async (path: string): Promise<void> => {
    await new Audio(path).play();
  };

  const playMultipleTimes = async (audioPath: string, repeatCount: number) => {
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
  };

  const getNotify = () => {
    const startFocus = async (): Promise<void> => {
      await play(waveSongs.startFocus);
    };

    const endFocus = async (): Promise<void> => {
      await playMultipleTimes(waveSongs.endFocus, 3);
    };

    const startRest = async (): Promise<void> => {
      await play(waveSongs.startRest);
    };

    const endRest = async (): Promise<void> => {
      await playMultipleTimes(waveSongs.endRest, 3);
    };

    return {
      startFocus,
      endFocus,
      startRest,
      endRest,
    };
  };

  const notify = getNotify();
  return {
    notify,
  };
};
