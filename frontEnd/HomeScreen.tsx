import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
} from "native-base";
import { Image, Alert } from "react-native";
import FilePickers from "./FilePickers";
import AudioRecorder from "./AudioRecorder";
import RecordingScreen from "./RecordingScreen";

interface HomeProps {}

interface HomeState {
  firstDisplay: boolean;
}

export default class HomeScreen extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstDisplay: false,
    };
  }

  componentDidUpdate(prevState: any) {
    if (prevState.firstDisplay == false) {
      this.setState({ firstDisplay: true });
    }
  }

  render() {
    if (!this.state.firstDisplay) {
      return (
        <View style={this.styles.mainContainer}>
          <Image
            source={require("./static/Enunciate.png")}
            style={this.styles.logo}
          />
          <Image
            source={require("./static/intro-pic.png")}
            style={this.styles.introPic}
          />
          <Container style={this.styles.intro}>
            <Text style={this.styles.introText}>
              Enunciate is a mobile application that aids users who are
              practicing public speaking. By measuring use of filler words, long
              pauses, and other signs of poor speech patterns, Enunciate
              provides a quanitative score to help users keep track of their
              progress and identify sources for improvement.
            </Text>
            <Text style={this.styles.introText}>
              Enunciate does not keep your audio recordings.
            </Text>

            <Button
              success
              style={this.styles.introButton}
              onPress={() => this.setState({ firstDisplay: true })}
            >
              <Text> Get Started </Text>
            </Button>
            {/* <FilePickers.pickAudioButton />
              <FilePickers.pickTextButton /> */}
            {/* <AudioRecorder /> */}
          </Container>
        </View>
      );
    }
    if (this.state.firstDisplay) {
      return (
        <View style={this.styles.mainContainer}>
          <Container>
            <Header />
            <Content>
              <RecordingScreen />
            </Content>
            <Footer>
              <FooterTab>
                <Button active>
                  <Text>Record</Text>
                </Button>
                <Button>
                  <Text>Progress</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </View>
      );
    }
  }

  styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "white",
    },
    logo: {
      alignSelf: "center",
      padding: 5,
      marginTop: 120,
    },
    introPic: {
      marginTop: 20,
    },
    intro: {
      marginTop: 10,
      marginLeft: 30,
      marginRight: 30,
    },
    introText: {
      marginTop: 10,
    },
    introButton: {
      margin: 20,
      marginTop: 40,
      paddingLeft: 20,
      paddingRight: 20,
      alignSelf: "center",
    },
  });
}
