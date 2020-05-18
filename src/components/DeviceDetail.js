import React, {Component} from 'react';
import TotalDataChart from "./TotalDataChart";

class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [
                ['Time', 'Upload Mbs', 'Download Mbs'], [0,0,0]
            ],
            open: false,
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    componentDidMount() {
        this.plotData() 
    }
    // To do: React warns against this, try and find another way? Perhaps move state open to device list level
    componentWillReceiveProps() {
        this.plotData()
    }

    togglePanel(e){
        this.setState({open: !this.state.open})
    }

    plotData() {
        // to do: rewrite this function to do a check on whether the size of the chartData 
        // matches the size of the snapShots. If no, loop through every snapshot and push it to the
        // chartData. This may be cleaner than doing it repeatedly and avoid the state mutation warning
        // flagged by React.
        // below function works on Network Container chart but now here. why?
        this.state.chartData = [['Time', 'Upload Mbs', 'Download Mbs']]
        let newChartData = []
        let formattedTimeString = ''
        this.props.snapShots.map(timeStamp => {
        formattedTimeString = timeStamp.time_stamp.slice(11, 16)
        newChartData.push(formattedTimeString)
        newChartData.push(timeStamp.upload_speed)
        newChartData.push(timeStamp.download_speed)
        this.state.chartData.push(newChartData)
        newChartData = []  
        })
    }   

    render() {
        return (
                <div>
                    <div onClick={(e)=> this.togglePanel(e)} className ='header'>
                    
                    <div className="device-title-bar">
                        <h3>{this.props.deviceName}</h3>
                        <img src={this.props.activeConnection ? "../images/connected.png" : "../images/disconnected.png"} alt={this.props.activeConnection ? "Connected" : "Disconnected"} height="42" width="42"></img>
                        </div>
                    
                    </div> 
                    {
                    this.state.open? (
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
                    
                    <TotalDataChart chartData={this.state.chartData} /> </div>
                    </div>
                    )
                    :null 
                    }
                </div>
        );
    }
}






export default DeviceDetail;
