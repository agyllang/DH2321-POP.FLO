
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
//const [dNetto, setDNetto] = (0);
//const inflytt = [];
//const utflytt = []; 
//const total_in = 0;
//const Stocholm_in = 0;
//const [netto, setNetto] = useState(0);
var Stockhom_netto = [];

// in, out, netto, för kvinnor, män, all

const counties = [
    { name: "Stockholm", coordinates: [139.6917, 35.6895], in: 0, out: 0, netto: 0 },
]

//counties[0].in = 5;

//console.log("counties", counties[0].in);
//const GetData = () => {
function GetData() {
    //const [netto, setNetto] = useState(0);
    //const [dInflytt, setDInflytt] = useState(0);
    //const [utflytt, setUtflytt] = useState([]);
    //const [sthlm, setSthlm] = useState(0);
    const inflytt = [];
    const utflytt = [];
    

   // d3.csv(data, function(data) { 
    d3.csv(data).then(function(data){
        data.forEach(d=> {
        // vill köra forEach av varje län 
            if (d.Inflyttningslän == "01  Stockholms län (Inflyttningslän)" && d.kön =="kvinnor") {
                //console.log("d", d);
                inflytt.push(Number(d[dYear]));
                //return inflytt;
                //setDInflytt(dInflytt + Number(data[dYear]));
                //console.log("inflytt 1:", inflytt);
            }
            //console.log("d", d);

            if (d.Utflyttningslän == " Stockholms län (Utflyttningslän)" && d.kön =="kvinnor") {
                //console.log("d", d);
                utflytt.push(Number(d[dYear]));
            }

        });
        //console.log("inflytt 2: ", inflytt);
        const total_in = inflytt.reduce((partial_sum, a) => partial_sum + a,0); 
        //console.log("total in: ", total_in);
        const total_out = utflytt.reduce((partial_sum, a) => partial_sum + a,0);
        //console.log("tot out: ", total_out);
        const netto = total_in - total_out;
        console.log("netto", netto);
        //det körs på nått sätt dubblet??
        //console.log("typ netto", typeof(netto));
        Stockhom_netto = netto;
        console.log("sthml netto", Stockhom_netto);
        //detta för varje län 
        counties[0].in = total_in;
        counties[0].out = total_out;
        counties[0].netto = netto;

        console.log("counties", counties[0]);


        


    })
   //console.log("nettooooooooo", Stockhom_netto);

    return (
        <svg>
            
        </svg>
    )
}

export default GetData