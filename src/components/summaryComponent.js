import React, { Component } from "react";
import TotalDataChart from "./TotalDataChart";


function SummaryComponent(props) {
    return (
        <div>
            <TotalDataChart dynamicDevices={props.dynamicDevices} />
            <p>Download Speed: 35mps</p>
            <p>Number of Connections: 10</p>
            <p>Wireless: 5 </p>
            <p>Wired: 5</p>
        </div>
    )
} 

export default SummaryComponent;

