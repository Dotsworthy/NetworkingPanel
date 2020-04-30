import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js'
import DeviceList from '../components/DeviceList.js'

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [['Time', 'Upload Mbs', 'Download Mbs']],
            dark: false,
            connectedDevices: 0,
            devices: []
          };
        this.toggleMode = this.toggleMode.bind(this);
    }

  componentDidMount() {
    const url = 'http://localhost:5001/presentation-data';
    
    fetch(url)
      .then(res => res.json())
      .then(devices => this.setState({
         devices: devices 
        }))
      .then(() => {
        this.chartDataMapping()
        this.countConnectedDevices()
      })
      .catch(err => console.error); 
     
  }

  chartDataMapping() {
    let newChartData = ['']
    let uploadTotal = 0
    let downloadTotal = 0
    for (let counter = 0; counter < this.state.devices.length; counter ++) {
      this.state.devices.forEach(device => {
        uploadTotal += device.snap_shots[counter].upload_speed
        downloadTotal += device.snap_shots[counter].download_speed
      })
      newChartData.push(uploadTotal)
      newChartData.push(downloadTotal)
      this.state.chartData.push(newChartData)
      newChartData = ['']
      uploadTotal = 0
      downloadTotal = 0
      
    }
  }
  
    connectedDevices() {
      return
      this.devices.filter(device => device.timeStamps[device.timeStamps.length-1].activeConnection === true)
    }
  
    countConnectedDevices() {
      let counter = 0;

      this.state.devices.forEach (device => {
      if (device.snap_shots[device.snap_shots.length -1].active_connection === true) {
        counter += 1 
      };
    })
    this.setState({connectedDevices: counter})
  }
  

    countWiredDevices() {
      let wiredDevices = this.state.devices.filter(device => device.connectionType === "wifi")
      return wiredDevices.length
    }

    countWirelessDevices() {
      let wirlessDevices = this.state.devices.filter(device => device.connectionType === "ethernet")
      return wirlessDevices.length
    }

    toggleMode(event) {
        this.setState({dark: !this.state.dark})
      } 
    

    render() {
        return (
            <div className={this.state.dark ? 'network-dark' : 'network-light'}>
              <div className="content">
                
                <h1>Network Dashboard</h1>
                <hr></hr>
                <h2>Summary</h2>
                <hr></hr>
                
                <SummaryComponent chartData = {this.state.chartData} connectedDevices = {this.state.connectedDevices} />
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
