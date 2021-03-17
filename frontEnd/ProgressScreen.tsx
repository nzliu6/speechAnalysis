import * as React from "react";

import { StyleSheet, View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPolarAxis } from "victory-native";

interface Props {}

interface State {
    transcription: string,
    sentiments: string,
}

const customData = require('./speech_results.json');
const data = {'analytical':0, 'confident':0, 'tentative': 0};

export default class ProgressScreen extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
        transcription: customData["transcript"],
        sentiments: "",
    };
    console.log(customData);
    this.readFiles();
  }

  readFiles(){
    var tones = customData["document_tone"]["tones"]
    for(var i=0; i<tones.length; i++) {
        data[tones[i]["tone_id"]] += 1;
    }
  }

 
  render() {
  
    return (
      <View>
          <Text style={this.styles.heading}>
              { customData["date"] }
          </Text>
          <Text style={this.styles.heading2}>
              Recorded Transcription
          </Text>
          <Text style={this.styles.texts}>
              Confidence level: {customData["confidence"]}
          </Text>
          <Text style={this.styles.script}>
              "{ this.state.transcription }"
          </Text>
          <Text style={this.styles.heading}>
              Sentiment Analytics
          </Text>
          <View style={this.styles.container}>
          <VictoryChart polar
            theme={VictoryTheme.material}
            >
            {
                ["analytical", "confident", "tentative"].map((d, i) => {
                return (
                    <VictoryPolarAxis dependentAxis
                    key={i}
                    label={d}
                    labelPlacement="perpendicular"
                    axisValue={d}
                    />
                );
                })
            }
            <VictoryBar
                style={{ data: { fill: "tomato", width: 25 } }}
                data={[
                { x: "analytical", y: data["analytical"] },
                { x: "confident", y: data["confident"] },
                { x: "tentative", y: data["tentative"] },
                ]}
            />
            </VictoryChart>
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
      },
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
    heading2: {
        fontSize: 23,
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
    script: {
        fontSize: 20,
        flex: 1,
        textAlign: "left",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        fontStyle: 'italic'
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
