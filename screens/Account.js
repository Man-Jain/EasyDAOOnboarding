import * as React from "react";
import { Image, View, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Headline,
  Subheading,
  Paragraph,
  Button,
  Card,
  Title,
  ProgressBar,
  Colors,
  List,
} from "react-native-paper";

export default function Account({ navigation }) {
  return (
    <View style={styles.container}>
      <Headline
        style={{
          color: "white",
          marginTop: 15,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Manage Account
      </Headline>
      <Headline
        style={{
          color: "white",
          marginTop: 15,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        200$
      </Headline>
      <Subheading
        style={{ marginTop: 15, color: "white", textAlign: "center" }}
      >
        0xAF...58eBB
      </Subheading>

      <Subheading
        style={{ marginTop: 15, color: "white", textAlign: "center" }}
      >
        0xAF...58eBB
      </Subheading>

      <List.Item
        color="white"
        title=" Ether 0.5 ETH"
        left={(props) => <List.Icon {...props} icon="ethereum" />}
      />
      <List.Item
        title="Token 0.5 TKN"
        left={(props) => <List.Icon {...props} icon="folder" />}
      />
      <List.Item
        title="Manage Wallet"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
      />
      <List.Item
        title="Manage Organizations"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
      />
      <List.Item
        title="Redeem Linkdrop"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
      />
      <List.Item
        title="Buy Crypto"
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 51, 76)",
    alignItems: "center",
    color: "white",
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
