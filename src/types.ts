export interface TimerPomodoroIt {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  startButtonText: string;
}

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

export interface ServiceWorkerContextProps {
  sw: ServiceWorkerRegistration | null;
  setSw: React.Dispatch<React.SetStateAction<ServiceWorkerRegistration | null>>;
}
export type soundNotifyType = {
  startFocus: () => Promise<void>;
  endFocus: () => Promise<void>;
  startRest: () => Promise<void>;
  endRest: () => Promise<void>;
  wakeUpFocus: () => Promise<void>;
  wakeUpRest: () => Promise<void>;
  activateNotification: () => Promise<void>;
};
export interface SoundNotificationManagerIt {
  notify: soundNotifyType;
}

export interface TextNotificationManagerIt {
  requestPermission: () => Promise<void>;
  isPermissionGranted: () => boolean;
  sendNotification: (title: string, body: string, icon?: string) => void;
}
export type ConfigDataType = {
  sprintTime: {
    minutes: number;
    seconds: number;
  };
  restTime: {
    minutes: number;
    seconds: number;
  };
  sprintGoal: number;
  allowTextNotifications: boolean;
  allowSoundNotifications: boolean;
};

export type ConfigDataToFormType = {
  sprintTime: {
    minutes: string;
    seconds: string;
  };
  restTime: {
    minutes: string;
    seconds: string;
  };
  sprintGoal: string;
  allowTextNotifications: boolean;
  allowSoundNotifications: boolean;
};
