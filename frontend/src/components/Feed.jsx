import React, { Component } from "react";
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
              <Typography.Text></Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
