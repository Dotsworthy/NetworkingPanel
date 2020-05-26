import React from "react";
import TotalDataChart from "./TotalDataChart";


function SummaryComponent(props) {
    return (
        <div className="summary">
            <div>
            <p>Number of Connections: {props.connectedDevices}</p>
            <p>Upload Speed: {props.uploadSpeed} </p>
            <p>Download Speed: {props.downloadSpeed}</p>
            </div>
        </div>
    )
} 

export default SummaryComponent;

