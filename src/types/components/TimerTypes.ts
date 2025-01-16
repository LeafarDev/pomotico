export enum TimerFocusMode {
  Focusing,
  Resting,
}

export type TimerStatusType = {
  mode: TimerFocusMode;
  skipped: boolean;
  isRunning: boolean;
  remainingTime: number;
  startTime?: number;
  endTime?: number;
};
