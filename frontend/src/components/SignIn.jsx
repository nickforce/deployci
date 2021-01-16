import { Alert, Spin, Form, Input, Button, Select } from "antd";
import { useEffect, useState } from "react";
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
      email: username,
      password: password,
    };
    axios
      .post("http://localhost:8000/dj-rest-auth/login/", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        // const key = localStorage.getItem("login-key");
        setSpin(false);
        form.resetFields();
        window.location="/"
        
       })
      .catch((error) => {
        setIsFailed(true);
        console.log(error);
        setMessage(JSON.stringify(error.response.data));
        setSpin(false);
      });


  
  };
 
  return (
    <div className="container">
      <div className="center" >
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
                id="github"
                type="Default"
                shape="round"
                htmlType="button"
              >
                <a href="https://github.com/login/oauth/authorize?client_id=d2e1901c86b791f237f9&scope=repo">
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
        </Spin>
      </div>
    </div>
  );
};
// const JobsForm = () => {

// };
export default SignUp;
