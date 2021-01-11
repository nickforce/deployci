import { Alert, Form, Input, Button, Select, Spin } from "antd";
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
  const [message, setMessage] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [spin, setSpin] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    setSpin(true);
    const data = { name: name, type: type, url: url };
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, data)
      .then((response) => {
        setIsSuccessed(true);
        form.resetFields();
        setSpin(false);
        setTimeout(() => {
          setIsSuccessed(false);
        }, 2000);
      })
      .catch((error) => {
        setMessage(JSON.stringify(error.message));
        setIsFailed(true);
        setTimeout(() => {
          setIsFailed(false);
        }, 2000);
      });
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
    </Spin>
  );
};
export default EnvoirmentForm;
