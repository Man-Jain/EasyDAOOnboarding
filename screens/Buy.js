import * as React from "react";
import { Image, View, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import Eth from "../assets/images/Eth.png";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";


export default function Buy({ navigation }) {
  const [text, setText] = React.useState("");
  const [userAddress, setUserAddress] = React.useState("")

  React.useEffect(() => {
    try {
      AsyncStorage.getItem('user_ethaddress').then((value) => {
        console.log('value', e)
        setUserAddress(value)
      })
    } catch(e) {
      console.log('e', e)
    }
  })

  return (
    <View style={styles.container}>
      <Image source={Eth} style={{ width: 250, height: 250, marginTop: 25 }} />
      <Headline
        style={{
          color: "white",
          marginTop: 5,
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Let's buy some ETH
      </Headline>
      <Subheading
        style={{ marginTop: 15, color: "white", textAlign: "center" }}
      >
        ETH is needed for performing actions like Voting, Token Management and for performing other 
        DAO operations.
      </Subheading>
      <Subheading
        style={{ marginTop: 10, color: "white", textAlign: "center" }}
      >
        If you'd like you can skip this step for now and do it later
      </Subheading>
      <Button
        mode="outlined"
        style={{ marginTop: 50, borderColor: "white" }}
        onPress={() => console.log("Pressed")}
        onPress={() => navigation.push("TransaktScreen")}
        color="white"
      >
        Buy Now
      </Button>
      <Button
        mode="outlined"
        style={{ marginTop: 20, borderColor: "white" }}
        onPress={() => console.log("Pressed")}
        onPress={() => navigation.push("OrgApps")}
        color="white"
      >
        Go To Organization
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
