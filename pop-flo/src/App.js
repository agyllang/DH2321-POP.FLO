import React, { useState, useEffect } from "react"
import MapContainer from "./components/MapContainer";
import LinearScale from "./components/LinearScale";
import DropDown from "./components/DropDown"
import Sankey from "./components/SankeyContainer"
import "./App.css"
import Explanation from "./components/explanation"
import About from "./components/about";
import GetData from "./components/GetData";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'


function App() {
  const [selectedCounty, setSelectedCounty] = useState(null);

  return (
    <div>
      <Router>
      <div className="navbar">
        <div className="navbuttons">
        <Link to="/about"><button className="navbutton">About us & POP.FLO</button></Link>
        </div>
      </div>
        <Switch>
          <Route exact path="/" render={() => 
          <div className="App">
          <div>selected county:{selectedCounty}]</div>
          <DropDown selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} />
          <MapContainer selected={selectedCounty} selectCounty={county => setSelectedCounty(county)}/>
          <LinearScale />
          <Sankey/>
          </div>
          
          }></Route>
          <Route path="/explanation" render={() => <Explanation/>}></Route>
          <Route path="/about" render={() => <About/>}></Route>
        </Switch>
    </Router>   
    </div> 
  );
}

export default App;