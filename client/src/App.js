import React, { Component } from "react";
import Navbar from "./components/Navbar";
import NormalLoginForm from "./components/Form";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <NormalLoginForm />
      </React.Fragment>
    );
  }
}

export default App;
