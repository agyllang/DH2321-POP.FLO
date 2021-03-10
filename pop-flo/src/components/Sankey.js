import * as d3 from "d3";
import React, { useRef, useState, useEffect } from "react";

import { sankey, sankeyLinkHorizontal } from "d3-sankey"; //https://www.npmjs.com/package/d3-sankey-diagram
// import chroma from "chroma-js";

//creates a node for each län
const SankeyNode = ({ name, x0, x1, y0, y1, color }) => (

  <rect x={x0} y={y0} width={x1 - x0} height={Math.abs(y1 - y0)}>
    <title>{name} </title>
  </rect> //To add color add the attribute fill i nrect
);

//creates the links between all läns
const SankeyLink = ({ link, color }) => (

  <path
    d={sankeyLinkHorizontal()(link)}
    style={{
      fill: "none",
      strokeOpacity: ".3",
      stroke: "green",
      strokeWidth: Math.max(1, link.width)
    }}


  ><title>{link.source.name} {"→"} {link.target.name} {':'} {link.value} </title></path>
);

//create and returns the diagram
const SankeyDiagram = ({ data, width, height, origin,  }) => {

  useEffect(()=>{
    console.log("UUUUUUUUUUUUUU SankeyDiagram mounted, with data:",data)
    return () => console.log("XXXXXXXXXXXXX SankeyDiagram DISmounted, with data:",data)
})

  // console.log("data from Sankey", data)

  const { nodes, links } = sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 5]])
    (data);
  // console.log("links", links);
  // const color = chroma.scale("Set3").classes(nodes.length);


  const colorScale = d3
    .scaleLinear()
    .domain([0, nodes.length])
    .range([0, 1]);

  return (
    <g style={{ mixBlendMode: "multiply" }}>
      {nodes.map((node, i) => (
        <SankeyNode
          {...node}
          // color={(colorScale(i)).hex()}
          key={origin === "out" ? `${node.name}-out` : `${node.name}-in`}
        />
      ))}
      {links.map((link, i) => (
        <SankeyLink
          link={link}
          key={link.index}
          key={origin === "out" ? `${link.index}-out` : `${link.index}-in`}
        // color={(colorScale(link.source.index)).hex()}
        />
      ))}
    </g>
  );
};

export default SankeyDiagram;
