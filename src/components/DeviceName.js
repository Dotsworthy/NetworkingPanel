import React from 'react';
import Tab from '@material-ui/core/Tab';
import SignalWifi4BarTwoToneIcon from '@material-ui/icons/SignalWifi4BarTwoTone';
import SignalWifiOffTwoToneIcon from '@material-ui/icons/SignalWifiOffTwoTone';


function DeviceName(props) {
    return (
       props.devices.map(device => {
        return (
            <Tab 
            label={device.host_name} {...a11yProps(device.indexOf)} 
            icon={device.snap_shots[device.snap_shots.length - 1].active_connection ? <SignalWifi4BarTwoToneIcon /> : <SignalWifiOffTwoToneIcon /> }>
            />
            </Tab>
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

export default DeviceName;

// render() {
    //         const deviceNames = this.props.devices.map(device => {
    //             return (
    //                 <div className="tab">
    //                     <div>
    //                         <button className="tablinks" onClick={()=>this.openTab(device.host_name)}>{device.host_name}</button>
    //                         <img src={device.snap_shots[device.snap_shots.length - 1].active_connection ? "../images/connected.png" : "../images/disconnected.png"} alt={this.props.activeConnection ? "Connected" : "Disconnected"} height="21" width="21"></img>
    //                     </div>
    
    //                     <div class = "tabcontent" id={device.host_name}>
    //                     <DeviceDetail 
    //                     key={device.ip_address}
    //                     id={device.id} 
    //                     deviceName={device.host_name}
    //                     deviceType={device.device_type}
    //                     ipAddress={device.ip_address}
    //                     macAddress={device.mac_address}
    //                     operatingSystem={device.operating_system}
    //                     activeConnection={device.snap_shots[device.snap_shots.length - 1].active_connection}
    //                     uploadSpeed={device.snap_shots[device.snap_shots.length - 1].upload_speed}
    //                     downloadSpeed={device.snap_shots[device.snap_shots.length - 1].download_speed}
    //                     snapShots={device.snap_shots}
    //                     />
    //                     </div>
    //                 </div>
    //             )
    //         })