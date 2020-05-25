import React, {Component} from 'react';
import DeviceDetail from './DeviceDetail.js'

  
class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    openTab() {
        console.log("open tab")
    }

    render() {
        const deviceNames = this.props.devices.map(device => {
            return (
                <div>
                <DeviceDetail key={device.ip_address}
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
                />
                </div>
            )
        })

        return (
            <div>
                <ul>
                    {deviceNames}
                </ul>

            </div>
        );
    }

}

export default DeviceList;
