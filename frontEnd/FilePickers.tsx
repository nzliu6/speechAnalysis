import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "react-native";

function pickAudioButton() {
  return (
    <Button
      onPress={() => pickButton("audio/*")}
      title="Pick an Audio File"
      color="#841584"
      accessibilityLabel="Pick an Audio File"
    />
  );
}

function pickTextButton() {
  return (
    <Button
      onPress={() => pickButton("text/*")}
      title="Pick an Audio File"
      color="#841584"
      accessibilityLabel="Pick text File"
    />
  );
}

const pickButton = async (type: string): Promise<any> => {
  try {
    const res = await DocumentPicker.getDocumentAsync({
      type: type,
      copyToCacheDirectory: true,
    });
    console.log(res);
  } catch (err) {
    throw err;
  }
};

export default { pickAudioButton, pickTextButton };
