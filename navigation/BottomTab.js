import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrgApps from "../screens/OrgApps";
import Account from "../screens/Account";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="OrgApps" component={OrgApps} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
