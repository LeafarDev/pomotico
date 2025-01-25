import { AmbienceTracks } from "../components/ConfigTimerFormTypes.ts";

export interface UseBackgroundSoundIt {
  backgroundPlay: (songValue: AmbienceTracks, testMode: boolean) => void;
  backgroundPause: () => void;
  backgroundStop: () => void;
  isBackgroundPlaying: () => boolean;
}
