//import React from "react";
import SankeyDiagram from "./Sankey";
import React, { useRef, useState, useEffect } from "react";
//import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
//import * as d3 from 'd3';

const SankeyContainer = ({ counties, selected, year }) => {
    const [nodesArray, setNodesArray] = useState([])
    const [linksArray, setLinksArray] = useState([])


    console.log(" SankeyContainer counties_____",counties)
    // const [width, setWidth] = useState(700)
    // const [height, setHeight] = useState(700)
    //const [dim, setDim] = useState({})
    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(400)

    const svgRef = React.createRef();
    // console.log("SankeyContainer counties in", counties)
    // console.log("SankeyContainer counties", counties)
    // console.log("structuredData",structuredData)

    // console.log("VVVVVVV counties in SANKEY IN", counties)


    useEffect(() => {

        const getIndex = (ID) => {
            var countyIndexArr = []
            counties.map((c, i) => {
                if (c.id == ID) {
                    countyIndexArr.push(i)
                }
            })
            return countyIndexArr[0]
        }
        // console.log("counties in useEffect",counties)
        formatData(counties[getIndex(selected)])
    }, [counties, selected])
    // const measureSVG = () => {
    //     const { width, height } = svgRef.current.getBoundingClientRect();

    //     setWidth(width);
    //     setHeight(height);
    // }
    const formatData = (counties) => {

        //create all the nodes and links
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>nodesArray in SankeyContainer",nodesArray)
        var nodesToBe = []
        var linksToBe = []

        //adding all the counties as node target 
        //example: "nodes": [ {name: "Uppsala län"},{name: "Södermanlands län"},{name: "Östergötlands län"},]
        for (var i in counties.inflyttLän) {
            nodesToBe.push({ "name": counties.inflyttLän[i] })
        }
        // console.log("nodestobe", nodesToBe)


        for (var j in counties.inflytt) {
            // console.log("j",j);
            linksToBe.push({ "source": parseInt(j), "target": counties.inflytt.length, "value": counties.inflytt[j] })
            // linksToBe.push({ "source": parseInt(j), "target": counties.inflytt.length - 1, "value": counties.inflytt[j] })
        }
        //console.log("linksToBe", linksToBe)

        //adding the "target" counties to the last array. (THIS is used to target the links towards)
        nodesToBe.push({ "name": counties.name })

        setNodesArray(nodesToBe)
        setLinksArray(linksToBe)
        // setData({
        //     "nodes":
        //         nodesToBe 
        //     ,
        //     "links":
        //         linksToBe ,
        // })
    }

    return (
        <div>
        <svg width="50%" height="500" ref={svgRef}>
            {nodesArray.length > 0 && <SankeyDiagram direction="in" data={{ "nodes": nodesArray, "links": linksArray }} width={width} height={height} />}
    
            {nodesArray.length > 0 && <text x="0" y="-30" fill="black">Immigration to {nodesArray[20].name} {year}</text>}
        </svg>
        <div className="countyinfo"> 

            The Sankey diagrams displays the full details of immigration and emigration respectively.

            The width of each link in the Sankey Diagrams represent the share of the total immigration/emigration to/from the selected county.

            <p>The different counties in the Sankeys are colored dependent on which part of Sweden they belong to; <br></br><text className="green">green</text> = <text className="green">Norrland </text>(the northern most part of Sweden) <br></br><text className="purple">purple</text> = <text className="purple">Götaland </text>(the middle part of Sweden)
            <br></br> <text className="red">red</text> = <text className="red">Svealand </text>(the most southern part of Sweden)
            </p> 
        </div>
        </div>
    );

}

export default SankeyContainer;