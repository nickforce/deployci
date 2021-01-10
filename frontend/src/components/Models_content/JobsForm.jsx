import { Alert, Spin, Form, Input, Button, Select } from "antd";
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
  const [message, setMessage] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [spin, setSpin] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [relation, setRelation] = useState("");
<<<<<<< HEAD
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
=======
>>>>>>> 2b90ee38c1317876e1236bf4dd2601354a46eb3e

  const handleSubmit = (e) => {
    setSpin(true);
    const data = { name: name, type: type, deploy: relation };
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, data)
      .then((response) => {
        setIsSuccessed(true);
        form.resetFields();
        setSpin(false);
      })
      .catch((error) => {
        setMessage(JSON.stringify(error.message));
        setIsFailed(true);
        console.log(error);
      });
  };
  const handleSelect = (e) => {
    setRelation(e);
  };
  return (
    <Spin spinning={spin} tip="Please Wait ...">
      {isSuccessed && (
        <Alert
          className="w-alert"
          message="Successfully Submitted"
          type="success"
          showIcon
        />
      )}
      {isFailed && (
        <Alert
          className="w-alert"
          message={message}
          type="warning"
          showIcon
          closable
        />
      )}
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
        <Form.Item
          name="Relation"
          label="Relation"
          rules={[{ required: true }]}
        >
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
    </Spin>
  );
};
export default JobsForm;
