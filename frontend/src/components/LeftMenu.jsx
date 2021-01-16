import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
class LeftMenu extends Component {
  render() {
    return (
      <Menu mode={this.props.mode}>
        <Menu.Item key="mail">
          <NavLink to="/About"> About </NavLink>
        </Menu.Item>


        <Menu.Item key="alipay">
          <NavLink to="/ContactUs"> Contact Us </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
