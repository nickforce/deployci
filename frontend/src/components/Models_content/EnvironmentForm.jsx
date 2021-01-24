import { Alert, Form, Input, Button, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

const EnvironmentForm = (props) => {
  
  const [form] = Form.useForm();
  
    useEffect(()=>{
  
  
      const token  =localStorage.getItem('access_token')
        
       
      axios.get("http://localhost:8000/get_access_token/api/", {
        headers: {
        Authorization: 'Bearer ' + token
        }
      }).then(res => {
        // setGithub_access_token(res.data.code);
        console.log(res.data.code);
  
        axios.get("https://api.github.com/user/repos", {
        headers: {
        Authorization: 'token ' + res.data.code
  
        }}).then(ress => {
          setSpin(true)
          
          console.log(ress.data);
          setRepos( ress.data)
        setSpin(false)
        
        
      })
    })
    
    // console.log(github_access_token)
    
  } , [])
  const [message, setMessage] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [spin, setSpin] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [github_access_token, setGithub_access_token] = useState("");
  const [repos, setRepos] = useState([]);
  // const [isLoading, setLOADING] = useState(false);
  
console.log(repos);


  const handleSubmit = (e) => {
    setSpin(true);
    const data = { name: name, type: type, url_repo: url };
    const token =localStorage.getItem('access_token')
    axios
      .post(`http://localhost:8000/ci/envs/create/`, data ,
      {
        headers:{
          Authorization: 'Bearer ' + token
        }
      }
      )
      .then((response) => {
        setSpin(false);
        setIsSuccessed(true);
        form.resetFields();
        setName("");
        setType("");
        setUrl("");
        props.get_updated_data(response.data)

        
        setTimeout(() => {
          setIsSuccessed(false)
        }, 4000);
      })
      // .catch((error) => {
      //   setMessage(JSON.stringify(error.response.data));
      //   setIsFailed(true);
      //   setSpin(false);
      //   setTimeout(() => {
      //     setIsFailed(false)
      //   }, 4000);
      // });
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
        {...layout}
        onSubmitCapture={handleSubmit}
        form={form}
        name="control-hooks"
      >
        <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
          <Input
            placeholder="please enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
          <Input
            placeholder="please enter GitHub repo"
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="Repos Url" label="Repos Url" rules={[{ required: true }]}>
         
       
<Select onChange={(e) => setUrl(e) } placeholder="Select a option ">
                  
                  {!spin &&(

                    repos.map((repo) =>
                         <Option value={repo.clone_url}>{repo.clone_url }</Option>
                        )
                  )        
               
                  }
                     
                        
                         </Select>
                         </Form.Item>        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default EnvironmentForm;
