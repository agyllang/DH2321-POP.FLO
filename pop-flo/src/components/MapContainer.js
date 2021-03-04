
// src/components/WorldMap.js

import React, { createRef, useRef, useState, useEffect } from "react";
import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
import { select,  } from "d3";
import SwedenMap from "./SwedenMap"


import { feature } from "topojson-client";
//import axios from 'axios';


var width = 1000;
var height = 500;

//const projection = geoConicEquidistant().scale(1200).center([45, 60]);

const MapContainer = ({selected,selectCounty}) => {
    const [geographies, setGeographies] = useState([])
    const [demoData, setDemoData] = useState({});
    const svgRef = createRef();



    useEffect(() => {
        fetch("/sweden-counties.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return
                }
                response.json().then(swedenData => {
                    setGeographies(feature(swedenData, swedenData.objects.SWE_adm1).features);
                    //console.log("swedenData1", swedenData);
                    // projection.fitExtent(
                    //     [
                    //         [0, 0],
                    //         [width / 2, height / 2],
                    //     ], geographies
                    // )
                })
            })
      

    }, []);

    

    // useEffect(() => {
    //     //'https://cors-anywhere.herokuapp.com/https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101J/InOmflytt'
    //     let postQuestion = {
    //         "query": [
    //             {
    //                 "code": "InflyttningsL",
    //                 "selection": {
    //                     "filter": "item",
    //                     "values": [
    //                         "01"
    //                     ]
    //                 }
    //             },
    //             {
    //                 "code": "UtflyttningsL",
    //                 "selection": {
    //                     "filter": "item",
    //                     "values": [
    //                         "01",
    //                         "03"
    //                     ]
    //                 }
    //             },
    //             {
    //                 "code": "Kon",
    //                 "selection": {
    //                     "filter": "item",
    //                     "values": [
    //                         "1",
    //                         "2"
    //                     ]
    //                 }
    //             },
    //             {
    //                 "code": "Tid",
    //                 "selection": {
    //                     "filter": "item",
    //                     "values": [
    //                         "2018",
    //                         "2019"
    //                     ]
    //                 }
    //             }
    //         ],
    //         "response": {
    //             "format": "json"
    //         }
    //     }
    //     const options = {
            
    //         method: 'post',
    //         url: 'https://cors-anywhere.herokuapp.com/https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101J/InOmflytt',
    //         data: postQuestion,
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         // transformResponse: [(data) => {
    //         //     // transform the response

    //         //     return data;
    //         // }]
    //     };

    //     // send the request
    //     //axios(options).then(response => {console.log("response",response)});
    //     axios(options).then(response => { console.log("response", response) }).catch(error => {console.log("error",error)});
    // }, [])




    return (
        <svg ref={svgRef} width={width} height={height} >
            {geographies  &&
            <SwedenMap geographies={geographies} selectCounty={selectCounty} selected={selected}/> 
            }
        </svg>
    )
}

export default MapContainer
