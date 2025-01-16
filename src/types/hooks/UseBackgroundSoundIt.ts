import { MutableRefObject } from "react";

export interface UseBackgroundSoundIt {
  backgroundPlay: () => void;
  iframeRef: MutableRefObject<HTMLIFrameElement | null>;
}
