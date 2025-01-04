export interface TimerPomodoro {
  start: () => void;
  pause: () => void;
  reset: () => void;
  startButtonText: string;
}

export enum TimerFocusMode {
  Focusing,
  Resting,
}

export type TimerStatus = {
  mode: TimerFocusMode;
  isRunning: boolean;
  remainingTime: number;
};
