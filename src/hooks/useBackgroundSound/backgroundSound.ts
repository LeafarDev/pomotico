import { Howl } from "howler";
import { useAtom } from "jotai";
import { activeProfile, ambianceOptions } from "../../atoms/Timer.tsx";
import { AmbienceTracks } from "../../types/components/ConfigTimerFormTypes.ts";
import { UseBackgroundSoundIt } from "../../types/hooks/UseBackgroundSoundIt.ts";

let soundInstance: Howl | null = null;

export const useBackgroundSound = (): UseBackgroundSoundIt => {
  const [ambianceSoundOptions] = useAtom(ambianceOptions);
  const [{ allowAmbienceSound }] = useAtom(activeProfile);

  const backgroundPlay = async (
    songValue: AmbienceTracks = AmbienceTracks.City17,
    testMode: boolean = false,
  ): Promise<void> => {
    if (testMode || allowAmbienceSound) {
      const song = ambianceSoundOptions.find(
        (item) => item.value === songValue,
      );

      if (!song) {
        console.error(`Track not found for value: ${songValue}`);
        return;
      }

      const trackPath = song.path;

      if (soundInstance) {
        soundInstance.stop();
      }

      soundInstance = new Howl({
        src: [trackPath],
        html5: true,
        format: ["mp3"],
        autoplay: true,
        loop: true,
      });

      soundInstance.play();
    }
  };

  const backgroundPause = (): void => {
    if (soundInstance) {
      soundInstance.pause();
    }
  };

  soundInstance?.playing();
  const backgroundStop = (): void => {
    if (soundInstance) {
      soundInstance.stop();
    }
  };

  const isBackgroundPlaying = (): boolean => {
    if (soundInstance) {
      return soundInstance?.playing();
    }
    return false;
  };

  return {
    backgroundPlay,
    backgroundPause,
    backgroundStop,
    isBackgroundPlaying,
  };
};
