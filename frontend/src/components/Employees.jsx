import React, { Component } from "react";
import { List, Typography } from "antd";
import EmployeesModal from "./Models_content/EmployeeModal";
import MyModal from "./Models_content/modal";

export default class Employees extends Component {
  render() {
    return (
      <div>
        <div className="employees my-flex">
          <h1>Deploys</h1>
          <h1>
            {/* <EmployeesModal /> */}
            <MyModal />
          </h1>
        </div>
        <List
          className="employees"
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
