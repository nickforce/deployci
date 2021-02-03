import React, { useState } from "react";
import { Modal, Button } from "antd";
import JobsForm from "./JobsForm";

const JobsModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        <i className="fas fa-plus-circle fa-2x "></i>
      </Button>
      <Modal
        title="Create Jobs"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="">
          <JobsForm  get_updated_data={props.get_updated_data}/>
        </div>
      </Modal>
    </>
  );
};
export default JobsModal;
