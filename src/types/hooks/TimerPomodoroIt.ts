export interface TimerPomodoroIt {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  startButtonText: string;
  statusDescriptionText: string;
  statusGif: string;
}
