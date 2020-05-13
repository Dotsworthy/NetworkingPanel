import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js';
import DeviceList from '../components/DeviceList.js';

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [['Time', 'Upload Mbs', 'Download Mbs']],
            dark: false,
            connectedDevices: 0,
            combinedUploadSpeed: 0,
            combinedDownloadSpeed: 0,
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
        this.countUploadSpeed()
        this.countDownloadSpeed()
      })
      .catch(err => console.error); 

  }

  chartDataMapping() {
    let newChartData = []
    let completeTimeString = ''
    let formattedTimeString = ''
    let uploadTotal = 0
    let downloadTotal = 0
    for (let counter = 0; counter < this.state.devices.length; counter ++) {
      this.state.devices.forEach(device => {
        completeTimeString = device.snap_shots[counter].time_stamp
        formattedTimeString = completeTimeString.slice(11, 16)
        uploadTotal += device.snap_shots[counter].upload_speed
        downloadTotal += device.snap_shots[counter].download_speed
      })
      newChartData.push(formattedTimeString)
      newChartData.push(uploadTotal)
      newChartData.push(downloadTotal)
      this.state.chartData.push(newChartData)
      newChartData = []
      uploadTotal = 0
      downloadTotal = 0
      
    }
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

  countUploadSpeed() {
    let counter = 0;
    this.state.devices.forEach(device => {
      counter += device.snap_shots[device.snap_shots.length-1].upload_speed
    })
    this.setState({combinedUploadSpeed: counter})
  }

  countDownloadSpeed() {
    let counter = 0;
    this.state.devices.forEach(device => {
      counter += device.snap_shots[device.snap_shots.length-1].download_speed
    })
    this.setState({combinedDownloadSpeed: counter})
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
            <div className={
              this.state.dark ? (document.body.style.backgroundColor='#1D3354', document.body.style.color='white') 
              : 
              (document.body.style.backgroundColor="#F2F3F4", document.body.style.color="black")}>
              
              <div className="content">
                
                <div id="title-panel">
                <h1>Network Dashboard</h1>
                <div class="container">
                  <h4>Light/Dark Mode</h4>
                  <input onClick={(event) => this.toggleMode(event)} class="container_toggle" type="checkbox" id="switch" name="mode"></input>
                  <label for ="switch">Toggle</label>
                </div>
                </div>

                <div className="row2">

                <div id="summary"> 
                <h2>Summary</h2>
                <SummaryComponent 
                chartData = {this.state.chartData} 
                connectedDevices = {this.state.connectedDevices} 
                uploadSpeed = {this.state.combinedUploadSpeed}
                downloadSpeed = {this.state.combinedDownloadSpeed}  
                />
                </div>

                <div id="devices">
                <h2>Devices</h2>
                <DeviceList devices={this.state.devices}/>
                </div>              
                        
                </div>

                

              </div>

            </div>
        )
    }
}

export default NetworkContainer;
