import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const TextNotificationManager = () => {
  const isWeb = Capacitor.getPlatform() === "web";

  const requestPermission = async (): Promise<void> => {
    if (isWeb) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        Toast.fire({
          icon: "success",
          title: "Web notification permissions granted",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Web notification permissions denied",
        });
      }
    } else {
      try {
        const { display } = await LocalNotifications.requestPermissions();
        if (display === "granted") {
          Toast.fire({
            icon: "success",
            title: "Native notification permissions granted",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Native notification permissions denied",
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Error requesting permission for native notifications",
        });
      }
    }
  };

  const isPermissionGranted = async (): Promise<boolean> => {
    if (isWeb) {
      return Notification.permission === "granted";
    } else {
      // For native (Capacitor), check the permission using LocalNotifications
      const { display } = await LocalNotifications.requestPermissions();
      return display === "granted";
    }
  };

  const sendNotification = async (
    title: string,
    body: string,
    icon?: string,
  ): Promise<void> => {
    if (isWeb) {
      if (Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon,
        });
      } else {
        Toast.fire({
          icon: "warning",
          title: "Permission not granted for web notifications",
        });
      }
    } else {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Math.floor(new Date().getTime() / 1000),
            schedule: { at: new Date(new Date().getTime() + 100) },
          },
        ],
      });
    }
  };

  return {
    requestPermission,
    isPermissionGranted,
    sendNotification,
  };
};
