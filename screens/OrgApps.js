import * as React from "react";
import { Image, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Headline,
  Subheading,
  Paragraph,
  Button,
  Card,
  Title,
} from "react-native-paper";
import Voting1 from "../assets/images/Voting1.png";
import Tokens from "../assets/images/Tokens.png";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "@aragon/connect";

export default function OrgApps({ navigation }) {
  const [orgApps, setOrgApps] = React.useState([]);

  React.useEffect(() => {
    try {
      let orgAddress;
      AsyncStorage.getItem("organization_address").then(async (value) => {
        console.log("Org", value);
        orgAddress = value;

        const org = await connect(
          // "0xAFAE8A53Bbb0ef8Ff0768468dE6D34a523458eBB",
          orgAddress,
          "thegraph",
          { chainId: 4 }
        );
        console.log("Orggg", org);
        const apps = await org.apps();
        console.log(apps);
        setOrgApps(apps);
      });
    } catch (e) {
      console.log(e);
    }
  }, orgApps);

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
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

        {orgApps.map((app) =>
          app.name ? (
            <Card style={{ width: 260, alignContent: "center", marginTop: 20 }}>
              <Image
                source={Voting1}
                style={{
                  width: 130,
                  height: 130,
                  marginLeft: 70,
                }}
              />

              <Title
                style={{
                  marginTop: 20,
                  marginLeft: 20,
                  textTransform: "uppercase",
                }}
              >
                {app.name}
              </Title>
              <Paragraph style={{ marginLeft: 20, marginBottom: 20 }}>
                Start voting to Proposals
              </Paragraph>
            </Card>
          ) : null
        )}

        <Button
          mode="contained"
          style={{ marginTop: 50, backgroundColor: "#0099ff" }}
          onPress={() => console.log("Pressed")}
          onPress={() => navigation.push("Organization")}
        >
          Buy Now
        </Button>
      </ScrollView>
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
