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
} from "react-native-paper";

export default function Choice({ navigation }) {
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
        Voting{" "}
      </Headline>
      <Card style={{ width: 260, alignContent: "center", marginTop: 20 }}>
        <Button icon="thumb-up" mode="contained">
          Voting
        </Button>
        <Headline
          style={{
            marginTop: 15,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          #0: Should we keep our investments in ETH{" "}
        </Headline>
        <Headline
          style={{
            marginTop: 10,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Yes{" "}
        </Headline>
        <ProgressBar progress={0.2} color={Colors.red800} />
        <Headline
          style={{
            marginTop: 10,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          No{" "}
        </Headline>
        <ProgressBar progress={0.5} color={Colors.red800} />
        <Headline
          style={{
            color: "Red",
            marginTop: 10,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Reject
        </Headline>
      </Card>
      <Card style={{ width: 260, alignContent: "center", marginTop: 20 }}>
        <Button icon="thumb-up" mode="contained">
          Voting
        </Button>
        <Headline
          style={{
            marginTop: 15,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          #0: Should we keep our investments in ETH{" "}
        </Headline>
        <Headline
          style={{
            marginTop: 10,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Yes{" "}
        </Headline>
        <ProgressBar progress={0.5} color={Colors.red800} />
        <Headline
          style={{
            marginTop: 10,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          No{" "}
        </Headline>
        <ProgressBar progress={0.2} color={Colors.red800} />
        <Headline
          style={{
            color: "Red",
            marginTop: 10,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Reject
        </Headline>
      </Card>
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
