import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js'
import DeviceList from '../components/DeviceList.js'

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dark: false,
            staticDevices: [
                {
                    id: 1,
                    hostName: "Alan's Phone",
                    deviceType: "phone",
                    operatingSystem: "Android",
                    connectionType: "wifi",
                    macAddress: "00:1b:44:11:3A",
                    ipAddress: "192.168.17.43"

                },
                {
                    id: 2,
                    hostName: "Andrews's Macbook Air",
                    deviceType: "laptop",
                    operatingSystem: "MacOS",
                    connectionType: "wifi",
                    macAddress: "00:2b:24:12:4A",
                    ipAddress: "192.168.17.68"
                },
                {
                    id: 3,
                    hostName: "Nick's Server",
                    deviceType: "server",
                    operatingSystem: "Linux",
                    connectionType: "ethernet",
                    macAddress: "00:1b:44:11:5A",
                    ipAddress: "192.168.17.89"
                }
            ],
            dynamicDevices: [
                {
                  timeStamp: 1588078694,
                  dynamicDeviceData: [
                    {
                      deviceID: 1,
                      activeConnection: true,
                      uploadSpeed: 4,
                      downloadSpeed: 5
                    },
                    {
                        deviceID: 2,
                        activeConnection: false,
                        uploadSpeed: 0,
                        downloadSpeed: 0
                    },
                    {
                      deviceID: 3,
                      activeConnection: true,
                      uploadSpeed: 4,
                      downloadSpeed: 5
                    }
                  ]
                },
                {
                  timeStamp: 1588078769,
                  dynamicDeviceData: [
                    {
                      deviceID: 1,
                      activeConnection: false,
                      uploadSpeed: 0,
                      downloadSpeed: 0
                    },
                    {
                      deviceID: 2,
                      activeConnection: true,
                      uploadSpeed: 4,
                      downloadSpeed: 1000
                    },
                    {
                      deviceID: 3,
                      activeConnection: true,
                      uploadSpeed: 4,
                      downloadSpeed: 3000
                    }
                  ]
                },
                {
                  timeStamp: 1588078912,
                  dynamicDeviceData: [
                    {
                      deviceID: 1,
                      activeConnection: true,
                      uploadSpeed: 25,
                      downloadSpeed: 125
                    },
                    {
                      deviceID: 2,
                      activeConnection: true,
                      uploadSpeed: 4,
                      downloadSpeed: 1000
                    },
                    {
                      deviceID: 3,
                      activeConnection: true,
                      uploadSpeed: 4,
                      downloadSpeed: 3000
                    }
                  ]
                }
            ],
        }
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
<<<<<<< HEAD
                <p>{this.countConnectedDynamicDevices()}</p>
                <p>{this.countWiredDevices()}</p>
                <p>{this.countWirelessDevices()}</p>
                <p>{this.countConnectedStaticDevices()}</p>
                <p>{console.log(this.connectedDynamicDevicesIds())}</p>
=======
                <DeviceList devices={this.state.staticDevices}/>
                <div class="container">
                <h3>Light/Dark Mode</h3>
                <input onClick={(event) => this.toggleMode(event)} class="container_toggle" type="checkbox" id="switch" name="mode"></input>
                <label for ="switch">Toggle</label>
              </div>
>>>>>>> develop
            </div>
        )
    }
}

export default NetworkContainer;