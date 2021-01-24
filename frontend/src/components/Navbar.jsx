import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import axios from "axios";
class Navbar extends Component {
  state = {
    current: "mail",
    visible: false,
    isVertical: "vertical",
    isHorizontal: "horizontal",
    is_authenticated:false 
  };


   

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <NavLink to="/"> 
            {/* <img
              alt=""
              src="https://picsum.photos/280/320?random=1"
              width="45"
              height="50"
					  />  */}
            deploy_ci
          </NavLink>
        </div>
        <div className="menuCon">
          {/* <div className="leftMenu">
            <LeftMenu mode={this.state.isHorizontal} />
          </div> */}
          <div className="rightMenu">
            <RightMenu mode={this.state.isHorizontal} />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn"> </span>
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            {/* <LeftMenu mode={this.state.isVertical} /> */}
            <RightMenu mode={this.state.isVertical}    />
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default Navbar;
