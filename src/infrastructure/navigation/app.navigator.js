import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../infrastructure/theme/colors";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { CartContextProvider } from "../../services/cart/cart.context";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { CheckoutNavigator } from "./checkout.navigator";
import { MapScreen } from "../../features/map/screen/map.screen";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  RestaurantsNavigator: "md-restaurant",
  CheckoutNavigator: "md-cart",
  Map: "md-map",
  SettingsNavigator: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: colors.brand.primary,
    tabBarInactiveTintColor: colors.brand.muted,
    headerShown: false,
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen
              options={{
                tabBarLabel: "Restaurants",
              }}
              name="RestaurantsNavigator"
              component={RestaurantsNavigator}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Checkout",
              }}
              name="CheckoutNavigator"
              component={CheckoutNavigator}
            />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen
              options={{
                tabBarLabel: "Settings",
              }}
              name="SettingsNavigator"
              component={SettingsNavigator}
            />
          </Tab.Navigator>
        </CartContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
