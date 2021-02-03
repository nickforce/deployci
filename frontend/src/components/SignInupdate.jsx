import { Alert, Spin, Form, Input, Button, Select } from "antd";
import { useState } from "react";
import GoogleIcon from "../assests/google-icon.svg";
import axios from "axios";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

const SignUp = (props) => {
  const [spin, setSpin] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = () => {
    setSpin(true);
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:8000/dj-rest-auth/login/", data)
      .then((response) => {
        localStorage.setItem("login-key", response.data.key);
        const key = localStorage.getItem("login-key");
        setSpin(false);
        setIsSuccessed(true);
        form.resetFields();
        props.history.push("/");
      })
      .catch((error) => {
        setMessage(JSON.stringify(error.message));
        setIsFailed(true);
        setSpin(false);
      });
  };

  return (
    <div className="container">
      <div className="center">
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
        <Spin spinning={spin} tip="Please Wait ...">
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                style={{ width: "auto" }}
                size="large"
                type="default"
                shape=""
                htmlType="button"
              >
                <a href="https://github.com/login/oauth/authorize?&client_id=Iv1.f50a9e441abc37c0">
                  <img
                    style={{
                      width: "14px",
                      height: "auto",
                    }}
                    src={GoogleIcon}
                    alt=""
                  />
                  <span
                    style={{
                      paddingLeft: "20px",
                    }}
                  >
                    Sign in with Google{" "}
                  </span>
                </a>
              </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" shape="round" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
};
// const JobsForm = () => {

// };
export default SignUp;
