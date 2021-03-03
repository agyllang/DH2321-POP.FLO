import React, { useState, useEffect } from "react";

class Explanation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <p>Hi and welcome to POP.FLO!</p>
                <p>POP.FLO is a tool that gives you the possibility to
                    visualize moving patterns within Sweden, between Swedish counties, "län".
                </p>
                <p>Sweden has 21 counties - which shouldn't be mixed up
                    with the Swedish provinces, "landskap", of which there are 25. The counties have political
                    and admininistrative powers, the provinces have not. 
                </p>
            </div>

        )
    }

}

export default Explanation;