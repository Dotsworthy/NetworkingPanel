import React from 'react';
import DeviceDetail from './DeviceDetail.js'

const DeviceList = (props) => {
    const deviceItems = props.devices.map(device => {
        return (
            <DeviceDetail
            id={device.id} 
            deviceName={device.hostName}
            deviceType={device.deviceType}
            ipAddress={device.ipAddress}
            macAddress={device.macAddress}
            operatingSystem={device.operatingSystem}
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