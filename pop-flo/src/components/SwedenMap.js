
// src/components/WorldMap.js

import React, { useRef, useState, useEffect } from "react";
import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
import * as d3 from 'd3';


const projection = geoConicEquidistant().scale(1600).center([35, 60]);


function SwedenMap({ geographies, selected, selectCounty, counties }) {
    //console.log("geographies", geographies)
    const [hoverKey, setHoverKey] = useState(0)
  

    const calculateMaxMin = () => {
        var calcArr = [];
        counties.forEach((c) => {
            calcArr.push(c.netto)
        })

        return [Math.min.apply(null, calcArr), Math.max.apply(null, calcArr)];

    }

    //console.log("counties in swedenmap:", counties);

    const handleCountryClick = countryIndex => {
        //console.log("Clicked on country: ", geographies[countryIndex])
    }

    var tooltip = d3.select('.tooltip-area')
        .style('opacity', 0);

    const mouseOver = (event, object) => {
        tooltip.style("opacity", 1);
    };

    const mouseLeave = (event, d) => {
        // console.log("mouseLeave")
        tooltip.style('opacity', 0);

    }
    const onMouseOver= (event) => event.currentTarget.firstElementChild.style.borderColor = "#1b1e23"
    
    const onMouseOut= (event) => event.currentTarget.firstElementChild.style.borderColor = "#e8e8e8"

    const mouseEnter = (event, object) => {
        const text = d3.select('.tooltip-area__text');
        for (var i in counties) {
            if (counties[i].id == object.ID_1) {
                //   text.text(object.VARNAME_1,);
                text.text(counties[i].name);
                //text.text(counties[i].netto); 
            }
        }
        setHoverKey(object.ID_1)
        if (object.ID_1 !== hoverKey) {
            // console.log("mouseEnter set new cordinates")


            // const [x, y] = d3.pointer(event);

            tooltip
                .attr('transform', `translate(60, 60)`);
            // tooltip
            //     .attr('transform', `translate(${x}, ${y})`);
        }
    };

    // var myColor = d3.scaleSequential().domain(calculateMaxMin())
    //     .range(["white","green"]);

    var colorScaleSmaller = d3.scaleSequential().domain(calculateMaxMin())
        .range(["rgb(0,95,255)","rgb(255,255, 255)"]);

    var colorScaleBigger = d3.scaleSequential().domain(calculateMaxMin())
        .range(["rgb(255,255, 255)", "rgb(255,121,0)"]);

    const mapIdToColor = (id1) => {
        // console.log("mapIdToColor id1", id1)
        for (var i in counties) {

            // console.log("counties[i].id",counties[i].id)
            if (counties[i].id == id1) {
                var pivotPoint = (calculateMaxMin()[0] + calculateMaxMin()[1] / 2)
                //console.log("pivotPoint", pivotPoint)
                if (counties[i].netto > pivotPoint) {
                    return colorScaleBigger(counties[i].netto)
                } else {
                    return colorScaleSmaller(counties[i].netto)
                }
            }
        }
    }



    return (
        <>
            <g className="counties">
                {
                    geographies.map((d, i) => (
                        <path
                            key={`path-${i}`}
                            d={geoPath().projection(projection)(d)}
                            className="county"
                            // fill={`rgba(38,50,56,${1 / geographies.length * i})`}
                            // fill={myColor(i*100)}
                            fill={mapIdToColor(geographies[i].properties.ID_1)}
                            stroke={ selected==geographies[i].properties.ID_1 ? "#212021" : "rgba(24, 14, 12, 0.2)"}
                            strokeWidth={ selected==geographies[i].properties.ID_1 ? 1 : 0.5}
                            // strokeWidth={ 3}
                            // onClick={() => handleCountryClick(i)}
                            onClick={() => selectCounty(geographies[i].properties.ID_1)}
                            onMouseOver={(event) => { mouseOver(event, geographies[i].properties) }}
                            onMouseEnter={event => { mouseEnter(event, geographies[i].properties) }}
                            onMouseLeave={() => mouseLeave()}
                        >

                        </path>
                    ))
                }

            </g>
            <g className="tooltip-area">
                <text className="tooltip-area__text"></text>
            </g>

            {/* <MyToolTip
                left={mouseX}
                top={mouseY}
                //fields={this.state.tooltipState.fields} 
                /> */}


        </>
    );
}
export default SwedenMap
