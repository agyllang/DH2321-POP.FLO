import React, { useState, useRef, useEffect } from 'react';
import "./App.css"
import { select, line, curveCardinal, axisBottom,axisRight,scaleLinear } from "d3";

function App() {
  const [data, setData] = useState([100,120,75,99])

  const svgRef = useRef();



  useEffect(() => {
    const svg = select(svgRef.current);
    console.log("svg", svg);

    console.log("data", data)

    

    //_____Drawing the x-axis____
    const xScale = scaleLinear().domain([0,data.length-1]).range([0,300]);
    //.domain([min,max]) displaying the range of the x-axis (the actual data)
    //.range([ .., ..]) is the coordinates on the "svg-parent" it populates.

    
    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);

    svg.select(".x-axis").style("transform","translateY(150px)").call(xAxis);
    //populates the <g className="x-axis"/> with the xAxis, set to y-coordinate 150px


    //_____Drawing the y-axis____
    const yScale = scaleLinear().domain([0, 20 + Math.max(...data)]).range([150,0]);
    //.domain([min,max]) displaying the range of the y-axis
    //.range([..,..]) is the coordinates on the "svg-parent" it populates.

    const yAxis= axisRight(yScale);

    svg.select(".y-axis").style("transform","translateX(300px)").call(yAxis);



    
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);


    svg
      .selectAll(".line")
      .data([data])
      .join("path").attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");

    //svg.selectAll("circle").data(data).join("circle").attr("r", value => value).attr("cx", value => value * 2).attr("cy", value => value * 2).attr("stroke", "blue");



    //D3 syntax! (above is a more concise way of coding)
    //
    //https://www.youtube.com/watch?v=9uEmNgHzPhQ&list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B
    //
    //"enter"-event is for handling first time rendered items.
    //"update"-event is used when data for an object has been changed, and what's suppose to happen with it next.
    //"exit"-event is what to do with the object when it has been removed

    //the data source is the state array ([25,40,45,60,20]), .attr adds a certain attribute ("r", is radius, "cx,cy" is coordinates,")

    //svg.selectAll("circle").data(data).join(
    //  enter => enter.append("circle").attr("class","new")
    //    .attr("r", value => value)
    //    .attr("cx", value => value * 2)
    //    .attr("cy", value => value * 2)
    //    .attr("stroke", "blue"),
    //  update => update.attr("class", "updated"),
    //  exit => exit.remove());
    //
    //




  }, [data]);


  return (
    <div className="App">
      <svg ref={svgRef}>
        <g className="x-axis"/>
        <g className="y-axis"/>

      </svg>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => setData(data.map(value => value + 5))}>update data</button>
      <button onClick={() => setData(data.filter(value => value < 35))}>filter data</button>
      <button onClick={() => setData(data => [...data, 20 * data.length])}>add data</button>

    </div>
  );
}

export default App;
