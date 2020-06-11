import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js';
import DeviceList from '../components/DeviceList.js';
import TotalDataChart from "../components/TotalDataChart";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';


const URL = 'ws://77.68.23.244:5001';

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [['Time', 'Upload Mbs', 'Download Mbs'], [0,0,0]],
            darkMode: false,
            connectedDevices: 0,
            combinedUploadSpeed: 0,
            combinedDownloadSpeed: 0,
            devices: [],
            connectedWebsocket: false,
            ws: null,
          };
        this.toggleMode = this.toggleMode.bind(this);   
    }

  componentDidMount() {
    this.connectToWebSocket();
  }

  connectToWebSocket() {
    let ws = new WebSocket(URL);
    let connectInterval

    ws.onopen = () => {
      console.log("Connected to Websocket")

      this.setState({ ws: ws})
      clearTimeout(connectInterval)
    }

    ws.onmessage = evt => {
      let deviceData = JSON.parse(evt.data)
      this.setState({
        devices: deviceData}) 
      this.chartDataMapping()
      this.countConnectedDevices()
      this.countUploadSpeed()
      this.countDownloadSpeed()
    }

    ws.onclose = e => {
      console.log(`Socket is closed. Reconnect will be attempted in 30 seconds.`, e.reason)
      
        connectInterval = setTimeout(() => {
          this.checkForWebSocket()
        }, 30000)
      }

     ws.onerror = err => {
      console.error(
         "Socket encountered error: ",
         err.message,
        "Closing socket"
      )

      ws.close();
     }  
      
  }

  checkForWebSocket() {
      if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
        this.connectToWebSocket()
    }
  }
  
  chartDataMapping() { 
    if (this.state.devices.length === 0) {
      return
    } else {
      this.setState({chartData: [['Time', 'Upload Mbs', 'Download Mbs']]})
      for (let counter = 0; counter < this.state.devices[0].snap_shots.length; counter ++) {
        let newChartData = []
        let completeTimeString = this.state.devices[0].snap_shots[counter].time_stamp
        let formattedTimeString = completeTimeString.slice(11, 16)
        let uploadTotal = 0
        let downloadTotal = 0
        this.state.devices.forEach(device => {
          uploadTotal += device.snap_shots[counter].upload_speed
          downloadTotal += device.snap_shots[counter].download_speed
        })
        newChartData.push(formattedTimeString, uploadTotal, downloadTotal)
        this.state.chartData.push(newChartData)
     }    
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

  toggleMode(event) {
    let trans = () => {
      document.documentElement.classList.add('transisition');
                window.setTimeout(() => {
                  document.documentElement.classList.remove('transisition')
                }, 1000)
    }
    if(this.state.darkMode === false) {
      trans()
      document.documentElement.setAttribute('data-theme', 'dark');
      this.setState({darkMode: true})
      
    } else {
      trans()
      document.documentElement.setAttribute('data-theme', 'light')
      this.setState({darkMode: false})
      }
    }
   
    render() {
        return (
         
            <Grid
            container
            direction="row"
            spacing={2}
            >
                <Grid item xs = {12} item sm = {8} item md={8}>
                  <Paper
                  elevation={0}
                  >
                  <TotalDataChart
                  chartData = {this.state.chartData} 
                  darkMode = {this.state.darkMode}
                  />
                  </Paper>
                </Grid>
                  
                <Grid item xs={12} item sm={4} item md={4}>
                  <Paper
                  elevation={0}
                  style = {{
                    height: '100%',
                    minHeight: '150px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >
                    <Container
                    style = {{
                      height: '100%',
                    }}>
                  <SummaryComponent 
                  chartData = {this.state.chartData}
                  connectedDevices = {this.state.connectedDevices} 
                  uploadSpeed = {this.state.combinedUploadSpeed}
                  downloadSpeed = {this.state.combinedDownloadSpeed}
                  />
                  </Container>
                  </Paper>
                </Grid> 

                <Grid item xs = {12}> 
                  <Paper
                  elevation={0}
                  >
                  {/* <Typography>Devices</Typography> */}
                  <DeviceList
                  devices={this.state.devices}
                  />
                  </Paper> 
                  </Grid>   
              </Grid>
        )
    }
}

export default NetworkContainer;
