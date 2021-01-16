import { Alert, Spin, Form, Input, Button, Select } from "antd";
import axios from "axios";
import queryString from 'query-string';
import React, { Component } from "react";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 24 },
};




class GithubOAuth extends Component {
    
    state ={
        spin:true, 
        isFailed:false, 
        isSuccessed:false , 
        isFailed:false , 
        message:false , 
    }
    componentDidMount()
    {
        this.setState({spin:true})
        
        let params = queryString.parse(this.props.location.search)
        
        const  data ={
            "code": params.code
        }
        console.log(params.code);
        // 837110772a688d8baff7
        // b7c3df511dc5c6a975f0
        axios
        .post("http://localhost:8000/accounts/dj-rest-auth/github/", data)
        .then((response) => {
            console.log(response);
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            this.setState({spin:false});
            window.location="/"
         })
        .catch((error) => {
          this.setState({isFailed:true});
          
          console.log(error);
          this.setState({message:JSON.stringify(error.response.data)});
          this.setState({spin:false});
                });

// http://localhost:3000/accounts/auth/github/
    }
 
  
  
    render() {
      
      return (
          <Spin
        spinning={this.state.spin} tip="Please Wait ...">
        <div className="container">
          <div className="center" >
            {this.state.isSuccessed && (
              <Alert
              className="w-alert"
              message="Successfully Submitted"
              type="success"
              showIcon
              />
              )}
            {this.state.isFailed && (
              <Alert
              className="w-alert"
                message={this.state.message}
                type="warning"
                showIcon
                closable
                />
            )}


             
          </div>
        </div>
            </Spin>
      );
    };
}


export default GithubOAuth;
