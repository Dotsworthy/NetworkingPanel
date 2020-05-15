import React, {Component } from 'react';
import NetworkContainer from './containers/NetworkContainer.js';
import './styles/App.scss';
// import openSocket from 'socket.io-client'

class App extends Component {
  render() {
    return(
      <div className="App">
        <NetworkContainer />
        </div> 
    ); 
  }
}

export default App;
