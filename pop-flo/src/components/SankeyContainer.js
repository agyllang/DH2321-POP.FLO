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


//console.log("sankey:", data.links[0]);

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
    //counties = this.props
    //counties = {id:"string", name:"string", inflytt:Array(n), utflytt:Array(n), inflyttlän:Array(n), utflyttlän:Array(n), in:int, out:int, netto:int}
  state = { data: {data}, width: 0, height: 0, structuredData: {"nodestobe":[], "linkstobe":[]} };
  svgRef = React.createRef();
  counties = this.props.counties[0]
  
  componentDidMount() {
    // d3.json("/ugr-sankey-openspending.json").then(data =>
    //   this.setState({ data })
    // );
    //1. take the prop and call the function to recive the data in right format
    this.formatData(this.counties)
    //.then(data => this.setState({data}))
    this.measureSVG();
    window.addEventListener("resize", this.measureSVG);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measureSVG);
  }

  measureSVG = () => {
    const { width, height } = this.svgRef.current.getBoundingClientRect();
    //const { width, height } = this.svgRef2.current.getBoundingClientRect();

    this.setState({
      width,
      height
    });
  };

  formatData = (counties) => {
      //vi får in selected county med tillhörande data
      //ta name plus alla inflyttlän och spara som nodes
      //för varje link
        //skapa selected county som target
        //skapa alla inflyttvalue och inflyttlän till source och value
      //return data i format nodes and links
      
      for (var i in counties.inflytt){
          console.log(counties.inflytt[i])
      }
  }

  

  render() {
    const { data, width, height } = this.state;
    console.log("in the render:", this.counties);


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