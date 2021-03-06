
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
        .domain([1.40,1.00,0.60])
        .range(["rgb(255,121,0)", "rgb(255,255, 255)", "rgb(0,95,255)"]);

      svg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");
      
      var legendLinear = legendColor()
        .labelFormat(d3.format(".2f"))
        .title("Ratio color")
        .titleWidth(120)
        .shapeWidth(30)
        .cells(11)
        .orient('vertical')
        .scale(linear);
      
      svg.select(".legendLinear")
        .call(legendLinear);
    },[])
   
            
          
    return (
        <svg ref={svgRef} height={300} width={100} >
           
        </svg>
    )
}

export default LinearScale
