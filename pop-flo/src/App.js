import React, { useState, useEffect } from "react"
import MapContainer from "./components/MapContainer";
import LinearScale from "./components/LinearScale";
import DropDown from "./components/DropDown"
import Sankey from "./components/SankeyContainer"
import "./App.css"
import Explanation from "./components/explanation"
import About from "./components/about";
import GetData from "./components/GetData";
import data from './scb_data.csv';
import * as d3 from 'd3';


function App() {
  const [selectedCounty, setSelectedCounty] = useState(null);

  const dYear = 2019;
  // in, out, netto, för kvinnor, män, all
  const dGender = "kvinnor";
  
  const EmptyCounties = [
  //    { name: "01  Stockholms län (Inflyttningslän)", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] },
  {id: "01", name: "Stockholms län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
  {id: "03", name: "Uppsala län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "04", name: "Södermanlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "05", name: "Östergötlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "06", name: "Jönköpings län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
  {id: "07", name: "Kronobergs län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "08", name: "Kalmar län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "09", name: "Gotlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "10", name: "Blekinge län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
  {id: "12", name: "Skåne län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "13", name: "Hallands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "14", name: "Västra Götalands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "17", name: "Värmlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
  {id: "18", name: "Örebro län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "19", name: "Västmanlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "20", name: "Dalarnas län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "21", name: "Gävleborgs län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
  {id: "22", name: "Västernorrlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "23", name: "Jämtlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "24", name: "Västerbottens län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  {id: "25", name: "Norrbottens län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
  ]

const [counties, setCounties] = useState(EmptyCounties);

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
                   if (d.Inflyttningslän == updatedCounties[i].name && d.kön == dGender) {
                       //inflytt.push(Number(d[dYear])); // plus vilket län det kommer från 
                       updatedCounties[i].inflytt.push(Number(d[dYear])); // plus vilket län det kommer från 
                      // counties[i].inflytt.push(d.Utflyttningslän);
   
                   }
                   d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
                   d.Utflyttningslän = d.Utflyttningslän.trim();
                   if (d.Utflyttningslän == updatedCounties[i].name && d.kön ==dGender) {
                      updatedCounties[i].utflytt.push(Number(d[dYear]));
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

  }
}, [])

  return (
    <div className="App">

      <div>selected county:{selectedCounty}]</div>
      <DropDown selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} />
      <MapContainer selected={selectedCounty} selectCounty={county => setSelectedCounty(county)} counties={counties}/>
      <LinearScale />
      <Explanation/>
      <About/>
      <Sankey/>
    {/*   <GetData /> */}
    </div>
    
    
  );
}

export default App;