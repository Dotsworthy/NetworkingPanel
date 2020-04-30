import React, { Component } from "react";
import TotalDataChart from "./TotalDataChart";
import "../App.css";


function SummaryComponent(props) {
    return (
        <div className="summary">
            <TotalDataChart className="summary=chart" chartData={props.chartData} />
            <div>
            <p>Number of Connections: {props.connectedDevices}</p>
            <p>Wireless: 1 </p>
            <p>Wired: 1</p>
            </div>
        </div>
    )
} 

export default SummaryComponent;

