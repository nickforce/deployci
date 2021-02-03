import React, { useState } from "react";
import { Modal, Button } from "antd";
import SignUp from '../SignUp'  
const SignUpModal = () => {
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
        SigUp
        {/* <i className="fas fa-plus-circle fa-2x "></i> */}
      </Button>
      <Modal
        title="Sigup"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="">
          <SignUp />
        </div>
      </Modal>
    </>
  );
};
export default SignUpModal;



 