import { Form, Input, Button, Select } from "antd";
import React, { useState } from "react";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

const JobsForm = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [relation, setRelation] = useState("");
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Token 534e3c7926e61695de705b3bffaf34625ec9f9a5"
  );
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ name: "usma", type: "werew", deploy: 2 });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const handleSubmit = (e) => {
    const loginKey = localStorage.getItem("login-key");
    const SignUpKey = localStorage.getItem("signUp-key");
    // var data = JSON.stringify({ name: name, type: type });
    // const data = { name: name, type: type, deploy: relation };
    fetch("http://localhost:8000/ci/cijobs/create/", requestOptions)
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
    // const data = { name: name, type: type, deploy: relation };
    // axios
    //   .post(`https://jsonplaceholder.typicode.com/posts`, data)
    //   .then((response) => {
    //     console.log(response);
    //     form.resetFields();
    //   })
    //   .catch((error) => console.log(error));
  };
  const handleSelect = (e) => {
    setRelation(e);
  };
  return (
    <Form
      onSubmitCapture={handleSubmit}
      {...layout}
      form={form}
      name="control-hooks"
    >
      <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
        <Input onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
        <Input onChange={(e) => setType(e.target.value)} />
      </Form.Item>
      <Form.Item name="Relation" label="Relation" rules={[{ required: true }]}>
        <Select onChange={handleSelect} placeholder="Select a option ">
          <Option value="relation 1">Relation 1</Option>
          <Option value="relation 2">Relation 2</Option>
          <Option value="relation 3">Relation 3</Option>
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
export default JobsForm;
