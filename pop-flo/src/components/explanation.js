import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { csv } from 'd3-fetch';
import url from './../01.csv';

function Explanation({show, setShow}) {

        return(
            <div className="modal">
                    <div className="modal-content">
                    <p onClick={() => setShow(false)} className="close">X</p>
                        How to uuuuuuse
                    </div>
                    
            </div>

        )
    }

export default Explanation;