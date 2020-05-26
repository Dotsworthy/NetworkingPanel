import React from 'react';
import DeviceDetail from './DeviceDetail.js';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TabPanel from '@material-ui/core/Tab';



function DevicePanel(props) {
    return (
       props.devices.map(device => {
        return (
            <TabPanel
             key = {device.id}
             value={props.value}
             index={device.indexOf}> 
                <DeviceDetail
                    key={device.ip_address}
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
            </TabPanel>
        )
    })
    )
 }

 function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default DevicePanel;