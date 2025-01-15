import { MutableRefObject } from "react";

export interface TimerPomodoroIt {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  startButtonText: string;
  iframeRef: MutableRefObject<HTMLIFrameElement | null>;
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

export interface TimerEventDetail {
  action: "start" | "pause" | "reset" | "skip" | "finished" | "updateTimer";
  type: "background" | "ui";
  value?: unknown;
  lastUpdated?: number;
  sessionId?: number;
}

declare global {
  interface WindowEventMap {
    timerEvent: CustomEvent<TimerEventDetail>;
  }
}
export interface UseTimerStateIt {
  timerState: TimerStatusType;
  setTimerState: (
    timerStatus:
      | TimerStatusType
      | ((prevState: TimerStatusType) => TimerStatusType),
  ) => void;
  history: TimerStatusType[];
  setHistory: (history: TimerStatusType[]) => void;
  pausedAt: number | undefined;
  setPausedAt: (pausedAt: number) => void;
  configData: ConfigDataType;
  lastUpdated: number;
  setLastUpdated: (lastUpdated: number) => void;
}
export interface UseTimerWorkerIt {
  sendTimeWorkerMessage: (message: unknown) => void;
  onTimeWorkerMessage: (callback: (e: TimerEventDetail) => void) => void;
  terminateTimeWorker: () => void;
  startWorker: (timerState: TimerStatusType) => void;
  resetWorker: (timerState: TimerStatusType) => void;
  pauseWorker: (timerState: TimerStatusType) => void;
  skipWorker: (timerState: TimerStatusType) => void;
}

export interface UseTimerActionsIt {
  getStartButtonText: () => string;
  handleTimerCompletion: (skipped?: boolean) => TimerStatusType;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  start: () => void;
}

export interface BackgroundSoundProps {
  iframeRef: string;
}
