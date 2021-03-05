import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CustomOauthComponent from './components/customOauthComponent'

import GithubOAuth from './components/GithubOauth'
// import Detail from "./components/Models_content/detail";
// import axios from "axios";

export default class App extends Component {
   

  state = {
     
    email: "",
    password: "",
    spin : false, 
    isFailed : false, 
    isSuccessed : false, 
    message : ""

  };

  componentDidUpdate(){
    console.log("chla");
  }
  render() {
    return (
      <div className="App">
        <Router>

          <Navbar />
          
          <Switch>
            <Route path="/" exact component={Home} />
             <Route path="/accounts/auth/google/" component={GithubOAuth} />
             <Route path="/accounts/auth/custom/github/" component={CustomOauthComponent} />
             {/* accounts/auth/google */}
              <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} /> 
              {/* <Route path="/Detail" component={Detail} />   */}
          </Switch>
        </Router>
      </div>
    );
  }
}

// export default App;
