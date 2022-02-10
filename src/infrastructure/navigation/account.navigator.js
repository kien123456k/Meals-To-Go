import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  const { setError } = useContext(AuthenticationContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      screenListeners={{
        state: () => {
          setError(null);
        },
      }}
    >
      <Stack.Screen name="Main" component={AccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
