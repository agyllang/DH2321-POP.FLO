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
import SelectedCountyInfoBox from './components/SelectedCountyInfoBox'

import logo from './components/logo3.png'
import data from './scb_data.csv';

import "./App.css"


function App() {

  const emptyCounties = [
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

  const [year, setYear] = useState(2019);
  console.log("YEAR", year)

  const [gender, setGender] = useState("all"); //all, kvinnor, män

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
      var updatedCounties = JSON.parse(JSON.stringify(emptyCounties));
      d3.csv(data).then(function (data) {

        data.forEach(d => {
          for (var i in updatedCounties) {
            d.Inflyttningslän = d.Inflyttningslän.replace(/[0-9]/g, '');
            d.Inflyttningslän = d.Inflyttningslän.replace(' (Inflyttningslän)', '');
            d.Inflyttningslän = d.Inflyttningslän.trim();
            d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
            d.Utflyttningslän = d.Utflyttningslän.trim();

            if (gender == "all") {

              /* if (d.Inflyttningslän == updatedCounties[i].name && d.kön == "kvinnor" || d.Inflyttningslän == updatedCounties[i].name && d.kön == "män") { */
              /*  if (d.Inflyttningslän == updatedCounties[i].name) {
                 updatedCounties[i].inflytt.push(Number(d[year]));
                 updatedCounties[i].inflyttLän.push(d.Utflyttningslän);
               }
 
               if (d.Utflyttningslän == updatedCounties[i].name) {
                 updatedCounties[i].utflytt.push(Number(d[year]));
                 updatedCounties[i].utflyttLän.push(d.Inflyttningslän);
               } */

              if (d.Inflyttningslän == updatedCounties[i].name && d.kön == "män") {
                updatedCounties[i].inflytt.push(Number(d[year]));
                updatedCounties[i].inflyttLän.push(d.Utflyttningslän);
              }

              if (d.Inflyttningslän == updatedCounties[i].name && d.kön == "kvinnor") {
                updatedCounties[i].inflytt[updatedCounties[i].inflytt.length - 1] += Number(d[year]);
              }

              if (d.Utflyttningslän == updatedCounties[i].name && d.kön == "män") {
                updatedCounties[i].utflytt.push(Number(d[year]));
                updatedCounties[i].utflyttLän.push(d.Inflyttningslän);
              }

              if (d.Utflyttningslän == updatedCounties[i].name && d.kön == "kvinnor") {
                updatedCounties[i].utflytt[updatedCounties[i].utflytt.length - 1] += Number(d[year]);
              }

            }
            // gender = kvinnor or män
            else {
              if (d.Inflyttningslän == updatedCounties[i].name && d.kön == gender) {
                updatedCounties[i].inflytt.push(Number(d[year]));
                updatedCounties[i].inflyttLän.push(d.Utflyttningslän);
              }

              if (d.Utflyttningslän == updatedCounties[i].name && d.kön == gender) {
                updatedCounties[i].utflytt.push(Number(d[year]));
                updatedCounties[i].utflyttLän.push(d.Inflyttningslän);
              }
            }
          }
        });
        for (var j in updatedCounties) {
          updatedCounties[j].in = updatedCounties[j].inflytt.reduce((partial_sum, a) => partial_sum + a, 0);
          updatedCounties[j].out = updatedCounties[j].utflytt.reduce((partial_sum, a) => partial_sum + a, 0);
          updatedCounties[j].netto = updatedCounties[j].in - updatedCounties[j].out;
          updatedCounties[j].ratio = updatedCounties[j].in / updatedCounties[j].out;
        }

        return updatedCounties


      }).then(result => { setCounties([...result]) });

    }
    GetData()

  }, [year, gender])

  return (
    <Router>
      <div className="navbar">
        <Link to="/DH2321-POP.FLO"><img className="logo" src={logo}></img></Link>
        <div className="navbuttons">
          <button className="navbutton" onClick={() => setShow(true)}>How to use</button>
          <Link to="/DH2321-POP.FLO/about"><button className="navbutton">About us & POP.FLO</button></Link>
        </div>
        {show == true ? <Explanation show={show} setShow={showval => setShow(showval)} /> : <div></div>}
      </div>
      <Switch>
        <Route exact path="/DH2321-POP.FLO" render={() =>
          <div className="App">
            <div className="topContainer">
              <div className="selection-container">
                <table>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">County</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"></th>
                      <td><DropDown selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} /></td>
                      <td><RadioButtons radioGender={gender} radioSelectedGender={g => setGender(g)} /></td>
                      <td><Slider sliderYear={year} sliderSelectedYear={y => setYear(y)} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {selectedCounty && counties.length > 0 && <div className="selected-county-container">
                <h3>{getName(selectedCounty)}</h3>
                <SelectedCountyInfoBox counties={counties} selectedCounty={selectedCounty} /></div>}
              
            </div>

            <div className="infotext"><span>Map displaying ratio between county immigration and emigration</span></div>
            <div className="content-container">
              
              <LinearScale /><div className="map-container">
              
              {counties.length > 0 && <MapContainer selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} counties={counties} />}  
              </div>

              {!selectedCounty && !show && <div className="placeholderContainer">
                <h2>Hi and welcome to POP.FLO!</h2>
                <p>Choose a county to explore its emigration and immigration in detail!</p></div>}
              
              <div className="sankeyContainer">
                {selectedCounty && counties.length > 0 && <SankeyContainer selected={selectedCounty} counties={counties} />}
              </div>
              <div className="sankeyContainerOut">
                {selectedCounty && counties.length > 0 && <SankeyContainerOut selected={selectedCounty} counties={counties} />}
              </div>

            </div>
          </div>
        }></Route>
        <Route path="/DH2321-POP.FLO/about" render={() => <About />}></Route>
      </Switch>
    </Router>


  );
}

export default App;