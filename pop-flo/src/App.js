import React, { useState, useRef, useEffect } from 'react';
import "./App.css"
import { select } from "d3";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20])

  const svgRef = useRef();

  useEffect(() => {
    console.log("data", data)

    const svg = select(svgRef.current);
    console.log("svg", svg)
    svg.selectAll("circle").data(data).join("circle").attr("r", value => value).attr("cx", value => value * 2).attr("cy", value => value * 2).attr("stroke", "blue");
    
    //D3 syntax! (above is a more concise way of coding)
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
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map(value => value + 5))}>update data</button>

      <button onClick={() => setData(data.filter(value => value < 35))}>filter data</button>
    </div>
  );
}

export default App;
