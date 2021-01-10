import { Spin, Form, Input, Button, Alert } from "antd";
import React, { Component, useState } from "react";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();
  const handleSubmit = (e) => {
    if (password.length >= 8 && confirmPassword.length >= 8) {
      if (password === confirmPassword) {
        setSpin(true);
        setIsFailed(false);
        const data = {
          username: name,
          email: email,
          password1: password,
          password2: confirmPassword,
        };
        axios
          .post("http://localhost:8000/dj-rest-auth/registration/", data)
          .then((response) => {
            localStorage.setItem("signUp-key", response.data.key);
            const key = localStorage.getItem("signUp-key");
            form.resetFields();
            setIsSuccessed(true);
            setSpin(false);
            props.history.push("/");
          })
          .catch((error) => {
            setMessage(JSON.stringify(error.message));
            setIsFailed(true);
            setSpin(false);
          });
      } else {
        e.preventDefault();
        setMessage("password and confirm password must be equal");
        setIsFailed(true);
      }
    } else {
      setIsFailed(true);
      setMessage("password has at least 8 characters");
    }
  };

  return (
    <div className="container">
      <div className="center">
        <Spin spinning={spin} tip="Please Wait ...">
          <Form
            form={form}
            id="sign-up"
            onSubmitCapture={handleSubmit}
            {...layout}
            name="control-hooks"
          >
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

            <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item name="Email" label="Email" rules={[{ required: true }]}>
              <Input onChange={(e) => setEmail(e.target.value)} />
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
            <Form.Item
              label="Confirm Password"
              name="Confirm-password"
              rules={[
                { required: true, message: "Please input confirm password!" },
              ]}
            >
              <Input.Password
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                id="github"
                type="Default"
                shape="round"
                htmlType="button"
              >
                <a href="https://github.com/login/oauth/authorize?&client_id=Iv1.f50a9e441abc37c0">
                  Sign Up with Github <i class="fab fa-github"></i>
                </a>
              </Button>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" shape="round" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default SignUp;
