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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Card from "./components/Card";
import GithubOAuth from './components/GithubOauth'
import SalesforceDashboard from "./components/SalesforceDashboard"
// import Detail from "./components/Models_content/detail";
// import axios from "axios";
import api from "./stripe_api";
import axios from "axios";

const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key));
var forcetk = window.forcetk;

export default class App extends Component {
	
	componentDidUpdate() {
		console.log("chla");
	}
	
    render() {
	return ( 
        <div className = "App" >
			<Router>
            	<Navbar / >
              	<Switch >
					<Route path = "/" exact component = { Home } />	
					<Route path = "/accounts/auth/github/" component = { GithubOAuth } /> 
					<Route path = "/Card" component = { Card } >
						<Elements stripe = { stripePromise } >
						<Card / >
						</Elements> 
                	</Route > 
					<Route path = "/SalesforceDashboard" component = { SalesforceDashboard } /> 
					<Route path = "/SignIn" component = { SignIn } /> 
					<Route path = "/SignUp" component = { SignUp } />  
					{/* < Route path = "/Detail" component = { Detail } /> */}
				</Switch>
			</Router> 
		</div >
    );
	}
}
// export default App;