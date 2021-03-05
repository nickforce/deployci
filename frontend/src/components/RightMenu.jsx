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
 

  state ={
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
      .post(`https://www.nickjohnson.cloud/dj-rest-auth/token/verify/`, 
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


{ !this.state.is_authenticated && (

<>

        <Menu.Item key="/SignIn">
          <NavLink  to="/SignIn"
           > Sign In </NavLink>
        </Menu.Item>

        <Menu.Item key="app">
          <NavLink to="/SignUp"> Sign Up </NavLink>
        </Menu.Item>

</>

)}

{ this.state.is_authenticated && (
        <Menu.Item key="log">
          <NavLink to="/Signin" onClick={(e)=>{localStorage.clear();
  this.setState({is_authenticated:false})}}  >Log out</NavLink>
        
        </Menu.Item>
)}

</Menu>
    );
  }
}
export default RightMenu;
