import React, { Component } from "react";
import Jobs from "./Jobs";
import Deploys from "./Deploys";
import { Row, Col } from "antd";
import Environment from "./Environment";
import Feed from "./Feed";
import axios from "axios";

export default class Home extends Component {
  state = {
    list: [
    ],
    is_authicate:false
  };  

  render() {
    return (
      <div>
        <Row className="container">
          <Col xs={24} sm={24} md={8} lg={8} xl={7}>
            <Jobs list={this.state.list} />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={10}>
            <Deploys list={this.state.list} />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={7}>
            <Environment list={this.state.list} />
          </Col>
        </Row>
        <Feed list={this.state.list} />
      </div>
    );
  }
}
