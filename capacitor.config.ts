import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'social-map',
  webDir: 'www',
  plugins: {
    Camera: {
      webUseInput: true,
    },
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 5000,
      launchFadeOutDuration: 2000,
    },
  },
};

export default config;
