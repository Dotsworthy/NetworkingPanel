import React, {Component} from 'react';
import { Grid, Typography, Hidden } from "@material-ui/core";

import TotalDataChart from "./TotalDataChart";

class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps) {
            return true;
        }
    }

    togglePanel(e){
        this.setState({open: !this.state.open})
    }

    plotData() {
        let chartData = [['Time', 'Upload Mbs', 'Download Mbs']]
        let formattedTimeString = ''
        this.props.snapShots.forEach(timeStamp => {
            let newChartData = []    
            formattedTimeString = timeStamp.time_stamp.slice(11, 16)
            newChartData.push(formattedTimeString)
            newChartData.push(timeStamp.upload_speed)
            newChartData.push(timeStamp.download_speed)
            chartData.push(newChartData)
        })
        return chartData
    }
    
    render() {
        return (
            <Grid
            container
            direction="row"> 
                <Grid
                 item sm md
                 >
                    <Typography variant="body2">Device: {this.props.deviceType}</Typography>
                    <Typography variant="body2">IP Address: {this.props.ipAddress}</Typography>
                    <Typography variant="body2">MAC Address: {this.props.macAddress}</Typography>
                    <Typography variant="body2">OS: {this.props.operatingSystem}</Typography>
                    <Typography variant="body2">Connection Status: {this.props.activeConnection ? "Connected" : "Disconnected"}</Typography>
                    <Typography variant="body2">Upload Speed: {this.props.uploadSpeed}</Typography>
                    <Typography variant="body2">Download Speed: {this.props.downloadSpeed}</Typography>
                </Grid>        
                
                <Hidden
                xsDown
                >
                <Grid
                item sm = {8} md={9}
                
                >  
                <Typography
                style={{
                    paddingLeft: '10px',
                }}
                >
                Total Uploads/Downloads({this.props.deviceType})</Typography>
                <TotalDataChart 
                chartData={this.plotData()} 
                darkState={this.props.darkState}
                /> 
                </Grid>    
                </Hidden>            
            </Grid>
        );
    }
}






export default DeviceDetail;
