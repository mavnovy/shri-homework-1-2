import React, { Component } from 'react';
import logo from './logoTouch.svg';
import './App.css';

class AppTouch extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default AppTouch;
