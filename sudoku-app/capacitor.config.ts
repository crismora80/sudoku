import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mora.sudoku',
  appName: 'Sudoku',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  android: {
    adjustMarginsForEdgeToEdge: 'auto'
  }
};

export default config;
