export enum TimerFocusMode {
  Focusing,
  Resting,
  LongBreak = 2,
}

export interface StatusTextProps {
  $statusText: string;
}
export type TimerStatusType = {
  mode: TimerFocusMode;
  skipped: boolean;
  isRunning: boolean;
  remainingTime: number;
  startTime?: number;
  endTime?: number;
};
