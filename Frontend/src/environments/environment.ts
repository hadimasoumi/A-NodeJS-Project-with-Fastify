export const environment = {
  production: false,
  // hostname: 'http://api.billcenter.ir',
  // hostnameExternal: 'http://api.billcenter.ir',
  // socketIPInternal: 'http://api.billcenter.ir',
  // socketIPExternal: 'http://api.billcenter.ir',

  hostname: 'https://uiapi2.saapa.ir',
  hostnameExternal: 'https://uiapi2.saapa.ir',
  socketIPInternal: 'https://uiapi2.saapa.ir',
  socketIPExternal: 'https://uiapi2.saapa.ir',

  nationalId: '1111111111111',
  encryption: false,
  reCaptcha: '6Lc9Z-4UAAAAAMV05A553MMVsobHyRqDNbSK9w4C',
  isEnamad: false,
  arvanPort: 4000,
  asanPardakhtPort: 4002,

  project_id: '1', // 1 for barghe man 2 for billing and so on
  firebase: {
    apiKey: 'AIzaSyBFadVnBk1njE0Slxl7CCWtWFlgD9DoCZY',
    authDomain: 'red-billyard.firebaseapp.com',
    databaseURL: 'https://red-billyard.firebaseio.com',
    projectId: 'red-billyard',
    storageBucket: 'red-billyard.appspot.com',
    messagingSenderId: '792719142783',
    appId: '1:792719142783:web:0a63b6cd9c502b99d2344a',
    measurementId: '${config.measurementId}',
  },
};
