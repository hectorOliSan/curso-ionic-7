import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'social-map',
  webDir: 'www',
  plugins: {
    Camera: {
      webUseInput: true,
    },
  },
};

export default config;
