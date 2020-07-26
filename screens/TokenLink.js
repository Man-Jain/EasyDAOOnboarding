import * as React from "react";
import { Image, View, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import LinkdropSDK from '@linkdrop/sdk'
import AsyncStorage from "@react-native-community/async-storage";

import Voting from "../assets/images/Voting.png";

export default function TokenLink({ navigation }) {
  const [text, setText] = React.useState("");

  const handleDropLink = async () => {
    var link = text.replace(
      "https://claim.linkdrop.io/#/",
      "https://claim.linkdrop.io/"
    );
    var url = new URL(link);

    try {
      AsyncStorage.getItem("user_ethaddress").then((value) => {
        const receiverAddress = value;

        const weiAmount = url.searchParams.get("weiAmount");
        const tokenAddress = url.searchParams.get("tokenAddress");
        const tokenAmount = url.searchParams.get("tokenAmount");
        const expirationTime = url.searchParams.get("expirationTime");
        const linkKey = url.searchParams.get("linkKey");
        const linkdropSignerSignature = url.searchParams.get(
          "linkdropSignerSignature"
        );
        const linkdropMasterAddress = url.searchParams.get(
          "linkdropMasterAddress"
        );
        const campaignId = url.searchParams.get("campaignId");

        const linkdropSDK = new LinkdropSDK({
          linkdropMasterAddress,
          factoryAddress: "0xBa051891B752ecE3670671812486fe8dd34CC1c8",
          сhain: "rinkeby",
          jsonRpcUrl: `https://rinkeby.infura.io/v3/67531e96ca3842cdabf3147f5d2a3742`,
          apiHost: `https://rinkeby.linkdrop.io`,
          claimHost: "https://claim.linkdrop.io",
        });

        linkdropSDK
          .claim({
            weiAmount, // Amount of wei per claim
            tokenAddress, // ERC20 token address
            tokenAmount, // Amount of ERC20 tokens to claim
            expirationTime,
            linkKey, // Link ephemeral key
            linkdropSignerSignature, // Signature of linkdrop signer
            receiverAddress, // Address of receiver
            campaignId,
          })
          .then((resp) => {
            console.log("resp", resp);
            navigation.replace("Buy");
          })
          .catch((error) => {
            console.log("error", error);
          });

        console.log(txHash);
      });
    } catch (e) {
      navigation.replace("Welcome");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Voting}
        style={{ width: 130, height: 130, marginTop: 100 }}
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
        onPress={handleDropLink}
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
