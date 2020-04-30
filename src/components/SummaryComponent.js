import React, { Component } from "react";
import TotalDataChart from "./TotalDataChart";
import "../App.css";


function SummaryComponent(props) {
    return (
        <div className="summary">
            <TotalDataChart className="summary=chart" chartData={props.chartData} />
            <div>
            <p>Number of Connections: {props.connectedDevices}</p>
            <p>Wireless: {props.wirelessDevices} </p>
            <p>Wired: {props.wiredDevices}</p>
            </div>
        </div>
    )
} 

export default SummaryComponent;

