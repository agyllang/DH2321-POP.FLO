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


const SankeyContainer = ({ counties, selected, }) => {
    const [structuredData, setData] = useState({ "nodes": [], "links": [] })
    const [nodesArray, setNodesArray] = useState([])
    const [linksArray, setLinksArray] = useState([])


    console.log(" SankeyContainer counties_____",counties)
    // const [width, setWidth] = useState(700)
    // const [height, setHeight] = useState(700)
    //const [dim, setDim] = useState({})
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
    }, [counties,selected])
    // console.log("PERFECT DATA", data2)
    // const measureSVG = () => {
    //     const { width, height } = svgRef.current.getBoundingClientRect();

    //     setWidth(width);
    //     setHeight(height);
    // }
    const formatData = (counties) => {

        //create all the nodes and links
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>nodesArray in SankeyContainer",nodesArray)
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
            {/* {structuredData.nodes.length > 0 && <SankeyDiagram origin={"in"} data={structuredData} width={500} height={500} />} */}
            {nodesArray.length > 0 && <SankeyDiagram origin={"in"} data={{ "nodes": nodesArray, "links": linksArray }} width={500} height={500} />}
        </svg>
    );

}

export default SankeyContainer;