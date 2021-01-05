import React, { Component } from "react";
import { List, Typography } from "antd";
import JobsModal from "./Models_content/JobsModal";
export default class Jobs extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="my-flex">
          <h1>Jobs</h1>
          <h1>
            <JobsModal />
          </h1>
        </div>
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
