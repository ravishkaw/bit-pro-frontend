import { useState } from "react";
import { Button, Divider, Flex, Modal, Space, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// update confirmatin modal
const UpdateConfirmationModal = ({
  updateFunction, // api crud update function
  updateConfirmModal, // modal state
  closeUpdateConfirmModal,
  closeModal, // modal state of form modal
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, updatedValues, selectedObjectId, updatedData } =
    updateConfirmModal;

  //Submit data into db
  const handleOk = async () => {
    setConfirmLoading(true);
    await updateFunction(selectedObjectId, updatedData);
    setConfirmLoading(false);
    closeUpdateConfirmModal();
    closeModal();
  };

  // Cancel the confirmation
  const handleCancel = () => {
    closeUpdateConfirmModal();
  };

  return (
    <Modal open={open} closable={false} footer={null} destroyOnClose>
      {/* check and show changes were made or not */}
      {updatedValues != null && updatedValues.length > 0 ? (
        <>
          <Title level={4} style={{ textAlign: "center" }}>
            <Space>
              <InfoCircleOutlined
                style={{ color: "yellow", fontSize: "2rem" }}
              />
              Following data got changed
            </Space>
            {/* <br />
            <Text level={5}>from {updatedData.fullName}</Text> */}
          </Title>
          <Divider />
          {updatedValues.map((values, index) => (
            <div key={index}>
              <Text>{values}</Text> <br />
            </div>
          ))}
          <Divider />
          <Title level={5}>Are you sure to update?</Title>
          <Flex justify="end">
            <Space>
              <Button onClick={handleCancel}>No</Button>
              <Button
                onClick={handleOk}
                color="yellow"
                variant="solid"
                loading={confirmLoading}
              >
                Yes
              </Button>
            </Space>
          </Flex>
        </>
      ) : (
        <Title level={4} style={{ textAlign: "center" }}>
          <Space>
            <InfoCircleOutlined style={{ color: "green", fontSize: "2rem" }} />
            No changes were made!
          </Space>
          <Flex justify="end">
            <Space>
              <Button onClick={handleCancel}>Close</Button>
            </Space>
          </Flex>
        </Title>
      )}
    </Modal>
  );
};

export default UpdateConfirmationModal;
