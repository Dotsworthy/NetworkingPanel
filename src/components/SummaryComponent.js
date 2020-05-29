import React from "react";
import WifiIcon from '@material-ui/icons/Wifi';
import SpeedIcon from '@material-ui/icons/Speed';



function SummaryComponent(props) {
    return (
        <div className="summary">
            <div className="summary-item">
            <WifiIcon/>
            <p>Connections </p>
            <p>{props.connectedDevices}</p>
            </div>

            <div className="summary-item">
            <SpeedIcon
            style={{fill: '#69E067'}}
            />
            <p>Download Speed </p>
            <p>{props.downloadSpeed} Mbs</p>
            </div>

            <div className="summary-item">
            <SpeedIcon
            style={{fill: '#FF1053'}}
            >
            </SpeedIcon>    
            <p>UploadSpeed</p>
            <p>{props.uploadSpeed} Mbs </p>
            </div>
        </div>
    )
} 

export default SummaryComponent;

