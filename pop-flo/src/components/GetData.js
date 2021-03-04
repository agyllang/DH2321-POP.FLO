
import React, { useState, useEffect } from "react";
import { geoConicEquidistant, geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import * as d3 from 'd3';
// import data from '../scb_data.csv';
import data from '../stockholm_data.csv';

//const [dLan, setDLan] = (null);
//const [dYear, setDYear] = ([2019]);
const dYear = 2019;
//const [dGender, setDGender] = ([]);
//const inflytt = [];
//const utflytt = []; 
//const total_in = 0;
// in, out, netto, för kvinnor, män, all

const counties = [
    { name: "01  Stockholms län (Inflyttningslän)", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: [] },
    {name: "03  Uppsala län (Inflyttningslän)", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0, inflytt: [], utflytt: []},
]

//const GetData = () => {
function GetData() {
   // d3.csv(data, function(data) { 
    d3.csv(data).then(function(data){
        data.forEach(d=> {
            //if (d.Inflyttningslän == "01  Stockholms län (Inflyttningslän)" && d.kön =="kvinnor") {
            for (var i in counties) {
              if (d.Inflyttningslän == counties[i].name && d.kön =="kvinnor") {
                //inflytt.push(Number(d[dYear])); // plus vilket län det kommer från 
                counties[i].inflytt.push(Number(d[dYear])); // plus vilket län det kommer från 
            }
            // se till så att inflytt och utflytt namn i csv filen är samma, så man kan köra detta för i
            //                ... == counties[i].name , counties[i].utflytt....
            if (d.Utflyttningslän == " Stockholms län (Utflyttningslän)" && d.kön =="kvinnor") {
               counties[0].utflytt.push(Number(d[dYear]));
            }
        }
        });
        //const total_in = inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
        for (var j in counties) {
            counties[j].in = counties[j].inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
            counties[j].out = counties[j].utflytt.reduce((partial_sum, a) => partial_sum + a,0);
            counties[j].netto = counties[j].in - counties[j].out;
        }
        //console.log("netto", counties[0].netto);
        //det körs på nått sätt dubbelt
        //console.log("typ netto", typeof(netto));
        //detta för varje län 
/*      counties[0].in = total_in;
        counties[0].out = total_out;
        counties[0].netto = netto; */

        console.log("counties", counties[0]);
        console.log("counties 1", counties[1]);        

    });
   //se till så man kommer åt datan från counties utanför 
   console.log("Counties 2:", counties[0]);

    return (
        <svg>
            
        </svg>
    )
}

export default GetData