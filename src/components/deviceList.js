import React from 'react';

const DeviceList = (props) => {
    const deviceItems = props.devices.map(device => {
        return <li> {device.hostName} </li>
    })
        return (
            <ul>
            {deviceItems}
            </ul>
        )
     
}

export default DeviceList;