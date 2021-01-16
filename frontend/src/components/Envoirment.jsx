import React, { Component } from "react";
import { List, Typography, Row, Col } from "antd";
import EnvoirmentModal from "./Models_content/EnvoirmentModal";
import axios from "axios";

export default class Envoirment extends Component {
  

  state={
    envs :[]
  }


  componentDidMount () {
    const token  =localStorage.getItem('access_token')
    
    
    
    axios.get("http://localhost:8000/ci/envs/", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      this.setState({
        envs: res.data
      });  
      // console.log(res.data);
    })
  }
  
  
  get_updated_data = (e)=>{
    console.log(e)
     

    this.setState({
      envs: [e , ...this.state.envs]
    });  



  }
  
  render() {
    return (
      <div>
        <div className="my-flex">
          <h1>Envoirment</h1>
          <h1>
            <EnvoirmentModal get_updated_data ={this.get_updated_data} />
          </h1>
        </div>

        <List
          className="envoirment"
          bordered
          dataSource={this.state.envs}
          renderItem={(item) => (
            <List.Item>
            
            <List.Item.Meta
          // avatar={}
          
          title={item.name}
          description={item.type }
      
               />
      .
      <a className="wrap" href={item.url_repo}>{item.url_repo}</a>
      <h5> {item.ci_deploy}</h5>
            
            </List.Item>
          )}
        />
      </div>
    );
  }
}
