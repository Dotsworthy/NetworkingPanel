import React, { Component } from "react";
import TotalDataChart from "./TotalDataChart";


function SummaryComponent(props) {
    return (
        <div>
            <TotalDataChart dynamicDevices={props.dynamicDevices} />
            <p>Number of Connections: 10</p>
        </div>
    )
} 

export default SummaryComponent;

