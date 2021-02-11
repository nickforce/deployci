import { Alert, Checkbox, Spin, Form, Input, Button, Select, Steps, Divider } from "antd";

import React, { useState  , useEffect} from "react";
import axios from "axios";
import JobSteps from "./JobSteps";

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
  const [diffDeploy, setDiffDeploy] = useState("");
  const [targetEnv, setTargetEnv] = useState("");
  const [sourceBranch, setSourceBranch] = useState("");
  const [validateDeploy, setValidateDeploy] = useState("");
  const [testLevel, setTestLevel] = useState("");
  const [specTests, setSpecTests] = useState("");
  const [skipSelenium, setSkipSelenium] = useState("");
  const [scanForDestructive, setScanForDestructive] = useState("");
  const [relation, setRelation] = useState("");
  const [jobs , setjobs] = useState([]);
  const { Step } = Steps;

  
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

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
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
      <JobSteps></JobSteps>
      <Form
        onSubmitCapture={handleSubmit}
        {...layout}
        form={form}
        name="control-hooks"
      >
        
        {/* <Form.Item name="deployOptions" label="options" rules={[{ required: false }]}>
          <Checkbox onChange={onChange}>Validate Only Deploy</Checkbox>
        </Form.Item> */}
          {/* <Checkbox onChange={onChange}>Differential Only Deploy</Checkbox> */}
          
          {/* <Checkbox onChange={onChange}>Skip Selenium</Checkbox>
          <Checkbox onChange={onChange}>Scan for Destructive</Checkbox> */}
          {/* <Input onChange={(e) => setDiffDeploy(e.target.value)} /> */}
        
        <br/><b>Where is your code now?</b><br/><br/>
        <Form.Item name="sourceBranch" label="source" rules={[{ required: false }]}>
          <Input placeholder="feature/something" onChange={(e) => setSourceBranch(e.target.value)} />
        </Form.Item>
        {/* <b>Where are you moving your code to?</b> <br/>
        <Form.Item name="targetEnv" label="target" rules={[{ required: false }]}>
          <Input placeholder="sf_qa_env" onChange={(e) => setTargetEnv(e.target.value)} />
        </Form.Item> */}
        {/* <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item> */}
        <Form.Item name="Type" label="type" rules={[{ required: false }]}>
          <Input disabled="true" defaultValue="salesforce deploy" onChange={(e) => setType(e.target.value)} />
        </Form.Item>
        
        {/* <Form.Item name="validateDeploy" label="validateDeploy" rules={[{ required: false }]}>
        
          <Input onChange={(e) => setValidateDeploy(e.target.value)} />
        </Form.Item>

        <Form.Item name="skipSelenium" label="skipSelenium" rules={[{ required: false }]}>
          <Input onChange={(e) => setSkipSelenium(e.target.value)} />
        </Form.Item>
        <Form.Item name="scanForDestructive" label="scanForDestructive" rules={[{ required: false }]}>
          
          <Input onChange={(e) => setScanForDestructive(e.target.value)} />
        </Form.Item>
 */}

        
{/*         
        
        <Form.Item name="testLevel" label="test_level" rules={[{ required: false }]}>
          <Input onChange={(e) => setTestLevel(e.target.value)} />
        </Form.Item>
        <Form.Item name="specTests" label="specify" rules={[{ required: false }]}>
          <Input placeholder="ex.Apex1, Apex2" onChange={(e) => setSpecTests(e.target.value)} />
        </Form.Item>
        */}
        {/* <Form.Item name="deploye" label="deploye" rules={[{ required: true }]}>
          <Select onChange={handleSelect} placeholder="Select a option ">
                        
            {       

            jobs.map((deploy) =>
              <Option value={deploy.id}>{deploy.name + " deploy"}</Option>
              )
            }
            
              
          </Select>


        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default JobsForm;
