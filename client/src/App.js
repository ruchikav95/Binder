import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <AppHeader />
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Welcome to React</h2>
        </div>
        <AppContent />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;