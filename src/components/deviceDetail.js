import React, {Component} from 'react';

class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        }
    }

    render() {
        return (
            <li>
                <div>
                    <h3>{this.props.deviceName}</h3>
                    <p>{this.props.deviceType}</p> 
                    <p>{this.props.id}</p> 
                    <p>{this.props.ipAddress}</p> 
                    <p>{this.props.macAddress}</p> 
                    <p>{this.props.operatingSystem}</p> 
                </div>
            </li>
        );
    }
}

export default DeviceDetail;