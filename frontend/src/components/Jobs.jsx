import React, { Component } from "react";
import { List, Avatar ,  Typography } from "antd";
import JobsModal from "./Models_content/JobsModal";
import axios from "axios";
export default class Jobs extends Component {
  
  state = {
    jobs:[]
  };

//   handleJObs() {

//  }

get_updated_data = (e)=>{
  console.log(e)
   

  this.setState({
    jobs: [e , ...this.state.jobs]
  });  



}

componentDidMount() {
  const token  =localStorage.getItem('access_token')



  axios.get("http://localhost:8000/ci/jobs/", {
     headers: {
   Authorization: 'Bearer ' + token
    }
  }).then(res => {
    this.setState({
      jobs: res.data
    });  
  })


}
  render() {
    return (
      <div>
        <div className="my-flex">
          <h1>Jobs</h1>
          <h1>
            <JobsModal get_updated_data={this.get_updated_data} />
          </h1>
        </div>
        <List
          bordered
          dataSource={this.state.jobs}
          renderItem={(item) => (
            <List.Item>
               <List.Item.Meta
          title={item.name} 
          description={item.type}
          />
              {/* <Typography.Text></Typography.Text> {item.name} */}
            </List.Item>
          )}
        />
      </div>
    );
  }
}
