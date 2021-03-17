import * as React from "react";

import { StyleSheet, View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryPolarAxis, VictoryTheme } from 'victory';


interface Props {}

interface State {
    transcription: string,
    sentiments: string,
}

const customData = require('./speech_results.json');
const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

export default class ProgressScreen extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
        transcription: customData["transcript"],
        sentiments: "",
    };
    console.log(customData);
  }

  readFiles(){
    console.log(customData);
  }

 
  render() {
    return (
      <View>
          <Text style={this.styles.heading}>
              { customData["date"] }
          </Text>
          <Text style={this.styles.texts}>
              { this.state.transcription }
          </Text>
          <Text style={this.styles.heading}>
              Sentiment Analytics
          </Text>
          <VictoryChart polar
            domain={{ x: [0, 360] }}
            theme={VictoryTheme.material}
        >
            <VictoryPolarAxis tickCount={8}/>
            <VictoryBar
            data={data}
            style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 }}}
            />
        </VictoryChart>
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
