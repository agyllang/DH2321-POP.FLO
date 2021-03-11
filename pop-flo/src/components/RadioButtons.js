import React from 'react';
import "../App.css";

const RadioButtons = ({radioGender, radioSelectedGender}) => {

    return (
        <div id="genderButton"
            /* value = {radioGender} */
            onChange={e => radioSelectedGender(e.target.value)}>  
            <input type="radio" name="gender" value="all" checked = {radioGender === "all"} /> 
            <label>All</label>
            <br/>
            <input type="radio" name="gender" value="kvinnor" checked = {radioGender === "kvinnor"}/>
            <label>Female</label> 
            <br/>
            <input type="radio" name="gender" value="män" checked = {radioGender === "män"}/>
            <label>Male</label>
            {console.log("radioGender", radioGender)}     
        </div>
    );
}

export default RadioButtons