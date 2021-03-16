import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Col, Grid, Icon, Row } from "native-base";
import { Audio } from "expo-av";
import axios from "axios";

interface Props {}

interface State {
  recording: Boolean;
  paused: Boolean;
  duration: number;
  recordingObject: any;
  isFetching: Boolean;
  transcript: String;
}

export default class RecordingScreen extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recording: false,
      paused: false,
      duration: 0,
      recordingObject: undefined,
      isFetching: false,
      transcript: "",
    };
  }

  componentDidUpdate() {
    if (this.state.recordingObject) {
      this.getDuration();
    }
  }
  getTranscription = async (uri) => {
    // set isFetching to true, so the UI knows about it
    this.setState({ isFetching: true });
    try {
      // take the uri of the recorded audio from the file system
      // now we create formData which will be sent to our backend
      const formData = new FormData();
      formData.append(
        "file",
        JSON.stringify({
          uri: uri,
          // as different audio types are used for android and ios - we should handle it
          type: "audio/x-wav",
          name: `${Date.now()}.wav`,
        })
      );
      // post the formData to our backend
      const { data } = await axios.post(
        "http://localhost:3005/speech",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.transcript);
      // set transcript from the data which we received from the api
      this.setState({ transcript: data.transcript });
    } catch (error) {
      console.log("There was an error reading file", error);
      this.stopRecording();
      // we will take a closer look at resetRecording function further down
    }
    // set isFetching to false so the UI can properly react on that
    this.setState({ isFetching: false });
  };

  startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      await recording.startAsync();
      this.setState({ recordingObject: recording });
      console.log("Recording started");
      console.log(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  stopRecording = async () => {
    let status = await this.state.recordingObject.getStatusAsync();
    console.log(status.durationMillis);
    console.log("Stopping recording..");

    await this.state.recordingObject.stopAndUnloadAsync();

    const uri = this.state.recordingObject.getURI();
    this.setState({ recordingObject: undefined });
    console.log("Recording stopped and stored at", uri);
    this.getTranscription(uri);
  };

  getDuration = async () => {
    if (this.state.recordingObject != undefined) {
      try {
        let status = await this.state.recordingObject.getStatusAsync();
        this.setState({ duration: status.durationMillis });
      } catch (_) {}
    }
  };

  getDurationInMins(milis: number) {
    let seconds = milis / 1000;
    return (
      <Text style={this.styles.minutes}>
        {Math.floor(seconds / 60)} : {Math.floor(seconds % 60)}
      </Text>
    );
  }

  renderRecordingProgress() {
    return (
      <View>
        <Text style={this.styles.heading}>Recording Audio...</Text>
        {this.getDurationInMins(this.state.duration)}
        <Grid style={this.styles.grid}>
          <Row>
            <Col>
              <Button
                style={this.styles.Button}
                onPress={() => {
                  if (this.state.paused) {
                    this.state.recordingObject.startAsync();
                  } else {
                    this.state.recordingObject.pauseAsync();
                  }
                  this.setState({ paused: !this.state.paused });
                }}
                transparent
              >
                <Icon
                  style={this.styles.icon}
                  type="FontAwesome"
                  name={this.state.paused ? "play-circle" : "pause-circle"}
                />
              </Button>
            </Col>
            <Col>
              <Button
                style={this.styles.Button}
                onPress={() => {
                  this.setState({ recording: false });
                  this.stopRecording();
                }}
                transparent
              >
                <Icon
                  style={this.styles.icon}
                  type="FontAwesome"
                  name="stop-circle"
                />
              </Button>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
  renderPreRecording() {
    return (
      <View>
        <Text style={this.styles.heading}>Ready to record?</Text>
        <Text style={this.styles.texts}>
          If your presentation is happening virtually, make sure to connect your
          headphones or earphones, or place the phone at a foot away from you.
        </Text>
        <Text style={this.styles.texts}>
          If your presentation is happening in person, please stand up and place
          your phone about two feet from you.
        </Text>
        <Button
          large
          style={this.styles.Button}
          onPress={() => {
            this.setState({ recording: true });
            this.startRecording();
          }}
          transparent
        >
          <Icon style={this.styles.icon} type="FontAwesome" name="microphone" />
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.state.recording
          ? this.renderRecordingProgress()
          : this.renderPreRecording()}
      </View>
    );
  }

  styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      textAlign: "center",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "white",
    },
    heading: {
      fontSize: 25,
      color: "#42c8f5",
      flex: 1,
      textAlign: "left",
      justifyContent: "space-between",
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    Button: {
      flex: 1,
      flexDirection: "column-reverse",
      justifyContent: "flex-end",
      alignSelf: "center",
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    icon: {
      fontSize: 30,
    },
    texts: {
      fontSize: 20,
      flex: 1,
      textAlign: "left",
      justifyContent: "space-between",
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    minutes: {
      fontSize: 70,
      textAlign: "center",
      justifyContent: "space-between",
      marginLeft: 20,
      marginRight: 20,
      marginTop: 100,
    },
    grid: {
      textAlign: "center",
      justifyContent: "center",
      marginLeft: 20,
      marginRight: 20,
      marginTop: 100,
    },
  });
}
