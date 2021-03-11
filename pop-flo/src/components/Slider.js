import React, { useRef,useState, useEffect } from "react";
import {RangeStepInput} from 'react-range-step-input';
import "../App.css";

/* const Slider = () => {
    const [year, setYear] = useState(2019);


    return (
        <div id="range">
            <div id="current-year"> 
         <h1>{year}</h1>
            </div>
            <svg id="svg"></svg>
            <input type="range" min="2000" max="2019" step="1" defaultValue="2019" id="range-input"></input>
      </div>
      
    );
}

export default Slider  */

const Slider = ({sliderYear, sliderSelectedYear}) => {
    //const [year, setYear] = useState(2019);
    // console.log("sliderYear",sliderYear)
    return ( 
        <div className="addMargin">
           <div className="centeredSliderValue">{sliderYear}</div>
           2000
            <RangeStepInput
                min={2000} max={2019}
                value={sliderYear} step={1}
                onChange={e => sliderSelectedYear(parseInt(e.target.value))}
                />
  {/*           {console.log("SLIDER year", sliderYear)} */}
            2019
        </div>
    );
}; 

export default Slider 
