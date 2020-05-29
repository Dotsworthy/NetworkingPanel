import React from "react";
import WifiIcon from '@material-ui/icons/Wifi';
import SpeedIcon from '@material-ui/icons/Speed';
import Typography from '@material-ui/core/Typography';



function SummaryComponent(props) {
    return (
        // <Typography>
        <div className="summary">
            <div className="summary-item">
            <WifiIcon/>
            <p>Connections </p>
            <p>{props.connectedDevices}</p>
            </div>

            <div className="summary-item">
            <SpeedIcon
            style={{fill: 'green'}}
            />
            <p>Download Speed </p>
            <p>{props.downloadSpeed} Mbs</p>
            </div>

            <div className="summary-item">
            <SpeedIcon
            style={{fill: 'red'}}
            >
            </SpeedIcon>    
            <p>UploadSpeed</p>
            <p>{props.uploadSpeed} Mbs </p>
            </div>
        </div>
        // </Typography>
    )
} 

export default SummaryComponent;

