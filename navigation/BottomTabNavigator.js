import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/Welcome";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Share",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-share" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Credentials"
        component={CredentialScreen}
        options={{
          title: "My Credentials",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Hello";
    case "Links":
      return "Immunity Creds";
    case "Profile":
      return "Immunity Creds";
  }
}
