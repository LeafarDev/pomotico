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
