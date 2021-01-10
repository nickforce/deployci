import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import axios from "axios";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:8000/dj-rest-auth/login/", data)
      .then((response) => {
        localStorage.setItem("login-key", response.data.key);
        const key = localStorage.getItem("login-key");
        console.log(key);
        form.resetFields();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="center">
        <Form
          form={form}
          onSubmitCapture={handleSubmit}
          {...layout}
          name="control-hooks"
        >
          <Form.Item name="Email" label="Email" rules={[{ required: true }]}>
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button id="github" type="Default" shape="round" htmlType="button">
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
};
// const JobsForm = () => {

// };
export default SignUp;
