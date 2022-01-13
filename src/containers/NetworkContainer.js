import React, { Component } from 'react';
import {Grid, Paper, Typography} from "@material-ui/core/";

import SummaryComponent from '../components/SummaryComponent.js';
import DeviceList from '../components/DeviceList.js';
import TotalDataChart from "../components/TotalDataChart";
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';

const URL = 'wss://network-sim.fraserkeir.com';

class NetworkContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          chartData: [['Time', 'Upload Mbps', 'Download Mbps'], [0,0,0]],
          connectedDevices: 0,
          combinedUploadSpeed: 0,
          combinedDownloadSpeed: 0,
          devices: [],
          connectedWebsocket: false,
          ws: null,
          about: false,
        };
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
      let completeChartData = [['Time', 'Upload Mbps', 'Download Mbps']]
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
            <Grid item xs = {12} sm = {8} md={8}>
              <Paper
              elevation={0}
              style = {{
                border: '5px transparent',
                background: 'linear-gradient(to right, red, purple)',
                zIndex: '-1',
                padding: '5px',
                height: "250px",
              }}
              >
                <Paper
                style = {{
                  height: "240px"
                }}
                >
                
                <Typography
                style={{
                  paddingTop: '5px',
                  paddingLeft: '10px'
                  
                }}
                >Total Uploads/Downloads</Typography> 
                <TotalDataChart
                chartData = {this.state.chartData} 
                darkState = {this.props.darkState}
                />
                </Paper>  
              </Paper>
            </Grid>
              
            <Grid 
            item xs={12} sm={4} md={4} 
            >
              <Paper
              elevation={0}
              style = {{
                height: '100%',
                minHeight: '150px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '5px transparent',
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
                    // height: "391px"
                  }}
                  >
                  {/* <Typography>Devices</Typography> */}
                  <Paper
                  style = {{
                    padding: '10px',
                    minHeight: "381px"
                  }}
                  >
                  {
                  !this.state.devices.length ? 
                  <Container>
                  <Typography style = {{
                    paddingTop: '10px'
                  }}>
                  Welcome to the dashNet Networking Panel. Originally, this app used a websocket to connect to a remote server that created sample data that was rendered in real time on the dashboard.
                  </Typography>
                  <Typography style = {{
                    paddingTop: '10px',
                    paddingBottom: '10px'
                  }}>
                  Sadly, this server is no longer online, but you can still view the front end application by clicking below.
                  </Typography>
                  <Button 
                  variant='outlined' 
                  size="small"
                  onClick={() => this.createSampleData()}>View sample data
                  </Button>
                  </Container>
                  :
                  <DeviceList
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
        time_stamp: "2020-07-31 10:00:00.976715",
        upload_speed: 18,
        download_speed: 50,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:01:35.976715",
        upload_speed: 9,
        download_speed: 38,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:02:35.976715",
        upload_speed: 14,
        download_speed: 45,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:03:35.976715",
        upload_speed: 11,
        download_speed: 37,
        active_connection: true
      }, 
      {
        time_stamp: "2020-07-31 10:04:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      }, 
      {
        time_stamp: "2020-07-31 10:05:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:05:35.976715",
        upload_speed: 17,
        download_speed: 47,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:06:35.976715",
        upload_speed: 14,
        download_speed: 46,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:07:35.976715",
        upload_speed: 19,
        download_speed: 56,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:08:35.976715",
        upload_speed: 13,
        download_speed: 48,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:09:35.976715",
        upload_speed: 14,
        download_speed: 59,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:10:35.976715",
        upload_speed: 10,
        download_speed: 54,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:11:35.976715",
        upload_speed: 7,
        download_speed: 44,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:12:35.976715",
        upload_speed: 9,
        download_speed: 28,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:13:35.976715",
        upload_speed: 6,
        download_speed: 25,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:13:35.976715",
        upload_speed: 10,
        download_speed: 29,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:14:35.976715",
        upload_speed: 13,
        download_speed: 38,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:15:35.976715",
        upload_speed: 17,
        download_speed: 49,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:16:35.976715",
        upload_speed: 19,
        download_speed: 54,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:17:35.976715",
        upload_speed: 20,
        download_speed: 57,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:18:35.976715",
        upload_speed: 18,
        download_speed: 50,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:19:35.976715",
        upload_speed: 16,
        download_speed: 49,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:20:35.976715",
        upload_speed: 18,
        download_speed: 54,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:21:35.976715",
        upload_speed: 14,
        download_speed: 45,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:22:35.976715",
        upload_speed: 13,
        download_speed: 44,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:23:35.976715",
        upload_speed: 12,
        download_speed: 40,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:24:35.976715",
        upload_speed: 12,
        download_speed: 45,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:25:35.976715",
        upload_speed: 9,
        download_speed: 33,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:26:35.976715",
        upload_speed: 5,
        download_speed: 29,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:27:35.976715",
        upload_speed: 9,
        download_speed: 28,
        active_connection: true
      },
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
        time_stamp: "2020-07-31 10:00:00.976715",
        upload_speed: 4,
        download_speed: 27,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:01:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:02:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:03:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      }, 
      {
        time_stamp: "2020-07-31 10:04:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      }, 
      {
        time_stamp: "2020-07-31 10:05:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:05:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:06:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:07:35.976715",
        upload_speed: 4,
        download_speed: 27,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:08:35.976715",
        upload_speed: 3,
        download_speed: 24,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:09:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:10:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:11:35.976715",
        upload_speed: 2,
        download_speed: 21,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:12:35.976715",
        upload_speed: 4,
        download_speed: 23,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:13:35.976715",
        upload_speed: 6,
        download_speed: 26,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:13:35.976715",
        upload_speed: 7,
        download_speed: 27,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:14:35.976715",
        upload_speed: 6,
        download_speed: 26,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:15:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:16:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:17:35.976715",
        upload_speed: 5,
        download_speed: 34,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:18:35.976715",
        upload_speed: 4,
        download_speed: 32,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:19:35.976715",
        upload_speed: 4,
        download_speed: 29,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:20:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:21:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:22:35.976715",
        upload_speed: 6,
        download_speed: 23,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:23:35.976715",
        upload_speed: 5,
        download_speed: 26,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:24:35.976715",
        upload_speed: 5,
        download_speed: 30,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:25:35.976715",
        upload_speed: 6,
        download_speed: 33,
        active_connection: true
      },
      {
        time_stamp: "2020-07-31 10:26:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
      {
        time_stamp: "2020-07-31 10:27:35.976715",
        upload_speed: 0,
        download_speed: 0,
        active_connection: false
      },
    ]
  }
]

export default NetworkContainer;
