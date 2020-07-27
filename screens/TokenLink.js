import * as React from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import LinkdropSDK from "@linkdrop/sdk";
import AsyncStorage from "@react-native-community/async-storage";

import Voting from "../assets/images/Voting.png";

export default function TokenLink({ navigation }) {
  const [text, setText] = React.useState("");
  const [showLoader, setShowLoader] = React.useState(false);
  const [claimStatus, setClaimStatus] = React.useState(false);

  const handleDropLink = async () => {
    setShowLoader(true);
    if (!text) {
      Alert.alert(
        "Organization Not Entered",
        "Please Enter Organization ID or Address Into The Field"
      );
    }
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
          .then(async (resp) => {
            console.log("resp", resp);
            try {
              await AsyncStorage.setItem(
                "organization_token_address",
                tokenAddress
              );
            } catch (e) {
              console.log(e);
            }
          })
          .catch((error) => {
            Alert.alert(
              "Error! Cannot Claim Tokens",
              "There was some error in claiming tokens"
            );
            console.log("error", error);
          });

        console.log(txHash);
      });
    } catch (e) {
      console.log("error", e);
      Alert.alert(
        "Error! Cannot Claim Tokens",
        "There was some error in claiming tokens"
      );
    }
    setShowLoader(false);
    setClaimStatus(true);
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
        Enter Your DAO Token Link
      </Headline>
      <Subheading
        style={{ marginTop: 15, color: "white", textAlign: "center" }}
      >
        These Token constitute the power you have in the organization
      </Subheading>
      <TextInput
        style={{
          marginTop: 35,
          width: 300,
          backgroundColor: "white",
          height: 50,
          borderRadius: 10,
          alignContent: "center",
          padding: 10,
        }}
        placeholder="Enter Tokens Link"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      {showLoader ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : claimStatus ? (
        <View style={{ marginTop: 35 }}>
          <Headline style={{ color: "white", fontSize: 15 }}>
            Tokens Claimed
          </Headline>
          <Button
            mode="contained"
            style={{ marginTop: 15, backgroundColor: "#0099ff" }}
            onPress={() => navigation.push("Buy")}
            icon={{
              uri: "https://image.flaticon.com/icons/png/512/61/61222.png",
            }}
          >
            Next
          </Button>
        </View>
      ) : (
        <Button
          mode="contained"
          style={{ marginTop: 50, backgroundColor: "#0099ff" }}
          onPress={handleDropLink}
          icon={{
            uri:
              "https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/3563915481595156041-512.png",
          }}
        >
          Claim Tokens{" "}
        </Button>
      )}
      <Button
        mode="text"
        style={{ marginTop: 30, color: "white" }}
        onPress={() => navigation.push("Buy")}
        color="white"
      >
        Skip if you have no such link
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
