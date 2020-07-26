import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

import Aragon from "../assets/images/aragon.png";

export default function Welcome({ navigation }) {

  React.useEffect(() => {
    try {
      AsyncStorage.getItem('user_email').then((value) => {
        console.log('value', value)
        if(value !== null) {
          navigation.replace("Organization");
        }
      })
    } catch(e) {
      console.log('e', e)
    }

    try {
      AsyncStorage.getItem('organization_address').then((value) => {
        console.log('value', value)
        if(value !== null) {
          navigation.replace("Choice");
        }
      })
    } catch(e) {
      console.log('e', e)
    }
  })

  return (
    <View style={styles.container}>
      <Image
        source={Aragon}
        style={{ width: 100, height: 100, marginTop: 150 }}
      />
      <Headline style={{ color: "white", marginTop: 35, fontSize: 30 }}>
        Welcome To Aragon
      </Headline>
      <Paragraph
        style={{
          color: "white",
          marginTop: 45,
          fontSize: 17,

          alignContent: "center",
          textAlign: "center",
          width: 270,
        }}
      >
        Join a DAO and start participating in just a few clicks
      </Paragraph>
      <Button
        mode="contained"
        style={{ marginTop: 50, backgroundColor: "#0099ff" }}
        onPress={() => console.log("Pressed")}
        onPress={() => navigation.navigate("Email")}
      >
        Get Started
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 51, 76)",
    alignItems: "center",
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
