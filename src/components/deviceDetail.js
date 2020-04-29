import React, {Component} from 'react';


class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
        this.setState({open: !this.state.open})
    }

    render() {
        return (
                <div>
                    <div onClick={(e)=> this.togglePanel(e)} className ='header'>
                    <h3>{this.props.deviceName}</h3>
                    <div className={this.props.activeConnection ? "connection-light-connected" : "connection-light-disconnected" }></div>
                    </div> 
                    {
                    this.state.open? (
                    <div className='content'> 
                    <p>Device: {this.props.deviceType}</p>
                    <p>IP Address: {this.props.ipAddress}</p> 
                    <p>MAC Address: {this.props.macAddress}</p> 
                    <p>OS: {this.props.operatingSystem}</p>
                    <p>Connection Status: {this.props.activeConnection ? "Connected" : "Disconnected"}</p>
                    <p>Upload Speed: {this.props.uploadSpeed}</p>
                    <p>Download Speed: {this.props.downloadSpeed}</p>
                    </div>)
                    :null 
                    }
                </div>
        );
    }
}






export default DeviceDetail;