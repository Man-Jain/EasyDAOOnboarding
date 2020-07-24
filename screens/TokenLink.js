import * as React from "react";
import { Image, View, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import Voting from "../assets/images/Voting.png";

export default function TokenLink({ navigation }) {
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      <Image
        source={Voting}
        style={{ width: 130, height: 130, marginTop: 25 }}
      />
      <Headline
        style={{
          color: "white",
          marginTop: 35,
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Enter Your Voting Token Link
      </Headline>
      <Subheading
        style={{ marginTop: 15, color: "white", textAlign: "center" }}
      >
        These Token constitute the power you have in the organization
      </Subheading>
      <TextInput
        style={{
          marginTop: 45,
          fontSize: 17,
          backgroundColor: "white",
          height: 30,
          width: 200,
          borderRadius: 30,
          alignContent: "center",
          textAlign: "center",
        }}
        placeholder="Enter Tokens Link"
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button
        mode="contained"
        style={{ marginTop: 50, backgroundColor: "#0099ff" }}
        onPress={() => console.log("Pressed")}
        onPress={() => navigation.push("Buy")}
      >
        Claim Tokens{" "}
      </Button>
      <Subheading style={{ marginTop: 45, color: "white" }}>
        Skip if you have no such link
      </Subheading>
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