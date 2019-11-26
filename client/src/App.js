import React, { Component } from 'react';
import './App.css';import Navbar from './Components/Layout/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './Components/Layout/Footer';
import Home from './Components/Layout/Home';
import Social from './Components/social/Social';

class App extends Component {  
  constructor(props) {    
    super(props);    
    this.state = {}    
    this.connecToServer = this.connecToServer.bind(this);  
  }
  connecToServer() {    fetch('/');  }
  componentDidMount() {    this.connecToServer();  }
  render() {    
    return (      
    <Router>      
      <div className="container">         
      <Navbar />         
      <Route exact path="/" component={Home} />         
      <Route exact path="/social" component={Social} />        
       <Footer />      </div>      
       </Router>    
       );  
      }}
      export default App;