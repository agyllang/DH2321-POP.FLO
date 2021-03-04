import React, { useState, useEffect } from "react";

class Explanation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    render() {
        return(
            <div className="explanation">
                <p className="close" onClick={() => this.setState({show:!this.state.show})}>{this.state.show == true ? 'X':'Click to show'}</p>
                {this.state.show == true ? (
                    <div>
                        <p>Hi and welcome to POP.FLO!</p>
                        <p>POP.FLO is a tool that gives you the possibility to
                            visualize moving patterns between Swedish counties, "län".
                        </p>
                        <p>Sweden has 21 counties - which shouldn't be mixed up
                            with the Swedish provinces, "landskap", of which there are 25. The counties have political
                            and admininistrative powers, the provinces have not. 
                        </p>
                        <p>You can see all of the 21 counties in the map below! Explore away!!</p>
                    </div>
                ): ''}
            </div>

        )
    }

}

export default Explanation;