import React, {Component} from 'react';
import TotalDataChart from "./TotalDataChart";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';



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
        this.props.snapShots.forEach(snapShot => {
            let newChartData = []
            let completeTimeString = snapShot.time_stamp    
            formattedTimeString = completeTimeString.slice(11, 16)
            newChartData.push(formattedTimeString)
            newChartData.push(snapShot.upload_speed)
            newChartData.push(snapShot.download_speed)
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
                 item sm item md
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
                item sm = {8} item md={10}
                
                >
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
