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
  const handleSubmit = (e) => {
    const data = { name: name, type: type, relation: relation };
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    form.resetFields();
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
