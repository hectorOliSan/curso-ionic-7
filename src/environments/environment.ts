// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // reqres: {
  //   baseUrl: 'https://reqres.in/api',
  // },
  googleMaps: {
    apiKey: 'AIzaSyAOrlLkInZpjeCfh6CO9gbGFG9iH-Xm3h8',
  },
  SQLite: {
    DB_NAME: 'social-media-app',
    DB_VERSION_KEY: 'sqlite-version',
    CACHE_TABLE_NAME: 'social-media-requests-cache',
  },
  firebase: {
    projectId: 'social-map-firebase',
    appId: '1:575926465669:web:c23de30e3d35566c0a65ec',
    storageBucket: 'social-map-firebase.firebasestorage.app',
    apiKey: 'AIzaSyBCiMYoU_0WeBl0-y30SsbeK6X7_kcF7KY',
    authDomain: 'social-map-firebase.firebaseapp.com',
    messagingSenderId: '575926465669',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
