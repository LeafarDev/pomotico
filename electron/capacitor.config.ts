import { CapacitorElectronConfig } from "@capacitor-community/electron/dist/core/definitions";

const config: CapacitorElectronConfig = {
  appId: "com.pomotico.app",
  appName: "Pomotico",
  webDir: "dist",
  electron: {
    trayIconAndMenuEnabled: true,
    splashScreenEnabled: true,
    splashScreenImageName: "splash.gif",
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
