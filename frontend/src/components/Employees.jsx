import React, { Component } from "react";
import { List, Typography } from "antd";
import EmployeesModal from "./Models_content/EmployeeModal";
import axios from "axios";

export default class Employees extends Component {



  state={
    deploys :[]
  }


  get_updated_data = (e)=>{
    console.log(e)
     

    this.setState({
      deploys: [e , ...this.state.deploys]
    });  



  }
  componentDidMount() {

    const token  =localStorage.getItem('access_token')

    
    axios.get("http://localhost:8000/ci/deploy/", {
       headers: {
     Authorization: 'Bearer ' +  token
      }
    }).then(res => {
      console.log(res.data)
      this.setState({
        deploys: res.data
      });  
  })
  }





  render() {
    return (
      <div>
        <div className="employees my-flex">
          <h1>Deploys</h1>
          <h1>
            <EmployeesModal get_updated_data={this.get_updated_data} />
          </h1>
        </div>
        <List
          className="employees"
          bordered
          dataSource={this.state.deploys}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>
                
              <List.Item.Meta
          // avatar={}
          
            title={item.name}
            description={item.type }
        
               />
                </Typography.Text> 
              <Typography.Text></Typography.Text> {"env =>" + item.env_name}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
