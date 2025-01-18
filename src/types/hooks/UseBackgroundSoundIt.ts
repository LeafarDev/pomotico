import { MutableRefObject } from "react";
import { tracksValues } from "../components/ConfigTimerFormTypes.ts";

export interface UseBackgroundSoundIt {
  backgroundPlay: (songValue: tracksValues, testMode: boolean) => void;
  backgroundPause: () => void;
  iframeRef: MutableRefObject<HTMLIFrameElement | null>;
  currentTrackUrl: string;
}
