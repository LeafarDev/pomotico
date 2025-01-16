export interface TextNotificationManagerIt {
  requestPermission: () => Promise<void>;
  isPermissionGranted: () => boolean;
  sendNotification: (title: string, body: string, icon?: string) => void;
}
