import { Form, Input, Button, Select } from "antd";
import { Component } from "react";
import github from "../assests/github.png";
// import Github from "../assests/github.pnj";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

class SignUp extends Component {
  render() {
    return (
      <div className="container">
        <div className="center">
          <Form {...layout} name="control-hooks">
            <Form.Item name="Email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                id="github"
                type="Default"
                shape="round"
                htmlType="submit"
              >
                <a href="https://github.com/login/oauth/authorize?&client_id=Iv1.f50a9e441abc37c0">
                  Sign In with Github <i class="fab fa-github"></i>
                </a>
              </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" shape="round" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
// const JobsForm = () => {

// };
export default SignUp;
