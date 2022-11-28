import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Plotly from "react-native-plotly";
import vars from '../css/vars';

const upData = [
  {
    x: [
        -23.973875046,
        -23.973875046,
        -23.973875046,
        -23.973855367,
        -23.973855367,
        -23.973835688,
        -23.973835688,
        -23.973816009,
        -23.973816009,
        -23.97379633,
      ],
      "y":  [
        -46.371936124,
        -46.371678395,
        -46.371678395,
        -46.371678395,
        -46.371936124,
        -46.371936124,
        -46.371678395,
        -46.371678395,
        -46.371936124,
        -46.371936124,
      ],
      "z":  [
        100,
        110,
        120,
        110,
        140,
        150,
        160,
        120,
        110,
        130,
      ],
    type: "contour"
  }
];


export default class Plot extends React.Component {
    componentDidMount(){
        this.setState({ data: [
            {
                "x":    this.props.dados.x,
                "y":    this.props.dados.y,
                "z":    this.props.dados.z,
                type: "contour"
            }
          ]});
    }
    state = {
        data: upData,
        layout: { title: "Batimetria"}
    };


    update = (_, { data, layout, config }, plotly) => {
        plotly.react(data, layout, config);
    };

    render() {
        return (
        <View style={[styles.container]} >
            <View style={styles.chartRow}>
            <Plotly
                style={{}}
                data={this.state.data}
                layout={this.state.layout}
                update={this.update}
                onLoad={() => console.log("loaded")}
                enableFullPlotly
            />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row"
  },
  chartRow: {
    flex: 1,
    width: vars.width
  },
  container: {
    paddingTop: 30,
    width: vars.width,
    height: vars.height - vars.height * (164/926),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});