import React from "react";
import WifiIcon from '@material-ui/icons/Wifi';
import SpeedIcon from '@material-ui/icons/Speed';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";



function SummaryComponent(props) {
    return (
        
        <Grid
        container
        direction="row"
        justify='space-around'
        alignItems='center'
        style = {{
            height: '100%',
        }}
        >
            <Box>     
            <WifiIcon/>
            <p>Connections </p>
            <p>{props.connectedDevices}</p>
            </Box>

            <Box>
            <SpeedIcon
            style={{fill: 'green'}}
            />
            <p>Download Speed </p>
            <p>{props.downloadSpeed} Mbs</p>
            </Box>

            <Box>
            <SpeedIcon
            style={{fill: 'red'}}
            >
            </SpeedIcon>    
            <p>UploadSpeed</p>
            <p>{props.uploadSpeed} Mbs </p>
            </Box>
        </Grid>
        
    )
} 

export default SummaryComponent;

