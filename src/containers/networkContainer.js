import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js'

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            ]
        }
    }

    countActiveConnections() {
      let result = this.state.dynamicDevices[this.state.dynamicDevices.length - 1]
      let activeConnection = result.dynamicDeviceData.filter(device => device.activeConnection === true)
      return activeConnection.length
    }

    render() {
        return (
            <div>
                <h1>Main Dash Container</h1>
                <SummaryComponent dymanicDevices={this.state.dynamicDevices} />
                <p>{this.countActiveConnections()}</p>
            </div>
        );
    }
}

export default NetworkContainer;