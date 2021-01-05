import React, { Component } from "react";
import { List, Typography, Row, Col } from "antd";
import EnvoirmentModal from "./Models_content/EnvoirmentModal";
export default class Envoirment extends Component {
  render() {
    return (
      <div>
        <div className="my-flex">
          <h1>Envoirment</h1>
          <h1>
            <EnvoirmentModal />
          </h1>
        </div>

        <List
          className="envoirment"
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
