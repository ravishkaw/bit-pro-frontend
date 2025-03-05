import { useState } from "react";
import { Modal, Typography } from "antd";
import { WarningFilled } from "@ant-design/icons";

// Delte confirmation modal
const DeleteConfirmModal = ({
  deleteModal,
  setDeleteModal,
  deleteFunction,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, selectedObject } = deleteModal;

  const handleOk = () => {
    setConfirmLoading(true);
    deleteFunction(selectedObject.id);
    setConfirmLoading(false);
    setDeleteModal({ open: false, selectedObject: null });
  };

  const handleCancel = () => {
    setDeleteModal({ open: false, selectedObject: null });
  };

  return (
    <Modal
      // centered
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
        {`Are you sure you want to delete ${
          selectedObject?.fullName || // Emplpoyee, Guest
          selectedObject?.username || // User
          (selectedObject?.roomNumber && `Room ${selectedObject.roomNumber}`) || // Rooms
          (selectedObject?.moduleId?.name && selectedObject?.roleId?.name
            ? `${selectedObject.moduleId.name} privilege of ${selectedObject.roleId.name}` // Privilege
            : "this item") // Any other
        }?`}
      </Typography.Title>
    </Modal>
  );
};

export default DeleteConfirmModal;
