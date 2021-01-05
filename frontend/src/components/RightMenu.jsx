import React, { Component } from "react";
import { Menu, Button } from "antd";
import { NavLink } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class RightMenu extends Component {
  render() {
    console.log(this.props);
    return (
      <Menu mode={this.props.mode}>
        <Menu.Item key="/SignIn">
          <NavLink to="/SignIn"> Sign In </NavLink>
        </Menu.Item>

        <Menu.Item key="app">
          <NavLink to="/SignUp"> Sign Up </NavLink>
        </Menu.Item>
        <Menu.Item key="log">
          <Button type="default" htmlType="button" shape="round">
            Log Out
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}
export default RightMenu;
