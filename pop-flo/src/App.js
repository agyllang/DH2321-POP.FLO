import React, { useState, useEffect } from "react"
import MapContainer from "./components/MapContainer";
import LinearScale from "./components/LinearScale";
import DropDown from "./components/DropDown"
import SankeyContainer from "./components/SankeyContainer"
import "./App.css"
import Explanation from "./components/explanation"
import About from "./components/about";
import GetData from "./components/GetData";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import data from './scb_data.csv';
import * as d3 from 'd3';
import Slider from './components/Slider';
import logo from './components/logo3.png'


function App() {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [show, setShow] = useState(false);

  const [year, setYear] = useState(2019);

  const dYear = 2019;
  // in, out, netto, för kvinnor, män, all
  const dGender = "kvinnor";

  const EmptyCounties = [
    //    { name: "01  Stockholms län (Inflyttningslän)", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] },
    { id: "01", name: "Stockholms län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "03", name: "Uppsala län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "04", name: "Södermanlands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "05", name: "Östergötlands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "06", name: "Jönköpings län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "07", name: "Kronobergs län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "08", name: "Kalmar län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "09", name: "Gotlands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "10", name: "Blekinge län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "12", name: "Skåne län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "13", name: "Hallands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "14", name: "Västra Götalands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "17", name: "Värmlands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "18", name: "Örebro län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "19", name: "Västmanlands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "20", name: "Dalarnas län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "21", name: "Gävleborgs län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "22", name: "Västernorrlands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "23", name: "Jämtlands län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "24", name: "Västerbottens län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
    { id: "25", name: "Norrbottens län", in: 0, out: 0, netto: 0, inflytt: [], utflytt: [], inflyttLän: [], utflyttLän: [] },
  ]

  const [counties, setCounties] = useState([]);

  function GetData() {
      // d3.csv(data, function(data) { 
//         d3.csv(data).then(function(data){
      var updatedCounties = EmptyCounties;
      d3.csv(data).then(function(data){
          
           data.forEach(d=> {
               //if (d.Inflyttningslän == "01  Stockholms län (Inflyttningslän)" && d.kön =="kvinnor") {
               for (var i in updatedCounties) {
                   d.Inflyttningslän = d.Inflyttningslän.replace(/[0-9]/g, '');
                   d.Inflyttningslän = d.Inflyttningslän.replace(' (Inflyttningslän)', '');
                   d.Inflyttningslän = d.Inflyttningslän.trim();
                   d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
                   d.Utflyttningslän = d.Utflyttningslän.trim();
                   if (d.Inflyttningslän == updatedCounties[i].name && d.kön == dGender) {
                     updatedCounties[i].inflytt.push(Number(d[year])); 
/*                      updatedCounties[i].inflytt.push(Number(d[dYear])); 
 */                     updatedCounties[i].inflyttLän.push(d.Utflyttningslän);
   
                   }
                   /* d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
                   d.Utflyttningslän = d.Utflyttningslän.trim(); */
                   if (d.Utflyttningslän == updatedCounties[i].name && d.kön ==dGender) {
                      updatedCounties[i].utflytt.push(Number(d[year]));
/*                       updatedCounties[i].utflytt.push(Number(d[dYear]));
 */                      updatedCounties[i].utflyttLän.push(d.Inflyttningslän);
                   }
               }
           });
           //const total_in = inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
           for (var j in updatedCounties) {
              updatedCounties[j].in = updatedCounties[j].inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
              updatedCounties[j].out = updatedCounties[j].utflytt.reduce((partial_sum, a) => partial_sum + a,0);
              updatedCounties[j].netto = updatedCounties[j].in - updatedCounties[j].out;
           }
           //console.log("typ netto", typeof(netto));
           //console.log("alla counties", counties);
           //console.log("counties 1", counties[1]);  
  
       });
       //console.log("Counties:", counties);
       //console.log("Counties[0]:", counties[0]);
       //console.log("Counties[0].in:", counties[0].in);
       setCounties(updatedCounties);
   
   }
   //console.log("Alla counties :" , counties);
   //console.log("Inflytt av ett countie: ", counties[1].in);
   
useEffect(() => {
  GetData()
  return () => {
    console.log("get data rerendered", counties);

  }
}, [year])

  return (
      <Router>
      <div className="navbar">
      <Link to ="/"><img className="logo" src={logo}></img></Link>
        <div className="navbar">
          <div className="navbuttons">
            <button className="navbutton" onClick={() => setShow(true)}>How to use</button>
            <Link to="/about"><button className="navbutton">About us & POP.FLO</button></Link>
          </div>
          {show == true ? <Explanation show={show} setShow={showval => setShow(showval)} /> : <div></div>}
        </div>
        </div>
        <Switch>
          <Route exact path="/" render={() =>
            <div className="App">
              <div className="selection-container">
                <div>selected county:{selectedCounty}</div>
                <DropDown selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} />
              </div>
              <div className="content-container">
                <div className="map-container">
                  {counties.length > 0 && <MapContainer selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} counties={counties} />}
                  <LinearScale />
                </div>
                <div className="sankey-container">
                  <SankeyContainer counties={counties} hej={"albinssträng"} />
                </div>
                <div>
                  {/* <Slider year={year => setYear(year)}/> */}
                  {/* <Slider year={year}/> */}
                  <Slider sliderYear={year} sliderSelectedYear={y => setYear(y)}/>
                </div>
              </div>
            </div>
          }></Route>
          <Route path="/about" render={() => <About />}></Route>
        </Switch>
      </Router>


  );
}

export default App;