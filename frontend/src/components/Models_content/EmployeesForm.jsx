import { Form, Input, Button, Select } from "antd";
import React, { useState } from "react";
import axios from "axios";
const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

const EmployeesForm = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [env1, setEnv1] = useState("");
  const [env2, setEnv2] = useState("");
  const handleSubmit = (e) => {
    const data = { name: name, type: type, env1: env1, env2: env2 };
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    console.log(data);
    // console.log(name, type, env1, env2);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onSubmitCapture={handleSubmit}
      {...layout}
      name="control-hooks"
    >
      <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
        <Input onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
        <Input onChange={(e) => setType(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="Environment"
        label="Environment"
        rules={[{ required: true }]}
      >
        <Select onChange={(e) => setEnv1(e)} placeholder="Select a option ">
          <Option value="env 1">env 1</Option>
          <Option value="env 2">env 2</Option>
          <Option value="env 3">env 3</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="Environment"
        label="Environment"
        rules={[{ required: true }]}
      >
        <Select onChange={(e) => setEnv2(e)} placeholder="Select a option ">
          <Option value="env 1">env 1</Option>
          <Option value="env 2">env 2</Option>
          <Option value="env 3">env 3</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EmployeesForm;
