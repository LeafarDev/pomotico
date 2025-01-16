import { MutableRefObject } from "react";

export interface TimerPomodoroIt {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  startButtonText: string;
  iframeRef: MutableRefObject<HTMLIFrameElement | null>;
}
