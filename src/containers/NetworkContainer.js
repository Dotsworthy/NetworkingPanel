import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js';
import DeviceList from '../components/DeviceList.js';

const URL = 'ws://localhost:5001';

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

  ws = new WebSocket(URL)  

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving data from server, update devices
      let deviceData = JSON.parse(evt.data)
      this.setState({
        devices: deviceData})
      this.chartDataMapping()
      this.countConnectedDevices()
      this.countUploadSpeed()
      this.countDownloadSpeed()
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }

}

  componentWillRecieveProps() {
    this.ws.onmessage = evt => {
      // on receiving data from server, update devices
      let deviceData = JSON.parse(evt.data)
      this.setState({
        devices: deviceData})
        this.chartDataMapping()
        this.countConnectedDevices()
        this.countUploadSpeed()
        this.countDownloadSpeed() 
        console.log("newData")
    }
  }

  // this needs to go off snapshots instead of devices?

  chartDataMapping() { 
    this.state.chartData = [['Time', 'Upload Mbs', 'Download Mbs']]
    console.log(this.state.chartData)
    let newChartData = []
    let completeTimeString = ''
    let formattedTimeString = ''
    let uploadTotal = 0
    let downloadTotal = 0
    for (let counter = 0; counter < this.state.devices[0].snap_shots.length; counter ++) {
      console.log("newData")
      console.log(counter)
      this.state.devices.forEach(device => {
        // completeTimeString = device.snap_shots[counter].time_stamp
        // formattedTimeString = completeTimeString.slice(11, 16)
        uploadTotal += device.snap_shots[counter].upload_speed
        downloadTotal += device.snap_shots[counter].download_speed
      })
      // newChartData.push(formattedTimeString)
      newChartData.push('')
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
        let element = document.body;
        element.classList.toggle("dark");
      } 
  
    

    render() {
        return (
            <div>
              
             <div className="app-container"> 
                
                <div className="title-bar-container">
                <h1>Network Dashboard</h1>
                
                  <div className="light-dark-container">
                  <input onClick={(event) => this.toggleMode(event)} className="container_toggle" type="checkbox" id="switch" name="mode"></input>
                  <label id="switch">Toggle Light/Dark</label>
                  </div>
                </div>
                
                <div className="content-container">

                  <div className={this.state.dark ? "summary-container-dark" : "summary-container"}>
                  <h2 className={this.state.dark ? "dark" : "" }>Summary</h2>
                  <SummaryComponent 
                  chartData = {this.state.chartData} 
                  connectedDevices = {this.state.connectedDevices} 
                  uploadSpeed = {this.state.combinedUploadSpeed}
                  downloadSpeed = {this.state.combinedDownloadSpeed}
                  dark = {this.state.dark}  
                  />
                  </div>

                  <div className={this.state.dark ? "device-container-dark" : "device-container"}>
                  <h2 className={this.state.dark ? "dark" : "" }>Devices</h2>
                  <DeviceList devices={this.state.devices}/>
                  </div>         
                
                </div>   
              
              </div>
            </div>
        )
    }
}

export default NetworkContainer;
