import React from 'react';
import DeviceDetail from './DeviceDetail.js'

const DeviceList = (props) => {
    const deviceItems = props.devices.map(device => {
        return (
            <DeviceDetail key={device.ipAddress}
            id={device.id} 
            deviceName={device.hostName}
            deviceType={device.deviceType}
            ipAddress={device.ipAddress}
            macAddress={device.macAddress}
            operatingSystem={device.operatingSystem}
            activeConnection={device.timeStamps[device.timeStamps.length - 1].activeConnection}
            uploadSpeed={device.timeStamps[device.timeStamps.length - 1].uploadSpeed}
            downloadSpeed={device.timeStamps[device.timeStamps.length - 1].downloadSpeed}
            timeStamps={device.timeStamps}
            />
        )
    })
        
    return (
        <ul>
        {deviceItems}
        </ul>
    )
     
}

export default DeviceList;
