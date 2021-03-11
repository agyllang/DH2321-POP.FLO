import React, { useState, useEffect } from "react"
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as d3 from 'd3';

import MapContainer from "./components/MapContainer";
import LinearScale from "./components/LinearScale";
import DropDown from "./components/DropDown"
import SankeyContainer from "./components/SankeyContainer"
import SankeyContainerOut from "./components/SankeyContainerOut"
import Explanation from "./components/explanation"
import About from "./components/about";
import RadioButtons from './components/RadioButtons';
import Slider from './components/Slider';

import logo from './components/logo3.png'
import data from './scb_data.csv';

import "./App.css"


function App() {
  
const emptyCounties = [
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
  const [selectedCounty, setSelectedCounty] = useState(null);
  // console.log("SELECTED COUNTY IN APP.JS: ", selectedCounty)
  const [show, setShow] = useState(false);

  const [year, setYear] = useState(2018);
  console.log("YEAR", year)

  const [gender, setGender] = useState("kvinnor"); //all, kvinnor, män

  // in, out, netto, för kvinnor, män, all
  // const dGender = "kvinnor";



  const [counties, setCounties] = useState([]);

  const getName = (ID) => {
    // counties.filter((c) => c.id == selected)
    var returnArray = []
    emptyCounties.map((c) => {
      if (c.id == ID) {
        // console.log("c.name", c.name)
        returnArray.push(c.name)
      }
    })
    return returnArray[0]
  }


  useEffect(() => {
    function GetData() {
      // d3.csv(data, function(data) { 
      //         d3.csv(data).then(function(data){
       
      // var updatedCounties = emptyCounties;
      var updatedCounties = JSON.parse(JSON.stringify(emptyCounties));
      // console.log("emptyCounties before",emptyCounties)

      // console.log("updatedCounties before",updatedCounties)
      d3.csv(data).then(function (data) {

        data.forEach(d => {
          //if (d.Inflyttningslän == "01  Stockholms län (Inflyttningslän)" && d.kön =="kvinnor") {
          for (var i in updatedCounties) {
            d.Inflyttningslän = d.Inflyttningslän.replace(/[0-9]/g, '');
            d.Inflyttningslän = d.Inflyttningslän.replace(' (Inflyttningslän)', '');
            d.Inflyttningslän = d.Inflyttningslän.trim();
            d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
            d.Utflyttningslän = d.Utflyttningslän.trim();

            if (gender == "all") {

              if (d.Inflyttningslän == updatedCounties[i].name && d.kön == "kvinnor" || d.Inflyttningslän == updatedCounties[i].name && d.kön == "män") {
      /*                    if (d.Inflyttningslän == updatedCounties[i].name && d.kön == dGender) {
      */                     updatedCounties[i].inflytt.push(Number(d[year]));
      /*                      updatedCounties[i].inflytt.push(Number(d[dYear])); 
      */                     updatedCounties[i].inflyttLän.push(d.Utflyttningslän);

              }
              /* d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
              d.Utflyttningslän = d.Utflyttningslän.trim(); */
              if (d.Utflyttningslän == updatedCounties[i].name && d.kön == "kvinnor" || d.Inflyttningslän == updatedCounties[i].name && d.kön == "män") {
      /*                    if (d.Utflyttningslän == updatedCounties[i].name && d.kön ==dGender) {
      */                      updatedCounties[i].utflytt.push(Number(d[year]));
      /*                       updatedCounties[i].utflytt.push(Number(d[dYear]));
      */                      updatedCounties[i].utflyttLän.push(d.Inflyttningslän);
              }
            }
            else {
              if (d.Inflyttningslän == updatedCounties[i].name && d.kön == gender) {
                          /*                    if (d.Inflyttningslän == updatedCounties[i].name && d.kön == dGender) {
                          */                     updatedCounties[i].inflytt.push(Number(d[year]));
                          /*                      updatedCounties[i].inflytt.push(Number(d[dYear])); 
                          */                     updatedCounties[i].inflyttLän.push(d.Utflyttningslän);

              }
              /* d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
              d.Utflyttningslän = d.Utflyttningslän.trim(); */
              if (d.Utflyttningslän == updatedCounties[i].name && d.kön == gender) {
                          /*                    if (d.Utflyttningslän == updatedCounties[i].name && d.kön ==dGender) {
                          */                      updatedCounties[i].utflytt.push(Number(d[year]));
                          /*                       updatedCounties[i].utflytt.push(Number(d[dYear]));
                          */                      updatedCounties[i].utflyttLän.push(d.Inflyttningslän);
              }
            }
          }
        });
        //const total_in = inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
        for (var j in updatedCounties) {
          updatedCounties[j].in = updatedCounties[j].inflytt.reduce((partial_sum, a) => partial_sum + a, 0);
          updatedCounties[j].out = updatedCounties[j].utflytt.reduce((partial_sum, a) => partial_sum + a, 0);
          updatedCounties[j].netto = updatedCounties[j].in - updatedCounties[j].out;
        }
        // console.log("updatedCounties almost after",updatedCounties)

        return updatedCounties

        
      // })
      // .then(result => { console.log("result,:",result)});
      }).then(result => { setCounties([...result])});
      // setCounties(updatedCounties);

    }
    GetData()
    // console.log("counties from GETDATA FUNCTION", counties)
    // return () => {
    //   console.log("get data rerendered", counties);
    // console.log("getData from within useEffect:", counties)
    
  }, [year, gender])

  return (
    <Router>
      <div className="navbar">
        <Link to="/"><img className="logo" src={logo}></img></Link>
        <div className="navbuttons">
          <button className="navbutton" onClick={() => setShow(true)}>How to use</button>
          <Link to="/about"><button className="navbutton">About us & POP.FLO</button></Link>
        </div>
        {show == true ? <Explanation show={show} setShow={showval => setShow(showval)} /> : <div></div>}
      </div>
      <Switch>
        <Route exact path="/" render={() =>
          <div className="App">
            <div className="selection-container">

              <div>selected county:{getName(selectedCounty)}</div>
              <DropDown selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} />
              <Slider sliderYear={year} sliderSelectedYear={y => setYear(y)} />
              <RadioButtons radioGender={gender} radioSelectedGender={g => setGender(g)} />
            </div>
            <div className="content-container">
              <div className="map-container">
                {counties.length > 0 && <MapContainer selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} counties={counties} />}
                <LinearScale />
              </div>
              
              {/* <div className="sankeyContainer">
                {selectedCounty && counties.length > 0 && <SankeyContainer selected={selectedCounty} counties={counties} />}
              </div> */}

              
              <div className="sankeyContainerOut">
                {selectedCounty && counties.length > 0 && <SankeyContainerOut selected={selectedCounty} counties={counties}  />}
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