import { browserHistory } from 'react-router';
import React, { Component } from "react";
import { Menu, Button } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {Link , Redirect } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// const handel
class RightMenu extends Component {
	state = {
		is_authenticated:false, 
      	redirect:false,
      	isChanged : false
    }
   	handleChange = (e) => {
		console.log('changed' , e);
	}
	   
  	componentDidMount() {
    
    	const token = localStorage.getItem("access_token")
      	axios
      	.post(`http://localhost:8000/dj-rest-auth/token/verify/`, 
        {
              "token": token 
        }
       	,)
      	.then((response) => {
        	localStorage.getItem("access_token");
       		this.setState({is_authenticated:true})
      	})
      	.catch((error) => {
        	console.log(error , 'oooooooooooooo');
        	this.setState({is_authenticated:false})
        	// this.handleLogout()
      	});
	}

  	componentDidUpdate =() => {
    	console.log('updated');
	}
	  
      

  	render() { 
    	console.log(this.state.is_authenticated);
    	return (
		<Menu mode={this.props.mode}>
			<Menu.Item key="card">
          		<NavLink to="/card"> card </NavLink>
        	</Menu.Item>

        	<Menu.Item key="salesforce">
          		<NavLink to="/salesforcedashboard"> login with salesforce </NavLink>
        	</Menu.Item>
			{ !this.state.is_authenticated && (
			<>
			<Menu.Item key="/SignIn">
				<NavLink  to="/signin"> log in </NavLink>
			</Menu.Item>
			</>
			)}
			{ this.state.is_authenticated && (
			<>
			<Menu.Item key="log">
				<NavLink to="/Signin" onClick={(e)=>{localStorage.clear();
		this.setState({is_authenticated:false})}} >Log out {this.state.is_authenticated}</NavLink>
				{/* <Button type="default" htmlType="button" shape="round" onClick={this.handleLogout}>	
				</Button> */}
			</Menu.Item>
			</>
			)}
		</Menu>
    );
  }
}
export default RightMenu;
