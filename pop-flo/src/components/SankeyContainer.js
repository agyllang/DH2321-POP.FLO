//import React from "react";
import SankeyDiagram from "./Sankey";
import React, { useRef, useState, useEffect } from "react";
//import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
//import * as d3 from 'd3';

const data2 = {

    "nodes": [
        { "name": "Stockholm" },
        { "name": "Uppsala" },
        { "name": "Gotland" },
        { "name": "Jönköping" }
    ],
    "links": [
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
const data3 = {

    "nodes": [
        { "name": "Stockholm" },
        { "name": "Uppsala" },
        { "name": "Gotland" },
        { "name": "Jönköping" }
    ],
    "links": [
        {
            "source": 0,
            "target": 1,
            "value": 5000
        },
        {
            "source": 3,
            "target": 1,
            "value": 220
        },
        {
            "source": 2,
            "target": 1,
            "value": 100
        }
    ]
};

const data1 = {
    "nodes": [
        { "name": "Stockholm" },
        { "name": "Uppsala" },
        { "name": "Gotland" },
        { "name": "Jönköping" }
    ],
    "links": [
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


const SankeyContainer = ({ counties }) => {
    const [structuredData, setData] = useState({ "nodes": [], "links": [] })
    // const [width, setWidth] = useState(700)
    // const [height, setHeight] = useState(700)
    //const [dim, setDim] = useState({})
    const svgRef = React.createRef();
    // console.log("SankeyContainer counties in", counties)
    console.log("SankeyContainer counties[0]", counties[0])
    // console.log("structuredData",structuredData)
    useEffect(() => {
        console.log("counties in useEffect",counties)
        formatData(counties)
    }, [])
// console.log("PERFECT DATA", data2)
    // const measureSVG = () => {
    //     const { width, height } = svgRef.current.getBoundingClientRect();

    //     setWidth(width);
    //     setHeight(height);
    // }
    const formatData = (counties) => {
        

        //create all the nodes and links
        
        var nodesToBe = []
        var linksToBe = []
        
        //adding all the counties as node target 
        //example: "nodes": [ {name: "Uppsala län"},{name: "Södermanlands län"},{name: "Östergötlands län"},]
        for (var i in counties[0].inflyttLän) {
            nodesToBe.push({ "name": counties[0].inflyttLän[i] })
        }
        // console.log("nodestobe", nodesToBe)


        for (var j in counties[0].inflytt) {
            // console.log("j",j);
            linksToBe.push({ "source": parseInt(j), "target":counties[0].inflytt.length, "value": counties[0].inflytt[j] })
            // linksToBe.push({ "source": parseInt(j), "target": counties[0].inflytt.length - 1, "value": counties[0].inflytt[j] })
        }
        //console.log("linksToBe", linksToBe)

        //adding the "target" county to the last array. (THIS is used to target the links towards)
        nodesToBe.push({ "name": counties[0].name })

        setData({
            "nodes":
                nodesToBe
            ,
            "links":
                linksToBe
        })
        //console.log("structuredData.nodes formatdata",structuredData)

    }
    // formatData(counties);
    
    // useEffect(() => {
    //     console.log("counties in useffect",counties)
    //     formatData(counties)

    //     // measureSVG()
    //     // window.addEventListener("resize", measureSVG)
    //     // return () => {
    //     //     console.log()
    //     //     window.removeEventListener("resize", measureSVG)
    //     // }

    // },[])

  


    return (
        <svg width="50%" height="300" ref={svgRef}>
          
        {/* {console.log("structuredData before sankey diagram", structuredData)} */}
        {/* {console.log("data3 before sankey diagram", data3)} */}
            {structuredData.nodes.length>0 && <SankeyDiagram data={structuredData} width={500} height={500} />}

        </svg>
    );

}

export default SankeyContainer;