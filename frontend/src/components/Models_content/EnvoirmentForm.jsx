import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

const EnvoirmentForm = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    const data = { name: name, type: type, url: url };
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    console.log(data);
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      onSubmitCapture={handleSubmit}
      form={form}
      name="control-hooks"
    >
      <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
        <Input
          placeholder="please enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
        <Input
          placeholder="please enter GitHub repo"
          onChange={(e) => setType(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="Url" label="Url" rules={[{ required: true }]}>
        {/* <Input
          id="url"
          addonBefore={selectBefore}
          addonAfter={selectAfter}
          placeholder="Enter website Name"
          onChange={(e) => console.log(e)}
        /> */}
        <Input
          placeholder="enter your website url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EnvoirmentForm;
