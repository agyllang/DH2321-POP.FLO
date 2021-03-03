import React, { useState, useEffect } from "react"
import WorldMap from "./components/WorldMap"
import "./App.css"
import GetData from "./components/GetData"

function App() {

  return (
    <div className="App">
      <WorldMap />
      <GetData />
    </div>
  );
}

export default App;