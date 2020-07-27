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
  ProgressBar,
  Colors,
  ActivityIndicator,
} from "react-native-paper";
import { Voting } from "@aragon/connect-thegraph-voting";

export default function Choice({ navigation, route }) {
  const [votes, setVotes] = React.useState([]);

  const getProgress = (votes) => {
    if(votes === 0) {
      return 0
    }
    else {
      return votes / 10 ** 18
    }
  }

  const fetchVotes = () => {
    const { address } = route.params;
    console.log("address", address);

    const voting = new Voting(
      address,
      "https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-rinkeby"
    );
    console.log(voting);
    voting
      .votes()
      .then((resp) => {
        setVotes(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("votes", votes);
  };

  React.useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {votes.length === 0 ? (
          <ActivityIndicator />
        ) : (
          votes.map((vote, key) => (
            <Card
              style={{
                width: 260,
                alignContent: "center",
                marginTop: 20,
                marginBottom: 20,
                backgroundColor: "#404e6e",
              }}
              key={key}
            >
              <Button
                icon="thumb-up"
                mode="contained"
                style={{ backgroundColor: "rgb(50, 51, 96)" }}
              >
                Voting
              </Button>
              <Headline
                style={{
                  marginTop: 15,
                  fontSize: 20,
                  textAlign: "center",
                  color: "white",
                }}
              >
                {"#"}
                {key} {vote.metadata}
              </Headline>
              <Headline
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Yes{"  - "} {vote.yea / 10 ** 18}
              </Headline>
              <ProgressBar
                progress={getProgress(vote.yea)}
                color={Colors.blue400}
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              <Headline
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  textAlign: "center",
                  color: "white",
                }}
              >
                No{" - "} {vote.nay / 10 ** 18}
              </Headline>
              <ProgressBar
                progress={getProgress(vote.nay)}
                color={Colors.blue400}
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              <Headline
                style={{
                  color: "white",
                  marginTop: 10,
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Reject
              </Headline>
            </Card>
          ))
        )}
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
