import React, {Component} from 'react';


class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
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
                    </div> 
                    {
                    this.state.open? (
                    <div className='content'> 
                    <p>{this.props.deviceType}</p>
                    <p>{this.props.ipAddress}</p> 
                    <p>{this.props.macAddress}</p> 
                    <p>{this.props.operatingSystem}</p>
                    </div>)
                    :null 
                    }
                </div>
        );
    }
}






export default DeviceDetail;