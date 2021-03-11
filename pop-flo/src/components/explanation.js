import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { csv } from 'd3-fetch';
import url from './../01.csv';

function Explanation({show, setShow}) {

        return(
            <div className="modal" onClick={() => setShow(false)}>
                    <div className="modal-content">
                    <p onClick={() => setShow(false)} className="close">X</p>
                    <h2>Filter options</h2>
                    You can filter on <b>gender</b>, <b>year</b> and <b>county</b>.
                    <h2>Map</h2>
                        The <b>map</b> displays the ratio of migration to each
                        county. If the immigration to a county is bigger than 
                        the emigration, the county is colored in an <text className="orange">orange</text> hue, if not, 
                        it is colored in a <text className="blue">blue</text> hue.
                        <p>
                            <b>Hover</b> over a county to get some details.
                        </p>
                        <p>
                            <b>Click</b> on a county to get full details.
                        </p>
                    <h2>Sankey diagram</h2>
                    The <b>Sankey</b> displays the full details of the immigration and emigration
                    to and from a county.
                    <p>The different counties in the Sankey are colored dependent on which part of Sweden
                        they belong to; green if it's a part of Norrland, purple if it's a part of Götaland
                        and red if it's a part of Svealand.
                    </p>
                    <p><b>Hover</b> over a county to get the full details of emigration or immigration.</p>
                    </div>
                    
            </div>

        )
    }

export default Explanation;