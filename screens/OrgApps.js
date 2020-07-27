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
  ActivityIndicator,
} from "react-native-paper";

import FINANCE from "../assets/images/FINANCE.png";
import TOKEN from "../assets/images/TOKEN.png";
import VOTING from "../assets/images/VOTING.png";
import VAULT from "../assets/images/VAULT.png";

import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "@aragon/connect";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Organization from "./Organization";
import TokenLink from "./TokenLink";

const Tab = createBottomTabNavigator();

export default function OrgApps({ navigation }) {
  const [orgApps, setOrgApps] = React.useState([]);

  const fetchOrgApps = async () => {
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
        let apps = await org.apps();
        console.log(apps);
        const votingapp = apps.find((app) => app.name === "voting");
        const votingappIndex = apps.findIndex((app) => app.name === "voting");
        const backupApp = apps[0];
        apps[0] = votingapp;
        apps.push(backupApp);
        apps.splice(votingappIndex, 1)
        setOrgApps(apps);
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchOrgApps();
  }, []);

  return (
    <View style={styles.container}>
      {orgApps.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Headline
            style={{
              color: "white",
              marginTop: 35,
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

          {orgApps.map((app, key) =>
            app.name ? (
              <Card
                onPress={() => {
                  navigation.push("Voting", {
                    address: app.address,
                  });
                }}
                style={{
                  width: 260,
                  alignContent: "center",
                  marginTop: 20,
                  backgroundColor: "#404e6e",
                  color: "white",
                }}
                key={key}
              >
                {app.name == "voting" ? (
                  <Image
                    source={VOTING}
                    style={{
                      width: 130,
                      height: 130,
                      marginLeft: 70,
                      marginTop: 20,
                    }}
                  />
                ) : null}
                {app.name == "finance" ? (
                  <View>
                    <Image
                      source={FINANCE}
                      style={{
                        width: 130,
                        height: 130,
                        marginLeft: 70,
                        marginTop: 20,
                      }}
                    />
                    <Subheading
                      style={{
                        marginTop: 15,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Not Working Yet
                    </Subheading>
                  </View>
                ) : null}
                {app.name == "vault" ? (
                  <View>
                    <Image
                      source={VAULT}
                      style={{
                        width: 130,
                        height: 130,
                        marginLeft: 70,
                        marginTop: 20,
                      }}
                    />
                    <Subheading
                      style={{
                        marginTop: 15,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Not Working Yet
                    </Subheading>
                  </View>
                ) : null}
                {app.name == "token-manager" ? (
                  <View>
                    <Image
                      source={TOKEN}
                      style={{
                        width: 130,
                        height: 130,
                        marginLeft: 70,
                        marginTop: 20,
                      }}
                    />
                    <Subheading
                      style={{
                        marginTop: 15,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Not Working Yet
                    </Subheading>
                  </View>
                ) : null}

                <Title
                  style={{
                    marginTop: 20,
                    marginLeft: 20,
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  {app.name}
                </Title>
                <Paragraph
                  style={{ marginLeft: 20, marginBottom: 20, color: "white" }}
                >
                  Start voting to Proposals
                </Paragraph>
              </Card>
            ) : null
          )}
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 51, 76)",
    alignItems: "center",

    padding: 10,
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
