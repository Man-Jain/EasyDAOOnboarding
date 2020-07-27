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
  Text,
  Divider,
} from "react-native-paper";
import Wallet from "ethereumjs-wallet";
import wallet from "../assets/images/wallet.png";
import AsyncStorage from "@react-native-community/async-storage";

export default function Account({ navigation }) {
  const [ethPrice, setETHPrice] = React.useState(1);
  const [userBalance, setUserBalance] = React.useState(1);
  const [userAddress, setUserAddress] = React.useState("0x00");
  const [tokenAddressBalance, setTokenBalance] = React.useState(1);
  const [tokenDetails, setTokenDetails] = React.useState({tokenSymbol: "TKN", tokenName: "TOKEN"});

  const getShortAddress = (longAddress) => {
    const shortUserAddress =
      longAddress.substring(0, 7) +
      "..." +
      longAddress.substring(longAddress.length - 7, longAddress.length);

    return shortUserAddress;
  };

  const fetchETHPrice = () => {
    const url =
      "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=58VFC5W127JKU27R1S338C9I4QFGHIIWN1";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setETHPrice(json.result.ethusd);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserBalance = async () => {
    try {
      const address = await AsyncStorage.getItem("user_ethaddress");
      setUserAddress(address);
      console.log(address);
      const url = `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=58VFC5W127JKU27R1S338C9I4QFGHIIWN1`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (json.result === 0) {
            setUserBalance(0);
          }
          setUserBalance(json.result / 10 ** 18);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getTokenBalance = async () => {
    try {
      const tokenAddress = await AsyncStorage.getItem(
        "organization_token_address"
      );
      const address = await AsyncStorage.getItem("user_ethaddress");
      console.log(tokenAddress);
      const url = `https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}&tag=latest&apikey=58VFC5W127JKU27R1S338C9I4QFGHIIWN1`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (json.result === 0) {
            set(0);
          }
          setTokenBalance(json.result / 10 ** 18);
        })
        .catch((error) => {
          console.error(error);
        });

      const url2 = `https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${address}&page=1&offset=0&sort=asc&apikey=58VFC5W127JKU27R1S338C9I4QFGHIIWN1`;
      fetch(url2)
        .then((response) => response.json())
        .then((json) => {
          const tokenD = {
            tokenSymbol: json.result[0].tokenSymbol,
            tokenName: json.result[0].tokenName,
          };
          setTokenDetails(tokenD);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchETHPrice();
    getUserBalance();
    getTokenBalance();
  }, []);

  return (
    <View style={styles.container}>
      <Headline
        style={{
          color: "white",
          marginTop: 55,
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
          fontSize: 30,
          textAlign: "center",
        }}
      >
        {Math.round(ethPrice * userBalance * 100) / 100} $
      </Headline>
      <Subheading style={{ marginTop: 5, color: "white", textAlign: "center" }}>
        {getShortAddress(userAddress)}
      </Subheading>
      <View style={styles.container}>
        <List.Section>
          <List.Item
            titleStyle={{ color: "white" }}
            title={`Ethereum - ${userBalance} ETH`}
            left={() => (
              <List.Icon
                icon={({ size, color }) => (
                  <Image
                    source={require("../assets/images/ethereum.png")}
                    style={{ width: size, height: 40 }}
                  />
                )}
              />
            )}
          />
          <List.Item
            title={`${tokenDetails.tokenName} - ${tokenAddressBalance} ${""} ${
              tokenDetails.tokenSymbol
            }`}
            titleStyle={{ color: "white" }}
            left={() => (
              <List.Icon
                color="#000"
                icon={({ size, color }) => (
                  <Image
                    source={require("../assets/images/Eth.png")}
                    style={{ width: size, height: 40 }}
                  />
                )}
              />
            )}
          />
        </List.Section>
        <Divider style={{ color: "white", size: 20, height: 2 }} />
        <List.Section>
          <List.Item
            title="Manage Wallet"
            titleStyle={{ color: "white" }}
            left={() => (
              <List.Icon
                icon={({ size, color }) => (
                  <Image
                    source={require("../assets/images/wallet.png")}
                    style={{ width: size, height: size }}
                  />
                )}
              />
            )}
            onPress={() => navigation.push("Buy")}
          />
          <List.Item
            title="Manage Organization"
            titleStyle={{ color: "white" }}
            left={() => (
              <List.Icon
                color="#000"
                icon={({ size, color }) => (
                  <Image
                    source={require("../assets/images/Organ.png")}
                    style={{ width: size, height: size }}
                  />
                )}
              />
            )}
            onPress={() => navigation.push("Organization")}
          />
          <List.Item
            title="Redeem Linkdrop"
            titleStyle={{ color: "white" }}
            left={() => (
              <List.Icon
                color="white"
                icon={({ size, color }) => (
                  <Image
                    source={require("../assets/images/Linkdrop.png")}
                    style={{ width: 30, height: size }}
                  />
                )}
              />
            )}
            onPress={() => navigation.push("TokenLink")}
          />
          <List.Item
            title="Buy Crypto"
            titleStyle={{ color: "white" }}
            left={() => (
              <List.Icon
                color="white"
                icon={({ size, color }) => (
                  <Image
                    source={require("../assets/images/Crypto.png")}
                    style={{ width: size, height: size }}
                  />
                )}
              />
            )}
            onPress={() => navigation.push("TransaktScreen")}
          />
        </List.Section>
      </View>
      {/* <Button
        textAlign="left"
        icon={({ size, color }) => (
          <Image
            source={require("../assets/images/ethereum.png")}
            style={{ width: size, height: 30 }}
          />
        )}
        size={50}
        mode="text"
        color="white"
        labelStyle={{
          fontSize: 17,
        }}
      >
        Ethereum <Text style={{ marginLeft: 65, color: "white" }}>0.5 ETH</Text>
      </Button>
      <Button
        textAlign="left"
        icon={({ size, color }) => (
          <Image
            source={require("../assets/images/Eth.png")}
            style={{ width: size, height: 30 }}
          />
        )}
        size={50}
        mode="text"
        color="white"
        labelStyle={{
          fontSize: 17,
        }}
      >
        Token <Text style={{ marginLeft: 40, color: "white" }}>0.5 TKN</Text>
      </Button> */}
      {/* <Subheading
        style={{ marginTop: 15, color: "white", textAlign: "center" }}
      >
        <Image source={wallet} />
        Ethereum <span style={{ marginLeft: 30 }}>0.5 ETH</span>
      </Subheading> */}
      {/* <List.Item
        color="white"
        title=" Ether 0.5 ETH"
        left={(props) => <List.Icon {...props} icon="ethereum" />}
      />
      <List.Item
        title="Token 0.5 TKN"
        left={(props) => <List.Icon {...props} icon="folder" />}
      /> */}

      {/* <Button
        textAlign="left"
        icon={({ size, color }) => (
          <Image
            source={require("../assets/images/wallet.png")}
            style={{ width: size, height: size }}
          />
        )}
        size={50}
        mode="text"
        color="white"
        labelStyle={{
          fontSize: 17,
        }}
        style={{
          backgroundColor: "transparent",
          color: "white",
          fontWeight: "bolder",
        }}
      >
        Manage Wallet{" "}
      </Button>
      <Button
        icon={({ size, color }) => (
          <Image
            source={require("../assets/images/Organ.png")}
            style={{ width: size, height: size }}
          />
        )}
        labelStyle={{
          fontSize: 17,
        }}
        mode="text"
        style={{ backgroundColor: "transparent", color: "white" }}
        color="white"
      >
        Manage Organization{" "}
      </Button>
      <Button
        icon={({ size, color }) => (
          <Image
            source={require("../assets/images/Linkdrop.png")}
            style={{ width: size, height: size }}
          />
        )}
        labelStyle={{
          fontSize: 17,
        }}
        mode="text"
        style={{ backgroundColor: "transparent", color: "white" }}
        color="white"
      >
        Redeem Linkdrop
      </Button>
      <Button
        icon={({ size, color }) => (
          <Image
            source={require("../assets/images/Crypto.png")}
            style={{ width: size, height: size }}
          />
        )}
        labelStyle={{
          fontSize: 17,
        }}
        mode="text"
        style={{ backgroundColor: "transparent", color: "white" }}
        color="white"
      >
        Buy Crypto
      </Button> */}
      {/* <List.Item
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
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 51, 76)",
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
});
