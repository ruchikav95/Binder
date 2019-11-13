import React, { Component } from "react";
import Navbar from "./components/Navbar";
import WrappedRegistrationForm from "./components/Form"
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <WrappedRegistrationForm />
      </React.Fragment>
    );
  }
}

export default App;
