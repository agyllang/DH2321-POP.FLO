
// 

import React, { useRef, useState, useEffect } from "react";
import "./components.css";
import { ReactComponent as DownSvg } from '../icons/icon-down.svg'
import { ReactComponent as UpSvg } from '../icons/icon-up.svg'

//import d3Legend from "d3-svg-legend";


const DropDown = ({ selected, selectCounty }) => {
    // console.log("Dropdown_selected,:", selected)
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);

    const counties = [
        { id: 1, name: "Stockholms län", },
        { id: 3, name: "Uppsala län", },
        { id: 4, name: "Södermanlands län", },
        { id: 5, name: "Östergötlands län", },
        { id: 6, name: "Jönköpings län", },
        { id: 7, name: "Kronobergs län", },
        { id: 8, name: "Kalmar län", },
        { id: 9, name: "Gotlands län", },
        { id: 10, name: "Blekinge län", },
        { id: 12, name: "Skåne län", },
        { id: 13, name: "Hallands län", },
        { id: 14, name: "Västra Götalands län", },
        { id: 17, name: "Värmlands län", },
        { id: 18, name: "Örebro län", },
        { id: 19, name: "Västmanlands län", },
        { id: 20, name: "Dalarnas län", },
        { id: 21, name: "Gävleborgs län", },
        { id: 22, name: "Västernorrlands län", },
        { id: 23, name: "Jämtlands län", },
        { id: 24, name: "Västerbottens län", },
        { id: 25, name: "Norrbottens län", },
    ]

    const getName = (ID) => {
        // counties.filter((c) => c.id == selected)
        var returnArray = []
        counties.map((c) => {
            if (c.id == ID) {
                console.log("c.name", c.name)
                returnArray.push(c.name)
            }
        })
        return returnArray[0]
    }

    return (
        <div className="dropDownContainer" >
            <div className="dropDownSelectionContainer">
                <span className="dropDownSelectedSpan">{selected != null ? getName(selected) : "Choose a county"}</span>
                <button className="dropDownButton" onClick={() => setOpen(!open)}>
                    {!open ? <DownSvg />
                        : <UpSvg />
                    }
                </button>
            </div>
            {open ?

                <ul className="dropDownUL">{counties.map(c =>
                    <li className={c.id == selected ? "dropDownItemSelected" : "dropDownItem"}

                        key={c.id}
                        // onMouseEnter={() => setHover(true)}
                        // onMouseLeave={() => { setHover(false) }}
                        onClick={() => {
                            selectCounty(c.id)
                            setOpen(false)
                        }}
                    >
                        {c.name}</li>
                )}

                </ul> : null


            }

        </div>
    )
}

export default DropDown
