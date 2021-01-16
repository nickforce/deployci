import React, { useState } from "react";
import { Modal, Button } from "antd";
import JobsForm from "./JobsForm";
import SigIn from '../SignIn'  
const Siginmodel = () => {
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
        Sigin
        {/* <i className="fas fa-plus-circle fa-2x "></i> */}
      </Button>
      <Modal
        title="Sigin"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="">
          <SigIn />
        </div>
      </Modal>
    </>
  );
};
export default Siginmodel;



 