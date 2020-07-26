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
  BottomNavigation,
  Text,
  List,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Voting1 from "../assets/images/Voting1.png";
import Tokens from "../assets/images/Tokens.png";

export function HomeRoute({ navigation }) {
  return (
    <View style={styles.container}>
      <Headline
        style={{
          color: "white",
          marginTop: 75,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        testaragon.aragonid.eth
      </Headline>
      <Subheading
        style={{ marginTop: 15, color: "white", textAlign: "center" }}
      >
        What would you like to do?
      </Subheading>
      <Card
        style={{ width: 260, alignContent: "center", marginTop: 20 }}
        onPress={() => navigation.push("Voting")}
      >
        <Image
          source={Voting1}
          style={{
            width: 130,
            height: 130,
            marginLeft: 70,
          }}
        />

        <Title style={{ marginTop: 20, marginLeft: 20 }}>Voting</Title>
        <Paragraph style={{ marginLeft: 20, marginBottom: 20 }}>
          Start voting to Proposals
        </Paragraph>
      </Card>
      <Card style={{ width: 260, alignContent: "center", marginTop: 20 }}>
        <Image
          source={Tokens}
          style={{
            width: 130,
            height: 130,
            marginLeft: 70,
          }}
        />

        <Title style={{ marginTop: 20, marginLeft: 20 }}>Tokens</Title>
        <Paragraph style={{ marginLeft: 20, marginBottom: 20 }}>
          Manage Tokens for DAO
        </Paragraph>
      </Card>
    </View>
  );
}

const AccountRoute = () => (
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
    <Subheading style={{ marginTop: 15, color: "white", textAlign: "center" }}>
      0xAF...58eBB
    </Subheading>

    <List.Item
      style={{ color: "white" }}
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

export default function Choice() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "account", title: "Account", icon: "account" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
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
