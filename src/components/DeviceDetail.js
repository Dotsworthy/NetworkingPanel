import React, {Component} from 'react';
import TotalDataChart from "./TotalDataChart";

class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        // this.togglePanel = this.togglePanel.bind(this);
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
                <div>
                    {
                    <div className='device-list-content'> 
                    <div>
                    <p>Device: {this.props.deviceType}</p>
                    <p>IP Address: {this.props.ipAddress}</p> 
                    <p>MAC Address: {this.props.macAddress}</p> 
                    <p>OS: {this.props.operatingSystem}</p>
                    <p>Connection Status: {this.props.activeConnection ? "Connected" : "Disconnected"}</p>
                    <p>Upload Speed: {this.props.uploadSpeed}</p>
                    <p>Download Speed: {this.props.downloadSpeed}</p>
                    </div>
                    <div>
                    
                    <TotalDataChart chartData={this.plotData()} /> </div>
                    </div>

                    }
                </div>
        );
    }
}






export default DeviceDetail;
