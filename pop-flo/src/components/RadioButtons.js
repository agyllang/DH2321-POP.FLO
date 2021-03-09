import React from 'react';
import * as d3 from 'd3';

const RadioButtons = ({radioGender, radioSelectedGender}) => {
    //const buttons = d3.selectAll('input');
    //buttons.on('change', function(d) {
   // console.log('button changed to ' + this.value);
   // });
/*    function changeColor() {
    var radioValue = $("input[name='genderButton']:active");
    console.log(radioValue)
    theCircles
      .transition()
      .style("fill", radioValue)
  } */

    return (
        <div id="genderButton"
           /*  value = {radioGender} */
            onChange={e => radioSelectedGender(e.target.value)}>
                
            <label>All</label>
            {/* <input type="radio" name="gender" value="all" checked/>  */}
            {/* <input type="radio" name="gender" value="all" /> */} 
            <input type="radio" name="gender" value="all" checked/> 
            <label>Female</label>
            <input type="radio" name="gender" value="kvinnor"/> 
            <label>Male</label>
            <input type="radio" name="gender" value="män"/>
            {console.log("radioGender", radioGender)}
            
        </div>

    );
}

export default RadioButtons