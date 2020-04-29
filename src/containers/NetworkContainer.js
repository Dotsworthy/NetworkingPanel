import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js'
import DeviceList from '../components/DeviceList.js'

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [['Time', 'Upload Mbs', 'Download Mbs']],
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
                hostName: "Andrew's iPhone",
                deviceType: "mobile",
                operatingSystem: "iOS",
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
                    uploadSpeed: 250,
                    downloadSpeed: 4000,
                    activeConnection: true
                    }
                  ]
              },
            ]
          }
        this.toggleMode = this.toggleMode.bind(this);
  }

  chartDataMapping(number) {
    let newChartData = ['']
    let uploadTotal = 0
    let downloadTotal = 0
    for (let counter = 0; counter < number; counter ++) {
      this.state.devices.forEach(device => {
        uploadTotal += device.timeStamps[counter].uploadSpeed
        downloadTotal += device.timeStamps[counter].downloadSpeed
      })
    }
      newChartData.push(uploadTotal)
      newChartData.push(downloadTotal)
      this.state.chartData.push(newChartData)
      newChartData = ['']
  }
 
  

  //map through each device

  //find the first timestamps object

  //

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
            <div className={this.state.dark ? 'network-dark' : 'network-light'}>
              <div className="content">
                {this.chartDataMapping(2)}
                <h1>Network Dashboard</h1>
                <hr></hr>
                <h2>Summary</h2>
                <hr></hr>
                <SummaryComponent />
                <h2>Devices</h2>
                <hr></hr>
                <DeviceList devices={this.state.devices}/>
                  <div class="container">
                <hr></hr>
                  <h4>Light/Dark Mode</h4>
                  <input onClick={(event) => this.toggleMode(event)} class="container_toggle" type="checkbox" id="switch" name="mode"></input>
                  <label for ="switch">Toggle</label>
                  </div>
              </div>
            </div>
        )
    }
}

export default NetworkContainer;