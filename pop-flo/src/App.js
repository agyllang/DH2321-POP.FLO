import React, { useState, useEffect } from "react"
import WorldMap from "./components/WorldMap"
import "./App.css"
import Explanation from "./components/explanation"

function App() {

  return (
    <div className="App">
      <WorldMap />
      <Explanation/>
    </div>
  );
}

export default App;