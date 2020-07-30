import React, { Component } from 'react';
import SummaryComponent from '../components/SummaryComponent.js';
import DeviceList from '../components/DeviceList.js';
import TotalDataChart from "../components/TotalDataChart";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';


const URL = 'wss://network-sim.fraserkeir.com';

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
        this.createSampleData = this.createSampleData.bind(this);
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
      let completeChartData = [['Time', 'Upload Mbs', 'Download Mbs']]
        for (let counter = 0; counter < this.state.devices[0].snap_shots.length; counter ++) {
          let newChartData = []
          let completeTimeString = this.state.devices[0].snap_shots[counter].time_stamp
          console.log(completeTimeString);
          let formattedTimeString = completeTimeString.slice(11, 16)
          console.log(formattedTimeString)
          let uploadTotal = 0
          let downloadTotal = 0
          this.state.devices.forEach(device => {
            uploadTotal += device.snap_shots[counter].upload_speed
            downloadTotal += device.snap_shots[counter].download_speed
          })
          newChartData.push(formattedTimeString, uploadTotal, downloadTotal)
          completeChartData.push(newChartData)
       }
       this.setState({chartData: completeChartData})
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

    createSampleData(event) {
        this.setState({
          devices: sampleData
        }, () => {
        this.countConnectedDevices();
        this.countUploadSpeed();
        this.countDownloadSpeed();
        this.chartDataMapping();
        });
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
                  style = {{
                    border: '5px transparent',
                    // borderRadius: '10px',
                    background: 'linear-gradient(to right, red, purple)',
                    zIndex: '-1',
                    padding: '5px',
                    height: "210px"
                  }}
                  >
                  <Paper
                  style = {{
                    height: "200px"
                  }}>
                  <TotalDataChart
                  chartData = {this.state.chartData} 
                  darkState = {this.props.darkState}
                  />
                  </Paper>  
                  </Paper>
                </Grid>
                  
                <Grid 
                item xs={12} 
                item sm={4} 
                item md={4} 
                >
                  <Paper
                  elevation={0}
                  style = {{
                    height: '100%',
                    minHeight: '150px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '5px transparent',
                    // borderRadius: '10px',
                    background: 'linear-gradient(to right, red, purple)',
                    zIndex: '-1',
                    padding: '5px',
                    
                  }}
                  >
                    <Paper
                    style = {{
                      height: '100%',                      
                    }}>
                  <SummaryComponent 
                  chartData = {this.state.chartData}
                  connectedDevices = {this.state.connectedDevices} 
                  uploadSpeed = {this.state.combinedUploadSpeed}
                  downloadSpeed = {this.state.combinedDownloadSpeed}
                  />
                  </Paper>
                  </Paper>
                </Grid> 

                <Grid item xs = {12}> 
                  <Paper
                  elevation={0}
                  style = {{
                    border: '5px transparent',
                    // borderRadius: '10px',
                    background: 'linear-gradient(to right, red, purple)',
                    zIndex: '-1',
                    padding: '5px',
                    height: "316px"
                  }}
                  >
                  {/* <Typography>Devices</Typography> */}
                  <Paper
                  style = {{
                    padding: '10px',
                    height: "306px"
                  }}
                  >
                  {
                  !this.state.devices.length ? 
                  <Container>
                  <Typography>
                  Welcome to the dashNet Networking Panel. This app emulates a network and devices that connect to it, rendering in real time by collecting data from a seperate server that creates network data every minute. If you are seeing this message, the server is down for maintenance. Click below to view sample data until the server is back online.
                  </Typography>
                  <Button 
                  variant='outlined' 
                  size="small"
                  onClick={() => this.createSampleData()}>View sample data
                  </Button>
                  </Container>
                  :<DeviceList
                    devices={this.state.devices}
                    darkState = {this.props.darkState} 
                  />}
                  
                  </Paper>
                  </Paper> 
                  </Grid>   
              </Grid>
        )
    }
}

const sampleData = [
  {
    id: 1,
    host_name: "Andrew's Laptop",
    device_type: "PC",
    operating_system: "OSx",
    mac_address: "82:0f:0c:79:5d:69" ,
    ip_address: "192.168.1.23",
    snap_shots: [
      {
        time_stamp: "2018-01-12 11:59:35.976715",
        upload_speed: 23,
        download_speed: 7,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:14:35.976715",
        upload_speed: 14,
        download_speed: 2,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:29:35.976715",
        upload_speed: 17,
        download_speed: 3,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:29:35.976715",
        upload_speed: 17,
        download_speed: 3,
        active_connection: true
      }, 
      {
        time_stamp: "2018-01-12 12:29:35.976715",
        upload_speed: 17,
        download_speed: 3,
        active_connection: true
      }, 
      {
        time_stamp: "2018-01-12 12:29:35.976715",
        upload_speed: 17,
        download_speed: 3,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:29:35.976715",
        upload_speed: 17,
        download_speed: 3,
        active_connection: true
      }
    ]
  },
  {
    id: 2,
    host_name: "Jerry's Phone",
    device_type: "Phone",
    operating_system: "iOS10",
    mac_address: "82:0f:0c:79:5d:69" ,
    ip_address: "192.168.1.23",
    snap_shots: [
      {
        time_stamp: "2018-01-12 11:59:35.976715",
        upload_speed: 45,
        download_speed: 12,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:14:35.976715",
        upload_speed: 28,
        download_speed: 9,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:29:35.976715",
        upload_speed: 25,
        download_speed: 7,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:14:35.976715",
        upload_speed: 28,
        download_speed: 9,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:14:35.976715",
        upload_speed: 28,
        download_speed: 9,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:14:35.976715",
        upload_speed: 28,
        download_speed: 9,
        active_connection: true
      },
      {
        time_stamp: "2018-01-12 12:14:35.976715",
        upload_speed: 28,
        download_speed: 9,
        active_connection: true
      },
    ]
  }
]

export default NetworkContainer;
