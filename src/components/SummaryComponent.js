import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";
import WifiIcon from '@material-ui/icons/Wifi';
import SpeedIcon from '@material-ui/icons/Speed';

const variant = 'body2'

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
            <Box
            style={{
                textAlign: 'center',
                padding: '5px'
            }}> 
            <WifiIcon/>
            <Typography variant={variant} align='center'> Connections </Typography>
            <Typography variant={variant} align='center'>{props.connectedDevices}</Typography>
            </Box>

            <Box
            style={{
                textAlign: 'center',
                padding: '5px'
            }}>
            <SpeedIcon
            style={{fill: '#69E067'}}
            />
            <Typography variant={variant} align='center'>Download Speed </Typography>
            <Typography variant={variant} align='center'>{props.downloadSpeed} Mbps</Typography>
            </Box>

            <Box
            style={{
                textAlign: 'center',
                padding: '5px'
            }}>
            <SpeedIcon
            style={{fill: '#FF1053'}}
            >
            </SpeedIcon>    
            <Typography variant={variant}align='center'>Upload Speed</Typography>
            <Typography variant={variant} align='center'>{props.uploadSpeed} Mbps </Typography>
            </Box>
        </Grid>
        
    )
} 

export default SummaryComponent;

