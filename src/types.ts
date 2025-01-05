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
};

export interface ServiceWorkerContextProps {
  sw: ServiceWorkerRegistration | null;
  setSw: React.Dispatch<React.SetStateAction<ServiceWorkerRegistration | null>>;
}

export interface SoundNotificationManagerIt {
  notify: {
    startFocus: () => void;
    endFocus: () => void;
    startRest: () => void;
    endRest: () => void;
  };
}

export interface NotificationManagerIt {
  requestPermission: () => Promise<void>;
  isPermissionGranted: () => boolean;
  sendNotification: (title: string, body: string, icon?: string) => void;
}
