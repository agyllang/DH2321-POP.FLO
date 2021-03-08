
import React, { useState, useEffect } from "react";
import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import * as d3 from 'd3';
import data from '../scb_data.csv';
//import data from '../stockholm_data.csv';

const dYear = 2019;
// in, out, netto, för kvinnor, män, all
const dGender = "kvinnor";

const counties = [
//    { name: "01  Stockholms län (Inflyttningslän)", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] },
{name: "Stockholms län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
{name: "Uppsala län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Södermanlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Östergötlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Jönköpings län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
{name: "Kronobergs län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Kalmar län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Gotlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Blekinge län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
{name: "Skåne län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Hallands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Västra Götalands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Värmlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
{name: "Örebro län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Västmanlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Dalarnas län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Gävleborgs län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] }, 
{name: "Västernorrlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Jämtlands län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Västerbottens län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
{name: "Norrbottens län", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
]

//const GetData = () => {
function GetData() {
   // d3.csv(data, function(data) { 
    d3.csv(data).then(function(data){
        data.forEach(d=> {
            //if (d.Inflyttningslän == "01  Stockholms län (Inflyttningslän)" && d.kön =="kvinnor") {
            for (var i in counties) {
                d.Inflyttningslän = d.Inflyttningslän.replace(/[0-9]/g, '');
                d.Inflyttningslän = d.Inflyttningslän.replace(' (Inflyttningslän)', '');
                d.Inflyttningslän = d.Inflyttningslän.trim();
                if (d.Inflyttningslän == counties[i].name && d.kön == dGender) {
                    //inflytt.push(Number(d[dYear])); // plus vilket län det kommer från 
                    counties[i].inflytt.push(Number(d[dYear])); // plus vilket län det kommer från 
                   // counties[i].inflytt.push(d.Utflyttningslän);

                }
                d.Utflyttningslän = d.Utflyttningslän.replace(' (Utflyttningslän)', '');
                d.Utflyttningslän = d.Utflyttningslän.trim();
                if (d.Utflyttningslän == counties[i].name && d.kön ==dGender) {
                    counties[i].utflytt.push(Number(d[dYear]));
                }
            }
        });
        //const total_in = inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
        for (var j in counties) {
            counties[j].in = counties[j].inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
            counties[j].out = counties[j].utflytt.reduce((partial_sum, a) => partial_sum + a,0);
            counties[j].netto = counties[j].in - counties[j].out;
        }
        //console.log("typ netto", typeof(netto));
        //console.log("alla counties", counties);
        //console.log("counties 1", counties[1]);  


    });
    //console.log("Counties:", counties);
    //console.log("Counties[0]:", counties[0]);
    //console.log("Counties[0].in:", counties[0].in);

    return (
        <svg>
            {console.log(counties[0].netto)}
            <text x="20" y="35" className="small">Netto Sthlm: {counties[0].netto}</text>
        </svg>
    )
}
console.log("Alla counties :" , counties);
console.log("Inflytt av ett countie: ", counties[1].in);

export default GetData