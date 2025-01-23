import { MutableRefObject } from "react";
import { AmbienceTracks } from "../components/ConfigTimerFormTypes.ts";

export interface UseBackgroundSoundIt {
  backgroundPlay: (songValue: AmbienceTracks, testMode: boolean) => void;
  backgroundPause: () => void;
  iframeRef: MutableRefObject<HTMLIFrameElement | null>;
  currentTrackUrl: string;
}
