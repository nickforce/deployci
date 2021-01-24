import { Alert, Spin, Form, Input, Button, Select } from "antd";
import React, { useState  , useEffect} from "react";
import axios from "axios";
const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 24 },
};

const DeploysForm = (props) => {

  
  useEffect(() => {
    
    const token =localStorage.getItem('access_token')
    axios.get("http://localhost:8000/ci/envs/", {
      headers: {
      Authorization: 'Bearer ' + token
      }
    }).then(res => {
      setEnvs(res.data);
      })
    
    
    } , [])


  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [spin, setSpin] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [env1, setEnv1] = useState("");
  const [envs, setEnvs] = useState([]);

  const handleSubmit = (e) => {
    setSpin(true);
    // const data = { name: name, type: type, env1: env1, env2: env2 };
    const data = { name: name, type: type, env1: env1  };
    const token = localStorage.getItem("access_token")
    axios
      .post(`http://localhost:8000/ci/deploy/create/`, data , 
      {
        headers:{
          Authorization: 'Bearer ' + token
        }
      }
      )
      .then((response) => {
        setIsSuccessed(true);
        form.resetFields();
        setSpin(false);
         props.get_updated_data(response.data)

        setName("")
        setType("")
        setEnv1("")
        setTimeout(() => {
          setIsSuccessed(false)
        }, 4000);
      })
      .catch((error) => {
        setMessage(JSON.stringify(error.response.data));
        setIsFailed(true);
        setSpin(false);
        setTimeout(() => {
          setIsFailed(false)
        }, 4000);
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
        form={form}
        onSubmitCapture={handleSubmit}
        {...layout}
        name="control-hooks"
      >
        <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
          <Input onChange={(e) => setType(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="Environment"
          label="Environment"
          rules={[{ required: true }]}
        >
          <Select onChange={(e) => setEnv1(e)} placeholder="Select a option ">
           {  
            envs.map((env) =>
              <Option value={env.id}>{env.name + " Env"}</Option>
              )
            } 
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="Environment"
          label="Environment"
          rules={[{ required: true }]}
        >
          <Select onChange={(e) => setEnv2(e)} placeholder="Select a option ">
            <Option value="env 1">env 1</Option>
            <Option value="env 2">env 2</Option>
            <Option value="env 3">env 3</Option>
          </Select>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default DeploysForm;
