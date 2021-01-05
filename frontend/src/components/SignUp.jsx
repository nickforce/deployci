import { Form, Input, Button, Space } from "antd";
import { Component } from "react";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

const SignUp = () => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className="container">
      <div className="center">
        <Form {...layout} name="control-hooks">
          <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="Confirm-password"
            rules={[
              { required: true, message: "Please input confirm password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button id="github" type="Default" shape="round" htmlType="submit">
              <a href="https://github.com/login/oauth/authorize?&client_id=Iv1.f50a9e441abc37c0">
                Sign Up with Github <i class="fab fa-github"></i>
              </a>
            </Button>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" shape="round" htmlType="submit">
              Register
            </Button>
            {/* <Button
              htmlType="reset"
              type="default"
              shape="round"
              onClick={onReset}
            >
              Reset
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

// const JobsForm = () => {

// };
export default SignUp;
