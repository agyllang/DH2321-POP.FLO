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