import * as React from "react";
import { Button, Text } from "react-native";
import { Audio } from "expo-av";

export default function Recorder() {
  const [recording, setRecording] = React.useState<any>();
  const [duration, setDuration] = React.useState<number>(0);

  React.useEffect(() => {
    if (recording) {
      getDuration();
    }
  });

  async function startRecording() {
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
      setRecording(recording);
      console.log("Recording started");
      console.log(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    let status = await recording.getStatusAsync();
    console.log(status.durationMillis);
    console.log("Stopping recording..");
    setRecording(undefined);

    await recording.stopAndUnloadAsync();

    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  async function getDuration() {
    let status = await recording.getStatusAsync();
    setDuration(status.durationMillis);
  }

  return (
    <>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text>{duration}</Text>
    </>
  );
}
