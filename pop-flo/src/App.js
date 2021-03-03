import React, { useState, useEffect } from "react"
import WorldMap from "./components/WorldMap"
import "./App.css"
import Explanation from "./components/explanation"
import About from "./components/about";

function App() {

  return (
    <div className="App">
      <Explanation/>
      <WorldMap />
      <About/>
    </div>
  );
}

export default App;