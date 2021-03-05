import { Alert, Spin, Form, Input, Button, Select, Card } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import GoogleIcon from '../assests/test.jpeg'
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
    
      .post("https://www.nickjohnson.cloud/dj-rest-auth/login/", data)
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
            // bordered={false}
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
              <Button type="primary" shape="round" htmlType="submit">
                Log In
              </Button>
            </Form.Item>


 


            {/* <Card title="Card title" bordered={false} style={{ width: "auto" }}> */}

            <Form.Item {...tailLayout}>


            <Button
                style={{ width: "auto" }}
                size="large"
                type="default"
                shape=""
                htmlType="button"
              >
                <a
                //  href="https://github.com/login/oauth/authorize?&client_id=Iv1.f50a9e441abc37c0"
                 href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://nickjohnsondev.netlify.app/accounts/auth/google/&prompt=consent&response_type=code&client_id=1016211870076-0b889mk6je64gtpp87lejo2sfkldlbb0.apps.googleusercontent.com&scope=email&access_type=offline">
                 
                 {/* > */}
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
           
           {/* </Card> */}
          </Form>
        </Spin>
      </div>
    </div>
  );
};
// const JobsForm = () => {

// };
export default SignUp;
