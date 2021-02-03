import React, { useState } from "react";
import { Modal, Button } from "antd";
import EmployeesForm from "./EmployeesForm";

const EmployeesModal = (props) => {
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
        title="Deploy"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="">
          <EmployeesForm get_updated_data={props.get_updated_data} />
        </div>
      </Modal>
    </>
  );
};
export default EmployeesModal;
