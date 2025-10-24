import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mora.sudoku',
  appName: 'Sudoku',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  android: {
    adjustMarginsForEdgeToEdge: 'force'
  }
};

export default config;
