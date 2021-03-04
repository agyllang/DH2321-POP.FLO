
// src/components/WorldMap.js

import React, { useRef,useState, useEffect } from "react";
import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
import * as d3 from 'd3';

const projection = geoConicEquidistant().scale(1200).center([45, 60]);


function SwedenMap({ geographies }) {

    const handleCountryClick = countryIndex => {
        console.log("Clicked on country: ", geographies[countryIndex])
    }
  
    return (
        <g className="counties">
        {
            geographies.map((d, i) => (
                <path
                    key={`path-${i}`}
                    d={geoPath().projection(projection)(d)}
                    className="country"
                    fill={`rgba(38,50,56,${1 / geographies.length * i})`}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    onClick={() => handleCountryClick(i)}
                />
            ))
        }
    </g>
    );
  }
export default SwedenMap
