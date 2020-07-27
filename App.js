import './global';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import Welcome from "./screens/Welcome";
import Email from "./screens/Email";
import Organization from "./screens/Organization";
import TokenLink from "./screens/TokenLink";
import Buy from "./screens/Buy";
import Voting from "./screens/Voting";
import BottomTab from "./navigation/BottomTab";
import TransaktScreen from './screens/TransaktScreen';
import { Magic } from "@magic-sdk/react-native";
export const Web3 = require('web3');

export const m = new Magic("pk_test_128736FEB952AFC9", {
  network: "rinkeby", // Supports "rinkeby", "ropsten", "kovan"
}); // ✨

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <PaperProvider>
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}

            <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
            <Stack.Screen options={{ headerShown: false }} name="Email" component={Email} />
            <Stack.Screen options={{ headerShown: false }} name="Organization" component={Organization} />
            <Stack.Screen options={{ headerShown: false }} name="TokenLink" component={TokenLink} />
            <Stack.Screen options={{ headerShown: false }} name="Buy" component={Buy} />
            <Stack.Screen options={{ headerShown: false }} name="BottomTab" component={BottomTab} />
            <Stack.Screen screenOptions={{headerShown: true, headerTitle: 'Votes'}} name="Voting" component={Voting} />
            <Stack.Screen screenOptions={{headerShown: true, headerTitle: 'Buy Crypto'}} name="TransaktScreen" component={TransaktScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    width: 130,
    marginLeft: 120,
    borderRadius: 25,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
