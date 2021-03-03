import React, { useState, useEffect } from "react"
import WorldMap from "./components/WorldMap"
import "./App.css"
import Explanation from "./components/explanation"

function App() {

  return (
    <div className="App">
      <Explanation/>
      <WorldMap />
    </div>
  );
}

export default App;