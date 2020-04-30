import React, { Component } from "react";
import TotalDataChart from "./TotalDataChart";
import "../App.css";


function SummaryComponent(props) {
    return (
        <div className="summary">
            <TotalDataChart className="summary=chart" chartData={props.chartData} />
            <div>
            <p>Download Speed: 35mps</p>
            <p>Number of Connections: 10</p>
            <p>Wireless: 5 </p>
            <p>Wired: 5</p>
            </div>
        </div>
    )
} 

export default SummaryComponent;

