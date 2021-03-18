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
                                visualize migration patterns between Swedish counties, "län".
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
                                is built mainly with D3.js, Javascript, CSS and React. The source code on Github can be found <a href="https://github.com/agyllang/DH2321-POP.FLO">here</a>. 
                            </p>
                            <p>We've taken inspiration from many projects, such as the master thesis and project on visualizing migration to Sweden by <a href="https://people.kth.se/~cjba/thesis/#">Carl-Johan Backman</a>, as well as
                                the project <a href="https://fstal.github.io/jobVis/">JobVis</a>, <a href="https://doi.org/10.1016/j.heliyon.2020.e05490">Stuart Gietel-Bastens work</a> on Circular visualization of historical migration in England in the 18th century and <a href="https://www.researchgate.net/publication/333765430_A_Classification_and_Data_Visualization_Tool_Applied_to_Human_Migration_Analysis">David Dominguez et al.s tool</a> for classification and visualization applied on human migration analysis. 
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
                            of creating this webpage! That is, adding visual mappings and structures that can help and
                            guide the user, such as graphical properties such as colors. I've also done some 
                            front-end, such as this About us-page (building elements and creating the content), 
                            and also been responsible for the routing and information parts of the website.
                            <p>Email me at aberglof@kth.se, or at <a href="www.linkedin.com/in/amalia-berglof">LinkedIn</a>!</p>
                            </p>
                    </div> :
                            (
                                this.state.detailsPerson == "Albin" ? 
                                <div>
                                    <p onClick={() => this.setState({detailsPerson: undefined, selectedPerson:undefined})} className="close">X</p>
                                    <p>Hello! My name is Albin. I have been working alot with the map visualization, our vision about the map demanded deeper knowledge about the D3.js library and especially the sub-library D3-geo which I have delved into.
                                      I have also spent alot of time figuring out state-handling React related issues. Apart from code-related learnings, I have updated my Swedish geography skills, something 10 year old Albin would be very proud of.
                                     I really like our group dynamic! Working with these guys has been very rewarding.
                                 
                                        <p><a href="https://www.linkedin.com/in/albin-matson-gyllang-535486104/">LinkedIn</a></p></p>
                                </div>:
                                (
                                this.state.detailsPerson == "Hilda" ? 
                                <div>
                                    <p onClick={() => this.setState({detailsPerson: undefined, selectedPerson:undefined})} className="close">X</p>
                                    <p>
                                        Hi! My name is Hilda and I have worked a lot with the data, and how we filter and map it to the different visual structures.
                                        I really enjoyed working on this project!
                                        <p>hildar@kth.se</p>
                                    </p>
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
                                        <h3>We are the group behind POP.FLO!</h3>
                                        <p>
                                            {this.state.selectedPerson== "Albin" ? <b> Albin Matson Gyllang</b>:' Albin Matson Gyllang'}, 
                                            {this.state.selectedPerson== "Amalia"? <b> Amalia Berglöf</b>:' Amalia Berglöf'}, 
                                            {this.state.selectedPerson== "Hilda"? <b> Hilda Robertsson</b>:' Hilda Robertsson'} and  
                                            {this.state.selectedPerson== "Moa"? <b> Moa Engquist</b>:' Moa Engquist'}.
                                            We built this tool as our final project in our course in Information Visualization <a href="https://www.kth.se/student/kurser/kurs/DH2321">DH2321</a> at KTH.</p>
                                        <p>Our goal was to visualize movement in a simple, yet interesting way! We wanted to
                                            keep the simpleness and readability of a map, while adding visualizations to
                                            help interpret the data. It's up to you if we succeeded of course. 
                                        </p>
                                        <p>
                                        You want to get in touch with us? Click on one of us to
                                        get to know them better, and get the contact details!
                                        </p>
                                        <h3>Learnings</h3>
                                        <p>In this project we have collaborated as a group, designing this project,
                                            totally remotely. That has been a challenge sometimes, but also something that
                                            is very helpful for future work! We've learned how to transform data interactively,
                                            do visual mappings and view transformations while building this webpage. We have
                                            had the opportunity to present, defend and get feedback on our project many times during the process. We 
                                            have developed the project in the way that we see fit towards the objectives of the course,
                                            and from what we've learned from analyzing similar related work. Due to Corona, the opportunities
                                            for doing user evaluation has been limited. Here we have taken help from those close to us, thank you for your help!
                                        </p>
                                        <p>
                                            More specifically, we've learned more about working with external
                                            libraries such as D3.js, as well as how to work with interactive queries
                                            to back-end; and how important it is to structure data wisely! We have
                                            all developed further skills in web development in Javascript, HTML and CSS.
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