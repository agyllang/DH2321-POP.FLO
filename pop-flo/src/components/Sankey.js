import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey"; //https://www.npmjs.com/package/d3-sankey-diagram
import "../Sankey.css"

//assigning color for each län
const indelning = {
  "Götaland": [
    {name: "Blekinge län", color:"coral"}, 
    {name: "Västra Götalands län", color:"blue"},
    {name: "Gotlands län", color: "purple"},
    {name: "Hallands län", color:"brown"},
    {name:"Skåne län", color:"aqua"},
    {name: "Jönköpings län", color: "blue"},
    {name: "Kalmar län", color:"blue"},
    {name: "Kronobergs län", color: "orange"},
    {name: "Östergötlands län", color: "pink"},
  ],
  "Svealand": [
    {name: "Uppsala län", color:"green"},
    {name: "Örebro län", color: "yellow"},
    {name: "Västmanlands län", color: "olive"},
    {name:"Södermanlands län", color: "gold"},
    {name: "Stockholms län", color: "#000"},
    {name:"Värmlands län", color:"violet"}
  ],
  "Norrland": [
    {name: "Gävleborgs län", color: "khaki"},
    {name: "Jämtlands län", color: "magenta"},
    {name: "Dalarnas län", color: "mediumslateblue"},
    {name: "Västernorrlands län", color: "crimson"},
    {name: "Västerbottens län", color: "rosybrown"},
    {name: "Norrbottens län", color: "cadetblue"},
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
    
    //for the in link
    if (direction=="in"){
      console.log("--------in-------")
      for(const prop in indelning) {
        indelning[prop].forEach((county) => {
          if(county.name == link.source.name) {
            console.log("i if-satsen", typeof county.color)
            color = county.color
          }
        })
    }
    }
    //for the out link
    else if (direction=="out"){
      console.log("------out-------")
      for(const prop in indelning) {
        indelning[prop].forEach((county) => {
          if(county.name == link.target.name) {
            console.log("i if-satsen", typeof county.color)
            color = county.color
          }
        })
    }
    }
    else{
      console.log("----nothing-----")
      color="blue"
    }
    return color
  }

  return (
    <g style={{ mixBlendMode: "multiply" }}>
      {nodes.map((node, i) => (
        <SankeyNode
          {...node}
          key={node.name}
        />
      ))}
      {links.map((link, i) => (
        //console.log("in return:", giveColor(link.source)),
        <SankeyLink
          link={link}
          key={link.index}
          color= {giveColor(link)}
        />
      ))}
    </g>
  );
};

export default SankeyDiagram;
