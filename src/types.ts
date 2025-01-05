export interface TimerPomodoroIt {
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
  startTime?: number;
  endTime?: number;
};

export interface ServiceWorkerContextProps {
  sw: ServiceWorkerRegistration | null;
  setSw: React.Dispatch<React.SetStateAction<ServiceWorkerRegistration | null>>;
}
export type soundNotify = {
  startFocus: () => void;
  endFocus: () => void;
  startRest: () => void;
  endRest: () => void;
  wakeUpFocus: () => void;
  wakeUpRest: () => void;
};
export interface SoundNotificationManagerIt {
  notify: soundNotify;
}

export interface NotificationManagerIt {
  requestPermission: () => Promise<void>;
  isPermissionGranted: () => boolean;
  sendNotification: (title: string, body: string, icon?: string) => void;
}
