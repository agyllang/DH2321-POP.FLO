//import React from "react";
import SankeyDiagram from "./Sankey";
import React, { useRef, useState, useEffect } from "react";
//import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
//import * as d3 from 'd3';

const data = {
    
    "nodes":[
        {"name": "Stockholm"},
        {"name": "Uppsala"},
        {"name": "Gotland"},
        {"name": "Jönköping"}
    ],
    "links":[
        {
            "source": 1,
            "target": 2,
            "value": 120
        },
        {
            "source": 1,
            "target": 0,
            "value": 220
        },
        {
            "source": 1,
            "target": 3,
            "value": 100
        }
    ]
};

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

const SankeyContainer = ({counties}) => {
    const [structuredData, setData] = useState({"nodes":[], "links":[]})
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    //const [dim, setDim] = useState({})
    const svgRef = React.createRef();

    const measureSVG = () => {
        const { width, height } = svgRef.current.getBoundingClientRect();
    
        setWidth(width);
        setHeight(height);
    }

    useEffect(()=>{
        formatData(counties)
        measureSVG()
        window.addEventListener("resize", measureSVG)
        return()=>{
            window.removeEventListener("resize", measureSVG)
        }
        
    })

    const formatData = (counties) => {
        const testcon = counties[0].inflyttLän
        console.log("1:", counties)
        console.log("2:", counties[0])
        console.log("3:", typeof counties[0].inflyttLän)
        console.log("3.2:", testcon.key(1))
        console.log("4:", typeof counties[0].inflyttLän[1])       
      console.log("counties in formatdata:", counties[0].inflyttLän)
  
      //create all the nodes
      var nodesToBe = []
      var linksToBe = []
      //här ska vi lägga in första for-loopen
      for (var i in counties[0].inflyttLän){
          console.log("här är iet:", i)
          nodesToBe.push({"name": counties[0].inflyttLän[i]})
      }
      //sen lägger vi till det sista länet:
      nodesToBe.push({"name": counties[0].name})
console.log("nodestobe", nodesToBe)
      for (var j in counties[0].inflytt){
          linksToBe.push({"source": j, "target": counties[0].inflytt.lenght-1, "value": counties.inflytt[j]})
      }
      console.log("linkstobo", linksToBe)
      //här ska vi set:a all data i nodesToBe i structuredData nodes (obs! ingen array i arrayen)
      setData(prevState => ({
          "nodes": [
            ...nodesToBe
          ],
          "links": [
              ...linksToBe
          ]
             
      }))

    } 

useEffect(() => {
    formatData()
},[])

return (
    <svg width="50%" height="300" ref={svgRef}>
        {/* {structuredData.nodes.length>0 && structuredData.links.length>0 && (
        <SankeyDiagram data={structuredData} width={width} height={height} />
        )} */}
        {/* {structuredData.length>0 && <SankeyDiagram data={structuredData} width={width} height={height} />} */}
        {/* {data && <SankeyDiagram data={data.data} width={width} height={height} />} */}
    </svg>
);
    
}

export default SankeyContainer;