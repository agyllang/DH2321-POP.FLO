import React, { useState, useEffect } from "react"
import MapContainer from "./components/MapContainer";
import LinearScale from "./components/LinearScale";
import DropDown from "./components/DropDown"
import SankeyContainer from "./components/SankeyContainer"
import "./App.css"
import Explanation from "./components/explanation"
import About from "./components/about";


function App() {
  const [selectedCounty, setSelectedCounty] = useState(null);

  return (
    <div className="App">

      <div>selected county:{selectedCounty}]</div>
      <DropDown selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} />
      <MapContainer selected={selectedCounty} selectCounty={county => setSelectedCounty(county)}/>
      <LinearScale />
      <Explanation/>
      <About/>
      <SankeyContainer/>
    {/*   <GetData /> */}
    </div>
    
    
  );
}

export default App;