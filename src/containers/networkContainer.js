import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js'
import DeviceList from '../components/DeviceList.js'

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dark: false,
            devices: [
              {
                hostName: "DevLaptop",
                deviceType: "PC",
                operatingSystem: "OSx",
                macAddress: "82:0f:0c:79:5d:69" ,
                ipAddress: "192.168.1.23",
                timeStamps: [
	                {
                    timeStamp: "2020-04-29 14:19:26.546321",
                    uploadSpeed: 23456,
                    downloadSpeed: 8946748,
                    activeConnection: true
                    },
                    {
                    timeStamp: "2020-04-29 14:19:30.011170",
                    uploadSpeed: 0,
                    downloadSpeed: 0,
                    activeConnection: false
                    }      
                ]
              },
              {
                hostName: "DevLaptop",
                deviceType: "PC",
                operatingSystem: "OSx",
                macAddress: "82:0f:0c:79:5d:69" ,
                ipAddress: "192.168.1.24",
                timeStamps: [
                  {
                    timeStamp: "2020-04-29 14:19:26.546321",
                    uploadSpeed: 23456,
                    downloadSpeed: 8946748,
                    activeConnection: true
                    },
                    {
                    timeStamp: "2020-04-29 14:19:30.011170",
                    uploadSpeed: 0,
                    downloadSpeed: 0,
                    activeConnection: true
                    }
                  ]
              },
            ]
          }
        this.toggleMode = this.toggleMode.bind(this);
  }

  collectDownloadSpeeds(searchTimestamp) {
    const result = this.state.devices.filter(device => device.timeStamps.timeStamp === searchTimestamp)
    console.log(result)
  }

    // latestSnapshotofDynamicDevices() {
    // return this.state.dynamicDevices[this.state.dynamicDevices.length - 1]}
    
    // connectedDynamicDevices() {
    //   return this.latestSnapshotofDynamicDevices().dynamicDeviceData.filter(device => device.activeConnection === true)
    // }
    
    // countConnectedDynamicDevices() {
    //   return this.connectedDynamicDevices().length
    // }

    // connectedDynamicDevicesIds() {
    //   return this.connectedDynamicDevices().map(device => device.id);
    // }

    // connectedStaticDevices() {  
    //   return this.state.staticDevices.filter(device => this.connectedDynamicDevicesIds().includes(device.id))
    // }

    // countConnectedStaticDevices() {
    //   return this.connectedStaticDevices().length
    // }

    // countWiredDevices() {
    //   let wiredDevices = this.state.staticDevices.filter(device => device.connectionType === "wifi")
    //   return wiredDevices.length
    // }

    // countWirelessDevices() {
    //   let wirlessDevices = this.state.staticDevices.filter(device => device.connectionType === "ethernet")
    //   return wirlessDevices.length
    // }

    toggleMode(event) {
        this.setState({dark: !this.state.dark})
      } 
    

    render() {
        return (
            <div className={this.state.dark ? 'dark' : 'light'}>
                <h1>Main Dash Container</h1>
                {this.collectDownloadSpeeds(123456789)}
                <SummaryComponent />
                {/* <p>{this.countConnectedDynamicDevices()}</p>
                <p>{this.countWiredDevices()}</p>
                <p>{this.countWirelessDevices()}</p>
                <p>{this.countConnectedStaticDevices()}</p>
                <p>{console.log(this.connectedDynamicDevicesIds())}</p> */}
                <DeviceList devices={this.state.devices}/>
                <div class="container">
                <h3>Light/Dark Mode</h3>
                <input onClick={(event) => this.toggleMode(event)} class="container_toggle" type="checkbox" id="switch" name="mode"></input>
                <label for ="switch">Toggle</label>
              </div>
            </div>
        )
    }
}

export default NetworkContainer;