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




class CustomOauthComponent extends Component {
    
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
        const  url  = `https://www.nickjohnson.cloud/get_access_token/api/custom/token/?code=${data.code}`

        
        axios
        .get(url)
        .then((response) => {
            console.log(response.data);

            localStorage.setItem("access_token_custom", response.data.code);
            // localStorage.setItem("refresh_token", response.data.refresh_token);
            this.setState({spin:false});
            window.location="/"
         })
        .catch((error) => {
          this.setState({isFailed:true});
          
          console.log(error);
          this.setState({message:JSON.stringify(error.response)});
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


export default CustomOauthComponent;
