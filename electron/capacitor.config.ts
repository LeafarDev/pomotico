import { CapacitorElectronConfig } from "@capacitor-community/electron/dist/core/definitions";

const config: CapacitorElectronConfig = {
  appId: "com.pomotico.app",
  appName: "Pomotico",
  webDir: "dist",
  electron: {
    trayIconAndMenuEnabled: true,
    splashScreenEnabled: true,
    splashScreenImageName: "splash.png",
  },
};

export default config;
