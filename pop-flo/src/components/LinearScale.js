
// 

import React, { useRef,useState, useEffect } from "react";
//import d3Legend from "d3-svg-legend";
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend';

const LinearScale = () => {
    const svgRef = useRef();
    useEffect(()=>{
        const svg = d3.select(svgRef.current)
        var linear = d3.scaleLinear()
        .domain([-5,0,5])
        .range(["rgb(239, 71, 111)","rgb(125,125, 125)", "rgb(6, 214, 160)"]);
      
      
      svg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");
      
      var legendLinear = legendColor()
        .shapeWidth(30)
        .cells(11)
        .orient('horizontal')
        .scale(linear);
      
      svg.select(".legendLinear")
        .call(legendLinear);
    },[])
   
            
          
    return (
        <svg ref={svgRef} height={100} width={500} >
           
        </svg>
    )
}

export default LinearScale
