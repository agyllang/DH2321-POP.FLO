import React, { useState, useEffect } from "react"
import MapContainer from "./components/MapContainer";
import LinearScale from "./components/LinearScale";
import DropDown from "./components/DropDown"
import "./App.css"

function App() {
  const [selectedCounty, setSelectedCounty] = useState(null);

  return (
    <div className="App">

      <div>selected county:{selectedCounty}]</div>
      <DropDown selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} />
      <MapContainer/>
      <LinearScale />
    </div>
  );
}

export default App;