import React from "react";
import AppLoading from "expo-app-loading";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

interface AppProps {}

interface AppState {
  isReady: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    // if (!this.state.isReady) {
    //   return <AppLoading />;
    // }

    return (
      <Container>
        <HomeScreen />
      </Container>
    );
  }
}
