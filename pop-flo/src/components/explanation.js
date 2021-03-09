import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { csv } from 'd3-fetch';
import url from './../01.csv';

function Explanation({show, setShow}) {

        return(
            <div className="modal">
                    <div className="modal-content">
                    <p onClick={() => setShow(false)} className="close">X</p>
                    <h2>Map</h2>
                        The <b>map</b> displays the ratio of migration to each
                        county. If the immigration to a county is bigger than 
                        the emigration, the county is colored <text className="orange">orange</text>, if not, 
                        it is colored <text className="blue">blue</text>.
                        <p>
                            <b>Hover</b> over a county to get details.
                        </p>
                        <p>
                            <b>Click</b> on a county to get full details.
                        </p>
                    <h2>Sankey diagram</h2>
                    The <b>Sankey</b> displays the full details of the immigration and emigration
                    to and from a county.
                    </div>
                    
            </div>

        )
    }

export default Explanation;