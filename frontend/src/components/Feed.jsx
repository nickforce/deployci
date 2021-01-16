import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { List, Typography } from "antd";

const { Title } = Typography;
export default class Feed extends Component {
  render() {
    return (
      <div className=" feed container">
        <Title>Feed</Title>
        <List
          bordered
          dataSource={this.props.list}
          renderItem={(item) => (
            <List.Item>
              {/* <NavLink to="/Detail"> */}
                <Typography.Text>{item}</Typography.Text>
              {/* </NavLink> */}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
