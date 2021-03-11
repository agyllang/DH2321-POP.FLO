import React from 'react';

const RadioButtons = ({radioGender, radioSelectedGender}) => {

    return (
        <div id="genderButton"
            /* value = {radioGender} */
            onChange={e => radioSelectedGender(e.target.value)}>         
            <label>All</label>
            <input type="radio" name="gender" value="all" checked = {radioGender === "all"} /> 
            <label>Female</label>
            <input type="radio" name="gender" value="kvinnor" checked = {radioGender === "kvinnor"}/> 
            <label>Male</label>
            <input type="radio" name="gender" value="män" checked = {radioGender === "män"}/>
            {console.log("radioGender", radioGender)}     
        </div>
    );
}

export default RadioButtons