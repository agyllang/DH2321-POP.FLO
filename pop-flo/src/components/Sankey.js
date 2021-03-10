import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey"; //https://www.npmjs.com/package/d3-sankey-diagram
//import chroma from "chroma-js";


const indelning = {
  "Götaland": [
    {name: "Blekinge län", color:"blue"}, 
    {name: "Västra Götalands län", color:"blue"},
    {name: "Gotlands län", color: "blue"},
    {name: "Hallands län", color:"blue"},
    {name:"Skåne län", color:"blue"},
    {name: "Jönköpings län", color: "blue"},
    {name: "Kalmar län", color:"blue"},
    {name: "Kronobergs län", color: "blue"},
    {name: "Östergötlands län", color: "blue"},
  ],
  "Svealand": [
    {name: "Uppsala län", color:"red"},
    {name: "Örebro län", color: "red"},
    {name: "Västmanlands län", color: "red"},
    {name:"Södermanlands län", color: "red"},
    {name: "Stockholms län", color: "red"},
    {name:"Värmlands län", color:"red"}
  ],
  "Norrland": [
    {name: "Gävleborgs län", color: "green"},
    {name: "Jämtlands län", color: "green"},
    {name: "Dalarnas län", color: "green"},
    {name: "Västernorrlands län", color: "green"},
    {name: "Västerbottens län", color: "green"},
    {name: "Norrbottens län", color: "green"},
  ]
}

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
      stroke: color,
      strokeWidth: Math.max(1, link.width)
    }}


  ><title>{link.source.name} {"→"} {link.target.name} {':'} {link.value} </title></path>
);

//create and returns the diagram
const SankeyDiagram = ({ data, width, height }) => {


  console.log("data from Sankey", data)

  const giveColor = (linksource) => {
    var color;
    for(const prop in indelning) {
      indelning[prop].forEach((county) => {
        if(county.name == linksource.name) {
          // console.log(county.color)
          color = county.color;
        }
      })
  }
  return (color)
  }

  const { nodes, links } = sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 5]])
    (data);
  console.log("links", links);
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
          key={node.name}
        />
      ))}
      {links.map((link, i) => (
        console.log(giveColor(link.source)),
        <SankeyLink
          link={link}
          key={link.index}
          // color={"blue"}
          color={giveColor(link.source)}
        // color={(colorScale(link.source.index)).hex()}
        />
      ))}
    </g>
  );
};

export default SankeyDiagram;
