import * as React from "react";
import { Image, View, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import Eth from "../assets/images/Eth.png";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";


export default function TransaktScreen({ navigation }) {
  const [userAddress, setUserAddress] = React.useState("")

  React.useEffect(() => {
    navigation.setParams({ isHeaderVisible: true });
    try {
      AsyncStorage.getItem('user_ethaddress').then((value) => {
        console.log('value', e)
        setUserAddress(value)
      })
    } catch(e) {
      console.log('e', e)
    }
  }, userAddress)

  return (
    <View style={styles.container}>
      <WebView
        source={{
          html: `
            <iframe
            width="100%"
            height="100%"
            src="https://global.transak.com?apiKey=32c23eaa-49e4-44cf-85ca-4fc08ae15c8f&walletAddress=${userAddress}"
            frameborder="0"
          ></iframe>`,
        }}
        scalesPageToFit={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgb(40, 51, 76)",
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
  