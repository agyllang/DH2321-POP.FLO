import React, { useState, useEffect } from "react";
import logo from './logo3.png'
import moa from './images/moa.png'
import albin from './images/albin.png'
import amalia from './images/amalia.png'
import hilda from './images/hilda.png'
import map from './images/map.png'

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPerson: undefined,
            detailsPerson: undefined,
        }
    }

    render() {
        return(
            <div>
                <div className="aboutcontainer">
                    <div className="aboutblock">
                    <h3>Hi and welcome to POP.FLO!</h3>
                            <p>POP.FLO is a tool that gives you the possibility to
                                visualize moving patterns between Swedish counties, "län".
                            </p>
                            <p>We got this idea while reading about Corona driving people to move
                            from the cities to smaller municipalities. We asked ourselves: has there
                            been any other interesting moving patterns in Sweden during the last couple of years?
                            </p>
                            <p>Sweden has 21 counties - which shouldn't be mixed up
                                with the Swedish provinces, "landskap", of which there are 25. The counties have political
                                and admininistrative powers, the provinces have not. 
                            </p>
                            <p>The <a href="https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__BE__BE0101__BE0101J/InOmflytt/">data</a> comes from the Swedish Central Bureau of Statistics, and the visualization
                                is built mainly with D3.js, Javascript, CSS and React.
                            </p>
                    </div>
                    <div className="aboutpicture"><img className="biglogo" src={map}></img></div>
                </div>
                <div className="aboutcontainer">
                    <div className="photocontainer">
                        <div className="photorow">
                        <img id="albin" className={this.state.detailsPerson == "Albin" || this.state.detailsPerson == undefined ?"profilephoto":"photohide"} src={albin} onMouseEnter={() => this.setState({selectedPerson: "Albin"})} onClick={() => this.setState({detailsPerson: "Albin"})} onMouseOut={() => this.setState({selectedPerson: undefined})}></img>
                            <img id="amalia" className={this.state.detailsPerson == "Amalia" || this.state.detailsPerson == undefined ?"profilephoto":"photohide"} src={amalia} onMouseEnter={() => this.setState({selectedPerson: "Amalia"})} onClick={() => this.setState({detailsPerson: "Amalia"})} onMouseOut={() => this.setState({selectedPerson: undefined})}></img>
                        </div>
                        <div className="photorow">
                            <img id="hilda" className={this.state.detailsPerson == "Hilda" || this.state.detailsPerson == undefined ?"profilephoto":"photohide"} src={hilda} onMouseEnter={() => this.setState({selectedPerson: "Hilda"})} onClick={() => this.setState({detailsPerson: "Hilda"})} onMouseOut={() => this.setState({selectedPerson: undefined})}></img>
                            <img id="moa" className={this.state.detailsPerson == "Moa" || this.state.detailsPerson == undefined ?"profilephoto":"photohide"} src={moa} onMouseEnter={() => this.setState({selectedPerson: "Moa"})} onClick={() => this.setState({detailsPerson: "Moa"})} onMouseOut={() => this.setState({selectedPerson: undefined})}></img>
                        </div>
                    </div>
                    <div className="aboutblock">
                    {this.state.detailsPerson == "Amalia"? 
                    <div>
                        <p onClick={() => this.setState({detailsPerson: undefined, selectedPerson:undefined})} className="close">X</p>
                            <p>
                            Hi! 
                            I'm Amalia and I've been mainly responsible for the UX in this project.
                            I've user tested our product, as well as had the user in mind through the process
                            of creating this webpage!
                            <p>Email me at aberglof@kth.se!</p>
                            </p>
                    </div> :
                            (
                                this.state.detailsPerson == "Albin" ? 
                                <div>
                                    <p onClick={() => this.setState({detailsPerson: undefined, selectedPerson:undefined})} className="close">X</p>
                                    <p>Hello! My name is Albin, I have mostly been working with Front End related stuff. In this project I have explored the D3.js library, also I have learned alot about Swedish geography. 
                                        I really like our group dynamic! 
                                 
                                        <p>agyllang@kth.se </p></p>
                                </div>:
                                (
                                this.state.detailsPerson == "Hilda" ? 
                                <div>
                                    <p onClick={() => this.setState({detailsPerson: undefined, selectedPerson:undefined})} className="close">X</p>
                                    <p>hildar@kth.se</p>
                                </div>:
                                (
                                    this.state.detailsPerson== "Moa" ? 
                                    <div>
                                        <p onClick={() => this.setState({detailsPerson: undefined, selectedPerson:undefined})} className="close">X</p>
                                        <p>Hej! 
                                            <br></br>This is me! Moa! :D
                                            <br></br>In this project I've manily been working with the front end
                                            <br></br>
                                        <p>moaeng@kth.se</p></p>
                                    </div>:
                                
                                    <div>
                                        <p>We are the group behind  POP.FLO!</p>
                                        <p>
                                            {this.state.selectedPerson== "Albin" ? <b> Albin Matson Gyllang</b>:' Albin Matson Gyllang'}, 
                                            {this.state.selectedPerson== "Amalia"? <b> Amalia Berglöf</b>:' Amalia Berglöf'}, 
                                            {this.state.selectedPerson== "Hilda"? <b> Hilda Robertsson</b>:' Hilda Robertsson'} and  
                                            {this.state.selectedPerson== "Moa"? <b> Moa Engquist</b>:' Moa Engquist'}.
                                            We built this tool as our final project in our course in Information Visualization <a href="https://www.kth.se/student/kurser/kurs/DH2321">(DH2321)</a>
                                             at KTH.</p>
                                        <p>Our goal is to visualize movement in a simple, yet interesting way! We want to
                                            keep the simpleness and readability of a map, while adding visualizations to
                                            help interpret the data. It's up to you if we succeeded of course. 
                                        </p>
                                        <p>
                                        You want to get in touch with us? Click on one of us to
                                        get to know them better, and get the contact details!
                                        </p>
                                </div>
                                ))
                            )}
                    </div>
                </div>
            </div>

        )
    }

}

export default About;