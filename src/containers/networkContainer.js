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
                device_type: "PC",
                operating_system: "OSx",
                mac_address: "82:0f:0c:79:5d:69" ,
                ip_address: "192.168.1.23",
                time_stamps: [
	                {
                    time_stamp: 123456789,
                    upload_speed: 23456,
                    download_speed: 8946748,
                    active_connection: true
                    },
                    {
                    time: 98765,
                    upload_speed: 0,
                    download_speed: 0,
                    active_connection: false
                    }      
                ]},
              {
                host_name: "DevLaptop",
                device_type: "PC",
                operating_system: "OSx",
                mac_address: "82:0f:0c:79:5d:69" ,
                ip_address: "192.168.1.23",
                time_stamps: [
                  {
                    time_stamp: 123456789,
                    upload_speed: 23456,
                    download_speed: 8946748,
                    active_connection: true
                    },
                    {
                    time: 98765,
                    upload_speed: 0,
                    download_speed: 0,
                    active_connection: false
                    }
                  ]},
            ]},
        this.toggleMode = this.toggleMode.bind(this);
  }

    latestSnapshotofDynamicDevices() {
    return this.state.dynamicDevices[this.state.dynamicDevices.length - 1]}
    
    connectedDynamicDevices() {
      return this.latestSnapshotofDynamicDevices().dynamicDeviceData.filter(device => device.activeConnection === true)
    }
    
    countConnectedDynamicDevices() {
      return this.connectedDynamicDevices().length
    }

    connectedDynamicDevicesIds() {
      return this.connectedDynamicDevices().map(device => device.id);
    }

    connectedStaticDevices() {  
      return this.state.staticDevices.filter(device => this.connectedDynamicDevicesIds().includes(device.id))
    }

    countConnectedStaticDevices() {
      return this.connectedStaticDevices().length
    }

    countWiredDevices() {
      let wiredDevices = this.state.staticDevices.filter(device => device.connectionType === "wifi")
      return wiredDevices.length
    }

    countWirelessDevices() {
      let wirlessDevices = this.state.staticDevices.filter(device => device.connectionType === "ethernet")
      return wirlessDevices.length
    }

    toggleMode(event) {
        this.setState({dark: !this.state.dark})
      } 
    

    render() {
        return (
            <div className={this.state.dark ? 'dark' : 'light'}>
                <h1>Main Dash Container</h1>
                <SummaryComponent />
                <p>{this.countConnectedDynamicDevices()}</p>
                <p>{this.countWiredDevices()}</p>
                <p>{this.countWirelessDevices()}</p>
                <p>{this.countConnectedStaticDevices()}</p>
                <p>{console.log(this.connectedDynamicDevicesIds())}</p>
                <DeviceList devices={this.state.staticDevices}/>
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