import { Spin, Form, Input, Button, Alert } from "antd";
import React, { Component, useEffect ,  useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";



const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};

const SignUp = (props) => {

  useEffect(() =>{
    const token = localStorage.getItem("access_token");
    const data = {
      token: token
    };
    axios
      .post("http://localhost:8000/dj-rest-auth/token/verify/", data)
      .then((response) => {
        // console.log(response);
        // localStorage.setItem("access_token", response.data.access_token);
        // localStorage.setItem("refresh_token", response.data.refresh_token);
        // // const key = localStorage.getItem("login-key");
        // setSpin(false);
        // setIsSuccessed(true);
        // form.resetFields();
        props.history.push("/");
        // window.location="/"
       })
      .catch((error) => {
        setIsFailed(true);
        console.log(error);
        setMessage(JSON.stringify("please Signup here"));
        setSpin(false);
      });
  
  } , [])





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
    // if (password.length >= 8 && confirmPassword.length >= 8) {
      // if (password === confirmPassword) {
        setSpin(true);
        // setIsFailed(false);
        const data = {
          username: name,
          email: email,
          password1: password,
          password2: confirmPassword,
        };
        axios
          .post("http://localhost:8000/dj-rest-auth/registration/", data)
          .then((response) => {
            // localStorage.setItem("signUp-key", response.data.key);
            // const key = localStorage.getItem("signUp-key");
            form.resetFields();
            setIsSuccessed(true);
            setSpin(false);
            props.history.push("/SignIn");
            // <Redirect to="" />
            // console.log("oooooooooooooooooooo");

          })
          .catch((error) => {
            // console.log(error.response.data);
            setMessage(JSON.stringify(error.response.data));
            setIsFailed(true);
            setSpin(false);
          });
      } 
    
 
  return (
    <div className="container">
    <div className="center" >
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
