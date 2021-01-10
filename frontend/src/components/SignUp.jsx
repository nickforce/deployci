import { Form, Input, Button, Alert } from "antd";
import React, { Component, useState } from "react";
import axios from "axios";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

const SignUp = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [form] = Form.useForm();
  const handleSubmit = (e) => {
    if (password === confirmPassword) {
      setIsAlert(false);
      const data = {
        username: name,
        email: email,
        password1: password,
        password2: confirmPassword,
      };
      axios
        .post("http://localhost:8000/dj-rest-auth/registration/", data)
        .then((response) => {
          // console.log(response.data.key);
          localStorage.setItem("signUp-key", response.data.key);
          const key = localStorage.getItem("signUp-key");
          console.log(key);
          form.resetFields();
          console.log("submitted");
        })
        .catch((error) => console.log(error.message));
    } else {
      e.preventDefault();
      setIsAlert(true);
      console.log("dismissed");
    }
    // console.log(name, email, password);
  };

  // console.log(this.props);
  return (
    <div className="container">
      <div className="center">
        {/*  */}

        <Form
          form={form}
          id="sign-up"
          onSubmitCapture={handleSubmit}
          {...layout}
          name="control-hooks"
        >
          {isAlert && (
            <Alert
              className="w-alert"
              message="check password and confirm password"
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
            rules={[{ required: true, message: "Please input your password!" }]}
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
            <Button id="github" type="Default" shape="round" htmlType="button">
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
      </div>
    </div>
  );
};

export default SignUp;
