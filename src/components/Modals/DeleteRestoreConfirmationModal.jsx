import { useState } from "react";
import { Modal, Typography } from "antd";
import { WarningFilled, QuestionCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

// Confirmation modal for actions like delete or restore
const DeleteRestoreConfirmationModal = ({
  deleteRestoreModal,
  closedeleteRestoreModal,
  deleteItem,
  restoreItem,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, isDelete, selectedObject } = deleteRestoreModal;

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      if (isDelete) {
        deleteItem(selectedObject?.id);
      } else {
        restoreItem(selectedObject?.id);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setConfirmLoading(false);
      closedeleteRestoreModal();
    }
  };

  const handleCancel = () => {
    closedeleteRestoreModal();
  };

  const icon = isDelete ? (
    <WarningFilled style={{ color: "red", fontSize: "3rem" }} />
  ) : (
    <QuestionCircleFilled style={{ color: "#1890ff", fontSize: "3rem" }} />
  );

  // Generate default message based on action type
  const action = isDelete ? "delete" : "restore";

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
      okButtonProps={{
        danger: isDelete,
        type: "primary",
      }}
    >
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        {icon}
        <br />
        <br />
        {`Are you sure you want to ${action} ${
          selectedObject?.fullName || // Employee, Guest
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

export default DeleteRestoreConfirmationModal;
