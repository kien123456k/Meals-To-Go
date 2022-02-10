import React from "react";
import { LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import "react-native-gesture-handler";
import { getApps, initializeApp } from "firebase/app";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigator } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { firebaseConfig } from "./src/config/env";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core",
  "componentWillReceiveProps has been renamed",
]);

const App = () => {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <PaperProvider>
        <AuthenticationContextProvider>
          <Navigator />
        </AuthenticationContextProvider>
      </PaperProvider>
      <ExpoStatusBar style="auto" />
    </ThemeProvider>
  );
};

export default App;
