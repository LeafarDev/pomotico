export interface TimerPomodoro {
  remainingTime: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatTime: () => string;
}
