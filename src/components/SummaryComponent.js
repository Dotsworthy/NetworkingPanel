import React from "react";
import TotalDataChart from "./TotalDataChart";


function SummaryComponent(props) {
    return (
        <div className="summary">
            <TotalDataChart className="summary=chart" 
            chartData={props.chartData}
            dark = {props.dark} />
            <div>
            <p>Number of Connections: {props.connectedDevices}</p>
            <p>Upload Speed: {props.uploadSpeed} </p>
            <p>Download Speed: {props.downloadSpeed}</p>
            </div>
        </div>
    )
} 

export default SummaryComponent;

