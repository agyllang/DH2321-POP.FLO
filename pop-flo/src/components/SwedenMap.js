
// src/components/WorldMap.js

import React, { useRef, useState, useEffect } from "react";
import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
import * as d3 from 'd3';



const SwedenMap = ({ geographies, selected, selectCounty, counties, height, width }) => {

    const [hoverKey, setHoverKey] = useState(0)
    console.log("hoverKey", hoverKey)

    var geojson = {
        "type": "FeatureCollection", "features": geographies
    };
    // console.log("geojson",geojson)
    const projection = geoConicEquidistant().fitSize([width / 2, height / 2], geojson);

    // const projection = geoConicEquidistant().fitSize([width, height], geographies);


    var tooltip1 = d3.select('.tooltip-area1').attr('transform', `translate(10, 40)`)
    // .style('opacity', 0);
    var tooltip2 = d3.select('.tooltip-area2').attr('transform', `translate(10, 60)`);

    // .style('opacity', 0);
    var tooltip3 = d3.select('.tooltip-area3').attr('transform', `translate(10, 80)`);
    // .style('opacity', 0);
    var tooltip4 = d3.select('.tooltip-area4').attr('transform', `translate(10, 100)`);
    // .style('opacity', 0);

    // useEffect(() => {
    //     tooltip1
    //         .attr('transform', `translate(10, 50)`);
    //     tooltip2
    //         .attr('transform', `translate(10, 65)`);
    //     tooltip3
    //         .attr('transform', `translate(10, 90)`);
    //     tooltip4
    //         .attr('transform', `translate(10, 105)`);
    // }, [])





    const mouseOver = (event, object) => {
        //console.log("mouseOver")

        // tooltip1.style("opacity", 1);
        // tooltip2.style("opacity", 1);
        // tooltip3.style("opacity", 1);
        // tooltip4.style("opacity", 1);
    };

    const mouseLeave = (event, d) => {
        //console.log("mouseLeave")

        tooltip1.style('opacity', 0);
        tooltip2.style('opacity', 0);
        tooltip3.style('opacity', 0);
        tooltip4.style('opacity', 0);
        // setHoverKey(0)

    }


    const mouseEnter = (event, object) => {
        //console.log("mouseEnter")

        const text = d3.select('.tooltip-area__text');
        const text2 = d3.select('.tooltip-area__text2');
        const text3 = d3.select('.tooltip-area__text3');
        const text4 = d3.select('.tooltip-area__text4');
        for (var i in counties) {
            if (counties[i].id == object.ID_1) {
                //   text.text(object.VARNAME_1,);
                text.text(counties[i].name).attr("font-size",16).attr("font-weight","bolder");
                text2.text(`Immigration: ${counties[i].in}`);
                text3.text(`Emigration: ${counties[i].out}`);
                text4.text(`Ratio: ${counties[i].ratio.toFixed(2)}`);

                //text.text(counties[i].netto); 
            }
        }
        tooltip1.style("opacity", 1);
        tooltip2.style("opacity", 1);
        tooltip3.style("opacity", 1);
        tooltip4.style("opacity", 1);
        setHoverKey(object.ID_1)

        // tooltip1
        //     .attr('transform', `translate(10, 50)`);
        // tooltip2
        //     .attr('transform', `translate(10, 65)`);
        // tooltip3
        //     .attr('transform', `translate(10, 90)`);
        // tooltip4
        //     .attr('transform', `translate(10, 105)`);



        // if (object.ID_1 !== hoverKey) {
        //     // console.log("mouseEnter set new cordinates")


        //     // const [x, y] = d3.pointer(event);


        //     // tooltip
        //     //     .attr('transform', `translate(${x}, ${y})`);
        // }
        // else{
        //     console.log("här kom vi inte fram")
        // }
    };



    const calculateMaxMin = () => {
        var calcArr = [];
        counties.forEach((c) => {
            calcArr.push(c.ratio)
        })
        console.log([Math.min.apply(null, calcArr), Math.max.apply(null, calcArr)])
        return [0.5, 1.5];
        // return [Math.min.apply(null, calcArr), Math.max.apply(null, calcArr)];
    }

    var colorScaleSmaller = d3.scaleSequential().domain([0.6, 0.95])
        .range(["rgb(0,95,255)", "rgb(255,255, 255)"]);

    var colorScaleBigger = d3.scaleSequential().domain([1.05, 1.4])
        .range(["rgb(255,255, 255)", "rgb(255,121,0)"]);
    var colorScaleNeutral = d3.scaleSequential().domain([0.96, 1.04])
        .range(["rgb(235,242, 255)", "rgb(255,255,255)", "rgb(255,244,235)"]);

    const mapIdToColor = (id1) => {
        // console.log("mapIdToColor id1", id1)
        for (var i in counties) {

            // console.log("counties[i].id",counties[i].id)
            if (counties[i].id == id1) {
                var pivotPoint = 1.000;
                // var pivotPoint = (calculateMaxMin()[0] + calculateMaxMin()[1] / 2)


                if (counties[i].ratio > 1.05) {
                    // console.log("bigger", counties[i].ratio)

                    return colorScaleBigger(counties[i].ratio)
                }
                if (counties[i].ratio < 0.94) {
                    // console.log("smaller", counties[i].ratio)

                    // console.log("colorScaleSmaller(counties[i].ratio)",colorScaleSmaller(counties[i].ratio))
                    return colorScaleSmaller(counties[i].ratio)
                }
                if (1.05 > counties[i].ratio > 0.95) {
                    // console.log("neutral", counties[i].ratio)

                    return colorScaleNeutral(counties[i].ratio)
                }
            }
        }
    }

    return (
        <>
    
            <g className="counties">
                {
                    geojson.features.map((d, i) => (
                        // geographies.map((d, i) => (
                        <path
                            key={`path-${i}`}
                            d={geoPath().projection(projection)(d)}
                            className="county"
                            // fill={`rgba(38,50,56,${1 / geographies.length * i})`}
                            // fill={myColor(i*100)}
                            fill={mapIdToColor(geographies[i].properties.ID_1)}
                            stroke={selected == geographies[i].properties.ID_1 ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"}
                            // stroke={selected == geographies[i].properties.ID_1 ? "rgba(0, 0, 0, 1)" : "rgba(24, 14, 12, 0.5)"}
                            strokeWidth={selected == geographies[i].properties.ID_1 ? 3 : 0.5}
                            strokeOpacity={selected == geographies[i].properties.ID_1 ? 1 : 0.5}
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
            <g className="tooltip-area1">
                <text className="tooltip-area__text"></text>
            </g>
            <g className="tooltip-area2">
                <text className="tooltip-area__text2"></text>
            </g>
            <g className="tooltip-area3">
                <text className="tooltip-area__text3"></text>
            </g>
            <g className="tooltip-area4">
                <text className="tooltip-area__text4"></text>
            </g>

        </>
    );
}
export default SwedenMap
