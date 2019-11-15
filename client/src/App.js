import React, { Component } from "react";
import Navbar from "./components/Navbar";
import WrappedRegistrationForm from "./components/Form"
import Word from "./components/Word"

import Footer from "./components/Footer"
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />

        <Word />
        <WrappedRegistrationForm />
        <Footer />

      </React.Fragment>
    );
  }
}

export default App;
