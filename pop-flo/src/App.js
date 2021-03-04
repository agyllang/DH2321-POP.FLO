import React, { useState, useEffect } from "react"
//import * as d3 from "d3";

import WorldMap from "./components/WorldMap"
import Sankey from "./components/SankeyContainer"

import "./App.css"


function App() {

  return (
    <div className="App">
      <Sankey/>
      <WorldMap />
    </div>
    
    
  );
}

export default App;