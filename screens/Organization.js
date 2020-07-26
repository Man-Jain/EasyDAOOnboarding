import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import organization from "../assets/images/Organization.png";
import { connect } from "@aragon/connect";
import AsyncStorage from "@react-native-community/async-storage";

export default function Organization({ navigation }) {
  const [text, setText] = React.useState("");
  const [showLoader, setShowLoader] = React.useState(false);
  const [orgStatus, setOrgStatus] = React.useState(false);

  const getOrganization = async () => {
    setShowLoader(true);
    if (!text) {
      Alert.alert(
        "Organization Not Entered",
        "Please Enter Organization ID or Address Into The Field"
      );
    }

    try {
      const org = await connect(
        // "0xAFAE8A53Bbb0ef8Ff0768468dE6D34a523458eBB",
        text,
        "thegraph",
        { chainId: 4 }
      );

      console.log(org);

      await AsyncStorage.setItem("organization_address", text);
      setShowLoader(false);
      setOrgStatus(true);
    } catch (e) {
      setShowLoader(false);
      Alert.alert(
        "Error Fetching Organization",
        "Make Sure You Have Entered The Correct Organization Info"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={organization}
        style={{ width: 140, height: 130, marginTop: 150 }}
      />
      <Headline style={{ color: "white", marginTop: 35, fontSize: 30 }}>
        Enter Organization ID
      </Headline>
      <TextInput
        style={{
          marginTop: 45,
          fontSize: 12,
          backgroundColor: "white",
          height: 30,
          width: 250,
          borderRadius: 30,
          alignContent: "center",
          textAlign: "center",
        }}
        placeholder="Organization ID or Address"
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      {showLoader ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : orgStatus ? (
        <View style={{ marginTop: 50 }}>
          <Headline style={{ color: "white", fontSize: 15 }}>
            Organization Found
          </Headline>
          <Button
            mode="contained"
            style={{ marginTop: 15, backgroundColor: "#0099ff" }}
            onPress={() => navigation.push("TokenLink")}
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
          onPress={() => getOrganization()}
          icon={{
            uri:
              "https://www.seekpng.com/png/full/793-7936273_how-to-create-css-search-box-form-design.png",
          }}
        >
          Open Organization
        </Button>
      )}
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
