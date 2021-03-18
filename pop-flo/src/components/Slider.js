import React, { useRef,useState, useEffect } from "react";
//import {RangeStepInput} from 'react-range-step-input';
import "../App.css";
import StepRangeSlider from 'react-step-range-slider'

const Slider = ({sliderYear, sliderSelectedYear}) => {

    const range = [
        { value: 2000, step: 1 }, //min
        { value: 2019 } //max
      ]

    return ( 
        <div className="addMargin">
           {/* <div className="centeredSliderValue">{sliderYear}</div> */}
            2000
            {/* <RangeStepInput 
                min={2000} max={2019}
                value={sliderYear} step={1}
                onChange={e => sliderSelectedYear(parseInt(e.target.value))} */}
             <div className="StepSlider">   
            <StepRangeSlider 
                value={sliderYear}
                range={range}
                onChange={value => sliderSelectedYear(parseInt(value))}
                />
                </div>
            2019
        </div>
    );
}; 

export default Slider 
