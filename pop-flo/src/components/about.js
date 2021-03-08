import React, { useState, useEffect } from "react";

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    render() {
        return(
            <div className="about">
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
                        <p>Hi! We are the developers of the visualization tool POP.FLO!</p>
                        <p>We are <b>Hilda Robertsson</b>, <b>Albin Matson Gyllang</b>, 
                        <b> Amalia Berglöf</b> and <b>Moa Engquist</b>.</p>
                        <p>We got this idea while reading about Corona driving people to move
                            from the cities to smaller municipalities. We asked ourselves: has there
                            been any other interesting moving patterns in Sweden during the last couple of years?
                        </p>
                        <p>Our goal is to visualize movement in a simple, yet interesting way! It's up
                            to you if we succeeded of course! You want to get in touch with us? Email us at
                        </p>
                        <p>aberglof@kth.se</p>
                        <p>moaeng@kth.se</p>
                        <p>hildar@kth.se</p>
                        <p>albinsmailgoeshere</p>
                    </div>
                ): ''}
            </div>

        )
    }

}

export default About;