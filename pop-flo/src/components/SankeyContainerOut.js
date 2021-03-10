//import React from "react";
import SankeyDiagram from "./Sankey";
import React, { useRef, useState, useEffect } from "react";
//import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
//import * as d3 from 'd3';


const SankeyContainerOut = ({ counties }) => {
    const [nodesArray, setNodesArray] = useState([])
    const [linksArray, setLinksArray] = useState([])
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    //const [dim, setDim] = useState({})

    const svgRef = React.createRef();
    
    useEffect(() => {
        console.log("^^^^^^^^counties in SANKEY OUT",counties)
        formatData(counties)
    }, [counties])
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
        for (var i in counties.utflyttLän) {
            nodesToBe.push({ "name": counties.utflyttLän[i] })
        }
        // console.log("nodestobe", nodesToBe)


        for (var j in counties.utflytt) {
            // console.log("j",j);
            linksToBe.push({ "source": counties.utflytt.length, "target":parseInt(j), "value": counties.utflytt[j] })
            // linksToBe.push({ "source": parseInt(j), "target": counties.inflytt.length - 1, "value": counties.inflytt[j] })
        }
        //console.log("linksToBe", linksToBe)

        //adding the "target" county to the last array. (THIS is used to target the links towards)
        nodesToBe.push({ "name": counties.name })

       
        setNodesArray(nodesToBe)
        setLinksArray(linksToBe)
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
            {nodesArray.length > 0 && <SankeyDiagram direction="out" data={{ "nodes": nodesArray, "links": linksArray }} width={width} height={height} />}
        </svg>
    );


}

export default SankeyContainerOut;