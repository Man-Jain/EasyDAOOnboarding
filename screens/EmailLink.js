import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import EmailWhite from "../assets/images/EmailWhite.png";

export default function Email({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={EmailWhite}
        style={{ width: 100, height: 130, marginTop: 100 }}
      />
      <Headline
        style={{
          color: "white",
          marginTop: 35,
          fontSize: 30,
          textAlign: "center",
        }}
      >
        An Email Has Been Sent To Your Email Address
      </Headline>
      {/* <Headline
        style={{
          color: "white",
          marginTop: 15,
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Please click on the email icon{" "}
      </Headline> */}
      <Button
        mode="contained"
        style={{ marginTop: 50, backgroundColor: "#0099ff" }}
        onPress={() => console.log("Pressed")}
        onPress={() => navigation.push("Organization")}
      >
        Please click here to move forward
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
