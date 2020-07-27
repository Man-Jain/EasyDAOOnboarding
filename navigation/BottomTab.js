import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrgApps from "../screens/OrgApps";
import Account from "../screens/Account";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Apps") {
            iconName = focused ? "md-apps" : "md-apps";
          } else if (route.name === "Manage Account") {
            iconName = focused ? "md-person" : "md-person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "rgb(40, 51, 76)",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Apps" component={OrgApps} />
      <Tab.Screen name="Manage Account" component={Account} />
    </Tab.Navigator>
  );
}
