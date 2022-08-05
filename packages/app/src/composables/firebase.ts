import { getAnalytics, Analytics } from 'firebase/analytics';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, Functions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage';
import { reactive } from 'vue';

const emulatorConnectionState = reactive({
  authConnected: false,
  firestoreConnected: false,
  functionsConnected: false,
  storageConnected: false,
});

export const useFirebase = (): FirebaseApp => {
  const [app] = getApps();

  if (app) {
    return app;
  }

  // TODO: Move values to env vars
  return initializeApp({
    apiKey: 'AIzaSyBFFQTGA9-UPyoku_W1RrlM4icJlAw79Y4',
    authDomain: 'order-di-d1584.firebaseapp.com',
    projectId: 'order-di-d1584',
    storageBucket: 'order-di-d1584.appspot.com',
    messagingSenderId: '619207533031',
    appId: '1:619207533031:web:a204a3b57fe7f7eeaf9d42',
    measurementId: 'G-07RCXVC7V3',
  });
};

export const useFirestore = (app?: FirebaseApp): Firestore => {
  const firebaseApp = app || useFirebase();

  const firestore = getFirestore(firebaseApp);

  if (import.meta.env.VITE_USE_EMULATORS && !emulatorConnectionState.firestoreConnected) {
    emulatorConnectionState.firestoreConnected = true;

    connectFirestoreEmulator(firestore, 'localhost', 8080);
  }

  return firestore;
};

export const useAuth = (app?: FirebaseApp): Auth => {
  const firebaseApp = app || useFirebase();

  const auth = getAuth(firebaseApp);

  if (auth.emulatorConfig) {
    emulatorConnectionState.authConnected = true;
  }

  if (import.meta.env.VITE_USE_EMULATORS && !emulatorConnectionState.authConnected) {
    emulatorConnectionState.authConnected = true;

    connectAuthEmulator(auth, 'http://localhost:9099');
  }

  return auth;
};

export const useStorage = (app?: FirebaseApp): FirebaseStorage => {
  const firebaseApp = app || useFirebase();

  const storage = getStorage(firebaseApp);

  if (import.meta.env.VITE_USE_EMULATORS && !emulatorConnectionState.storageConnected) {
    emulatorConnectionState.storageConnected = true;

    connectStorageEmulator(storage, 'localhost', 9199);
  }

  return storage;
};

export const useFunctions = (app?: FirebaseApp): Functions => {
  const firebaseApp = app || useFirebase();

  const functions = getFunctions(firebaseApp);

  if (import.meta.env.VITE_USE_EMULATORS && !emulatorConnectionState.functionsConnected) {
    emulatorConnectionState.functionsConnected = true;

    connectFunctionsEmulator(functions, 'localhost', 5001);
  }

  return functions;
};

export const useAnalytics = (app?: FirebaseApp): Analytics => {
  const firebaseApp = app || useFirebase();

  return getAnalytics(firebaseApp);
};
