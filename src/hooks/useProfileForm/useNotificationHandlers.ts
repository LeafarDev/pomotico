import { ChangeEvent, useEffect } from "react";
import {
  UseNotificationHandlersIt,
  UseNotificationHandlersProps,
} from "../../types/hooks/useProfileForm/useNotificationHandlersIt.ts";

export const useNotificationHandlers = ({
  states,
  canSendTextNotification,
  requestTextPermission,
  soundNotify,
}: UseNotificationHandlersProps): UseNotificationHandlersIt => {
  const { setTextNotificationsAllowed, currentActiveProfile } = states;

  const handleTextNotificationChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.checked) {
      const canSend = canSendTextNotification();
      if (!canSend) {
        await requestTextPermission();
      } else {
        setTextNotificationsAllowed(true);
      }
      return;
    }
    setTextNotificationsAllowed(false);
  };

  const handleSoundNotificationChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.checked) {
      try {
        await soundNotify.activateNotification();
      } catch (error) {
        console.error("Failed to activate sound notification", error);
      }
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      if (currentActiveProfile?.allowTextNotifications) {
        const permissionGranted = await canSendTextNotification();
        setTextNotificationsAllowed(permissionGranted);
      } else {
        setTextNotificationsAllowed(false);
      }
    };

    checkPermissions();
  }, [currentActiveProfile]);

  return {
    handleTextNotificationChange,
    handleSoundNotificationChange,
  };
};
