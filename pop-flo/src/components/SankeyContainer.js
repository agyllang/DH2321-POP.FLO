import React from "react";
import SankeyDiagram from "./Sankey";
//import React, { useRef, useState, useEffect } from "react";
//import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
//import * as d3 from 'd3';
const scb = [
{id: "01", name: "Stockholms län", in: 0, out: 0, netto: 0, inflytt: [300,400], utflytt: ["Jönköping"] },
{id: "06", name: "Jönköping län", in: 0, out: 0, netto: 0, inflytt: [300,400], utflytt: ["Jönköping"] },]
; 

//console.log("counties from Sankey", counties);


/*
for (var i in scb.utflytt){
    if (scb.utflytt[i] == data.nodes){
        data.links[0].source = i;
    }
}*/

//this is testdata, sent to the Sankey class
const data = {
    
    "nodes":[
        {"name": scb[0].name},
        {"name": "Uppsala"},
        {"name": "Gotland"},
        {"name": "Jönköping"}
    ],
    "links":[
        {
            "source": 1,
            "target": 0,
            "value": scb[0].inflytt[0]
        },
        {
            "source": 2,
            "target": 0,
            "value": 220
        },
        {
            "source": 3,
            "target": 0,
            "value": 100
        }
    ]
};


console.log("sankey:", data.links[0]);

const data2 = {
    "nodes":[
        {"name": "Stockholm"},
        {"name": "Uppsala"},
        {"name": "Gotland"},
        {"name": "Jönköping"}
    ],
    "links":[
        {
            "source": 0,
            "target": 1,
            "value": 100
        },
        {
            "source": 0,
            "target": 2,
            "value": 320
        },
        {
            "source": 0,
            "target": 3,
            "value": 100
        }
    ]
};

class SankeyContainer extends React.Component {

  state = { data: {data}, width: 0, height: 0 };
  svgRef = React.createRef();
  
  componentDidMount() {
    // d3.json("/ugr-sankey-openspending.json").then(data =>
    //   this.setState({ data })
    // );
    this.measureSVG();
    window.addEventListener("resize", this.measureSVG);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measureSVG);
  }

  measureSVG = () => {
    const { width, height } = this.svgRef.current.getBoundingClientRect();

    this.setState({
      width,
      height
    });
  };

  

  render() {
    const { data, width, height, } = this.state;
    console.log("props in sankey", this.props.counties);
   // console.log("counties in sankey", counties);


    return (
        <svg width="50%" height="300" ref={this.svgRef}>
            {data && (
            <SankeyDiagram data={data.data} width={width} height={height} />
            )}
        </svg>
    );
  }
}

export default SankeyContainer;