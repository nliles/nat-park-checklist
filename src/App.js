import React, { Component } from 'react';
import './App.css';
import ParkContainer from './components/ParkContainer';

class App extends Component {
  render() {
    return (
      <div className="container">
        <ParkContainer/>
      </div>
    );
  }
}

export default App;
