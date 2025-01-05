import { NotificationManagerIt } from "../../types.ts";

export const NotificationManager = (
  sw: ServiceWorkerRegistration,
): NotificationManagerIt => {
  const defaulticon = "/src/assets/notification/notification-icon.png";
  const requestPermission = async (): Promise<void> => {
    if (sw) {
      await Notification.requestPermission();
    }
  };

  const isPermissionGranted = (): boolean => {
    return Notification.permission === "granted";
  };

  const sendNotification = (
    title: string,
    body: string,
    icon = defaulticon,
  ): void => {
    if (sw && isPermissionGranted()) {
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
