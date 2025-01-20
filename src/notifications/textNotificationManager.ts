import { useAtom } from "jotai/index";
import notificationIcon from "../assets/notification/notification-icon.png";
import { activeProfile } from "../atoms/Timer.tsx";

import { TextNotificationManagerIt } from "../types/notifications/TextNotificationManagerIt.ts";

export const TextNotificationManager = (
  sw: ServiceWorkerRegistration | null,
): TextNotificationManagerIt => {
  if (!sw) {
    console.log("ServiceWorkerRegistration undefined");
  }

  const defaulticon = notificationIcon;

  const requestPermission = async (): Promise<void> => {
    if (sw) {
      await Notification.requestPermission();
    }
  };

  const [{ allowTextNotifications }] = useAtom(activeProfile);

  const isPermissionGranted = (): boolean => {
    return Notification.permission === "granted";
  };

  const sendNotification = (
    title: string,
    body: string,
    icon = defaulticon,
  ): void => {
    if (sw && allowTextNotifications && isPermissionGranted()) {
      sw.showNotification(title, {
        body,
        icon,
      });
    }
  };

  return {
    sendNotification,
    requestPermission,
    isPermissionGranted,
  };
};
