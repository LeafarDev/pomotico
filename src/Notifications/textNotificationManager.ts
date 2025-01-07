import { useAtom } from "jotai/index";
import notificationIcon from "../assets/notification/notification-icon.png";
import { sprintConfigData } from "../atoms/Timer.tsx";
import { TextNotificationManagerIt } from "../types.ts";

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

  const [{ allowTextNotifications }] = useAtom(sprintConfigData);

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
