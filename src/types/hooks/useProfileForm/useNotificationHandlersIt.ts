import { ChangeEvent } from "react";
import { UseFormStateIt } from "./UseFormStateIt.ts";
import { soundNotifyType } from "../../notifications/SoundNotificationManagerIt.ts";

export interface UseNotificationHandlersProps {
  states: UseFormStateIt;
  sw: ServiceWorkerRegistration | null;
  canSendTextNotification: () => boolean;
  requestTextPermission: () => Promise<void>;
  soundNotify: soundNotifyType;
}

export interface UseNotificationHandlersIt {
  handleSoundNotificationChange: (
    e: ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  handleTextNotificationChange: (
    e: ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
}
