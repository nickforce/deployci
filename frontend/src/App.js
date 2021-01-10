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
import Detail from "./components/Models_content/detail";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/About" component={About} />
            <Route path="/ContactUs" component={ContactUs} /> */}
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Detail" component={Detail} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// export default App;
