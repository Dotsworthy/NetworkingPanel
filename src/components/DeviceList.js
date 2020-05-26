import React, {Component} from 'react';
import DeviceDetail from './DeviceDetail.js'

class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    openTab(pageName) {
        let tabIndex, tabcontent, tablinks;
  
        tabcontent = document.getElementsByClassName("tabcontent");
        for (tabIndex = 0; tabIndex < tabcontent.length; tabIndex++) {
          tabcontent[tabIndex].style.display = "none";
        }
  
        tablinks = document.getElementsByClassName("tablinks");
        for (tabIndex = 0; tabIndex < tablinks.length; tabIndex++) {
          tablinks[tabIndex].className = tablinks[tabIndex].className.replace(" active", "");
        }
  
        document.getElementById(pageName).style.display = "block";
        // pageName.className += " active";
        console.log("clicked")
      }
      
    closeTab(pageName) {
        document.getElementById(pageName).style.display = "none";
    }
      
      //   openDefaultTab(tabId) {
    //     document.getElementById(tabId).click();
    //   }

    render() {
        const deviceNames = this.props.devices.map(device => {
            return (
                <div className="tab">
                    <div>
                        <button className="tablinks" onClick={()=>this.openTab(device.host_name)}>{device.host_name}</button>
                        <img src={device.snap_shots[device.snap_shots.length - 1].active_connection ? "../images/connected.png" : "../images/disconnected.png"} alt={this.props.activeConnection ? "Connected" : "Disconnected"} height="21" width="21"></img>
                    </div>

                    <div class = "tabcontent" id={device.host_name}>
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
                    </div>
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
