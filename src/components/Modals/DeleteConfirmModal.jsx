import { useState } from "react";
import { Modal, Typography } from "antd";
import { WarningFilled } from "@ant-design/icons";

// Delte confirmation modal
const DeleteConfirmModal = ({ deleteModal, setDeleteModal, deletePerson }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, selectedPerson } = deleteModal;

  const handleOk = () => {
    setConfirmLoading(true);
    deletePerson(selectedPerson.id);
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
        {`Are you sure to Delete ${
          selectedPerson?.fullName || selectedPerson?.username
        }`}
      </Typography.Title>
    </Modal>
  );
};

export default DeleteConfirmModal;
