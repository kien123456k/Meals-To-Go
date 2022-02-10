const env = {
  firebaseFunctionHost: "your firebase function hosting",
  firebaseConfig: {
    apiKey: "your firebase api key",
    authDomain: "your firebase auth domain",
    projectId: "your firebase project ID",
    storageBucket: "your firebase storage bucket",
    messagingSenderId: "your firebase message sender ID",
    appId: "your firebase app ID",
    measurementId: "your firebase measure ID",
  },
  stripePublicKey: "your stripe public key",
  mockingData: true,
};

export const {
  firebaseFunctionHost,
  firebaseConfig,
  stripePublicKey,
  mockingData,
} = env;
