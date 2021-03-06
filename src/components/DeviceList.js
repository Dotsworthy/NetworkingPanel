import React from 'react';

import { Tabs, Tab, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignalWifi4BarTwoToneIcon from '@material-ui/icons/SignalWifi4BarTwoTone';
import SignalWifiOffTwoToneIcon from '@material-ui/icons/SignalWifiOffTwoTone';
import PropTypes from 'prop-types';

import DeviceDetail from './DeviceDetail.js';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertibal-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                p={3}
                 >
                <Typography variant='body2'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    devices: PropTypes.node
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },  
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    let tabCounter = 0
    const mapDeviceTab = props.devices.map(device => {
        
        return (
            <Tab 
            id={device.id}
            key={device.id}
            label={device.host_name} 
            {...a11yProps(tabCounter)} 
            icon={device.snap_shots[device.snap_shots.length - 1].active_connection ? <SignalWifi4BarTwoToneIcon style={{fill: "#69E067"}} /> : <SignalWifiOffTwoToneIcon style={{fill: "#FF1053"}} /> }
            {...tabCounter ++}
            className={classes.MuiTabsRoot}
            >
            </Tab>
            )
        });
        

    let panelCounter = 0
    const mapDevicePanel = props.devices.map(device => {
        
            return (
                <TabPanel
                 key = {device.id}
                 value={value}
                 index={panelCounter}
                 className={classes.tabPanel}
                 {...panelCounter ++}  
                 >
                   
                 
                    <DeviceDetail
                        key={device.ip_address}
                        id={device.id} 
                        deviceName={device.host_name}
                        deviceType={device.device_type}
                        ipAddress={device.ip_address}
                        macAddress={device.mac_address}
                        operatingSystem={device.operating_system}
                        activeConnection={device.snap_shots[device.snap_shots.length - 1].active_connection}
                        uploadSpeed={device.snap_shots[device.snap_shots.length - 1].upload_speed}
                        downloadSpeed={device.snap_shots[device.snap_shots.length - 1].download_speed}
                        snapShots={device.snap_shots}
                        darkState = {props.darkState}
                    />
                    
                </TabPanel> 
            )
            
        })

    return (
        <Grid
         className={classes.root}
         >
             <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            >   
            {mapDeviceTab}    
            </Tabs>
            <Grid>

            {mapDevicePanel}
            </Grid>
        </Grid>
    )
}