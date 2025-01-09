import { useState } from "react";
import { Modal, Space, Typography } from "antd";
import { InfoCircleOutlined, WarningFilled } from "@ant-design/icons";

const DeleteConfirmModal = ({ deleteModal, setDeleteModal, deletePerson }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, selectedPerson } = deleteModal;

  const handleOk = () => {
    setConfirmLoading(true);
    deletePerson(selectedPerson.employeeId); //!change employee id to id
    setConfirmLoading(false);
    setDeleteModal({ open: false, selectedPerson: null });
  };

  const handleCancel = () => {
    setDeleteModal({ open: false, selectedPerson: null });
  };

  return (
    <Modal
      centered
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Yes"
      cancelText="No"
      closable={false}
      maskClosable={false}
      okButtonProps={{ danger: true }}
    >
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        <WarningFilled style={{ color: "red", fontSize: "3rem" }} />
        <br />
        <br />
        {`Are you sure to Delete ${selectedPerson?.fullName}`}
      </Typography.Title>
    </Modal>
  );
};
export default DeleteConfirmModal;
