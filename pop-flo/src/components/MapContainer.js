
// src/components/WorldMap.js

import React, { createRef, useRef, useState, useEffect } from "react";
// import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
// import { select,  } from "d3";
import SwedenMap from "./SwedenMap"
// import * as d3 from 'd3';
// import data from '../scb_data.csv';
//import Sankey from "./SankeyContainer"
import swedenCounties from "../sweden-counties.json"



import { feature } from "topojson-client";
//import axios from 'axios';


var width = 800;
var height = 1000;

//const projection = geoConicEquidistant().scale(1200).center([45, 60]);

const MapContainer = ({ selected, selectCounty, counties }) => {
    const [geographies, setGeographies] = useState([])
    const svgRef = createRef();
    console.log("swedenCounties", swedenCounties)

    // console.log("selected in map container",selected)
    useEffect(() => {
        setGeographies(feature(swedenCounties, swedenCounties.objects.SWE_adm1).features);

    }, []);
    // useEffect(() => {
    //     fetch(swedenCounties)
    //         .then(response => {
    //             if (response.status !== 200) {
    //                 console.log(`There was a problem: ${response.status}`)
    //                 return
    //             }
    //             console.log("MapContainer fetch call")
    //             console.log("response JSON parser",JSON.parse(response))
    //             response.json().then(swedenData => {
    //                 setGeographies(feature(swedenData, swedenData.objects.SWE_adm1).features);
    //                 console.log("MapContainer fetch call swedenData",swedenData)

    //                 //console.log("swedenData1", swedenData);
    //                 // projection.fitExtent(
    //                 //     [
    //                 //         [0, 0],
    //                 //         [width / 2, height / 2],
    //                 //     ], geographies
    //                 // )
    //             })
    //         })

    // }, []);

    return (
        <svg ref={svgRef} width={"100%"} height={530} >
            {/* <svg ref={svgRef} > */}
            {geographies.length > 0 &&
                <SwedenMap geographies={geographies} selectCounty={selectCounty} selected={selected} counties={counties} width={width} height={height} />
            }

        </svg>


    )
}

export default MapContainer
