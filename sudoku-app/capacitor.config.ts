import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sudoku-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
