import React, {Component } from 'react';
import NetworkContainer from './containers/NetworkContainer.js';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className="App">
        <NetworkContainer />
        <p>Hello</p>
        </div> 
    ); 
  }
}

export default App;
