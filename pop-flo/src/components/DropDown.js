
// 

import React, { useRef,useState, useEffect } from "react";
import "./components.css";
import {ReactComponent as DownSvg} from '../icons/icon-down.svg'
import {ReactComponent as UpSvg} from '../icons/icon-up.svg'

//import d3Legend from "d3-svg-legend";


const DropDown = (props) => {
    const [open,setOpen]=useState(false);
    const [hover,setHover]=useState(false);



    var counties = [{id:1,countyName:"Stockholm Län"},{id:2,countyName:"Uppsala Län"}];
    useEffect(()=>{
   
    },[])

    const show = () => { setOpen(!open)}
    
          
    return (
        <div className="dropDownContainer" >
            <span>{props.selected!=null ? props.selected : "Choose a county"}</span>
            <button onClick={() =>setOpen(!open)}>
            {!open ? <DownSvg/>
             :<UpSvg/>
             }
            </button>
            {open ? 
           
            <ul>{counties.map(c=>
                <li 
                key={c.id}
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={()=>{setHover(false)}} 
                onClick={() => props.selectCounty(c.countyName)}>{c.countyName}</li>
            )}

            </ul> : null
          

            }
            
        </div>
    )
}

export default DropDown
