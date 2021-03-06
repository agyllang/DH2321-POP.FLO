import * as d3 from "d3";
import React, { useRef, useState, useEffect } from "react";

import { sankey, sankeyLinkHorizontal } from "d3-sankey"; //https://www.npmjs.com/package/d3-sankey-diagram
import "../Sankey.css"

//assigning color for each län
const indelning = {
  "Götaland": [
    {name: "Blekinge län", color:"#08007A"}, 
    {name: "Västra Götalands län", color:"#0B00A3"},
    {name: "Gotlands län", color: "#0E00CC"},
    {name: "Hallands län", color:"#1100FF"},
    {name:"Skåne län", color:"#2E1FFF"},
    {name: "Jönköpings län", color: "#5447FF"},
    {name: "Kalmar län", color:"#7A70FF"},
    {name: "Kronobergs län", color: "#A099FF"},
    {name: "Östergötlands län", color: "#C6C2FF"},
  ],
  "Svealand": [
    {name: "Uppsala län", color:"#CC0000"},
    {name: "Örebro län", color: "#FF0A0A"},
    {name: "Västmanlands län", color: "#FF4747"},
    {name:"Södermanlands län", color: "#FF8585"},
    {name: "Stockholms län", color: "#FF8585"},
    {name:"Värmlands län", color:"#FFC2C2"}
  ],
  "Norrland": [
    {name: "Gävleborgs län", color: "#005200"},
    {name: "Jämtlands län", color: "#007A00"},
    {name: "Dalarnas län", color: "#00A300"},
    {name: "Västernorrlands län", color: "#00CC00"},
    {name: "Västerbottens län", color: "#00F500"},
    {name: "Norrbottens län", color: "#1FFF1F"},
  ]
}

//creates a node for each län
const SankeyNode = ({ name, index, x0, x1, y0, y1, color }) => (
//  <rect x={x0} y={index == 20? 101: y0} width={x1 - x0} height={Math.abs(y1 - y0)}>
  <rect x={x0} y={y0} width={x1 - x0} height={Math.abs(y1 - y0)}>
    <title>{name} </title>
  </rect> //To add color add the attribute fill i nrect
);

//creates the links between all läns
const SankeyLink = ({ link, color }) => (

  <path
    // d={sankeyLinkHorizontal()(link)}
    d={sankeyLinkHorizontal()(link)}
    style={{
      fill: "none",
      stroke: color,
      strokeWidth: Math.max(1, link.width)
    }}
    >
      <title>{link.source.name} {"→"} {link.target.name} {':'} {link.value} </title>
  </path>
);

//create and returns the diagram

const SankeyDiagram = ({ data, width, height, direction }) => {

//console.log("data from Sankey", data)

  const { nodes, links } = sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 5]])
    (data);
  //console.log("links", links);
  // const color = chroma.scale("Set3").classes(nodes.length);
  // const colorScale = d3
  //   .scaleLinear()
  //   .domain([0, nodes.length])
  //   .range([0, 1]);

  //assigns the different links a color depenting on the county
  const giveColor = (link) => {
    var color
    if (direction == "in") {
      // console.log("--------in-------")
      for (const prop in indelning) {
        indelning[prop].forEach((county) => {
          if (county.name == link.source.name) {
            // console.log("i if-satsen", typeof county.color)
            color = county.color
          }
        })
      }
    }
    else if (direction == "out") {
      // console.log("------out-------")
      for (const prop in indelning) {
        indelning[prop].forEach((county) => {
          if (county.name == link.target.name) {
            // console.log("i if-satsen", typeof county.color)
            color = county.color
          }
        })
      }
    }
    else {
      // console.log("----nothing-----")
      color = "blue"
    }
    return color
  }

  return (
    <g style={{ mixBlendMode: "multiply" }}>
      {nodes.map((node, i) => (
        <SankeyNode
          {...node}
          {...i}
          // color={(colorScale(i)).hex()}
          key={direction === "out" ? `${node.name}-out` : `${node.name}-in`}
        />
      ))}
      {links.map((link, i) => (
        //console.log("in return:", giveColor(link.source)),
        <SankeyLink
          link={link}
          key={direction === "out" ? `${link.index}-out` : `${link.index}-in`}
          color={giveColor(link)}
        // color={(colorScale(link.source.index)).hex()}
        />
      ))}
    </g>
  );
};

export default SankeyDiagram;
