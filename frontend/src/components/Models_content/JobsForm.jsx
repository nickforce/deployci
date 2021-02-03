import { Alert, Spin, Form, Input, Button, Select } from "antd";
import React, { useState  , useEffect} from "react";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

const JobsForm = (props) => {
 
  const [form] = Form.useForm();
  
  

    useEffect(() => {
      const token  =localStorage.getItem('access_token')
      
     
      axios.get("http://localhost:8000/ci/deploy/", {
        headers: {
        Authorization: 'Bearer ' + token
        }
      }).then(res => {
        setjobs(res.data);
        })
      
      } , [])

  const [message, setMessage] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [spin, setSpin] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [relation, setRelation] = useState("");
  const [jobs , setjobs] = useState([]);
    

  
  const handleSubmit = (e) => {
    const token  =localStorage.getItem('access_token')

    setSpin(true);
    const data = { name: name, type: type, deploy: relation };
    console.log(data);
    axios.post("http://localhost:8000/ci/cijobs/create/",
      data, 
     {
       headers: { Authorization: 'Bearer ' + token} 
     }
    )
      .then((response) => {
 
        console.log(response.data);
        setIsSuccessed(true);
        form.resetFields();
        setName("");
        setType("");
        setRelation("");
        props.get_updated_data(response.data)

        setSpin(false);
        setTimeout(() => {
          setIsSuccessed(false)
        }, 4000);
      })
      .catch((error) => {
        // console.log(error.response.data);
        setMessage(JSON.stringify(error.response.data));
        setIsFailed(true);
        console.log(error);
        setSpin(false);
        setTimeout(() => {
          setIsFailed(false)
        }, 4000);
      });
  };

  const handleSelect = (e) => {
    setRelation(e);
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
        onSubmitCapture={handleSubmit}
        {...layout}
        form={form}
        name="control-hooks"
      >
        <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
          <Input onChange={(e) => setType(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="deploye"
          label="deploye"
          rules={[{ required: true }]}
        >
    <Select onChange={handleSelect} placeholder="Select a option ">
                  
   {       

   jobs.map((deploy) =>
    <Option value={deploy.id}>{deploy.name + " deploy"}</Option>
    )
   }
      
         
          </Select>


        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default JobsForm;
