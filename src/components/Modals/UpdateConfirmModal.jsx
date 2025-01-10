import { useState } from "react";
import { Button, Flex, Modal, Space, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const UpdateConfirmModal = ({
  updatePerson,
  updateConfirmModal,
  setUpdateConfirmModal,
  closeModal,
  form,
  setFormData,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, updatedValues, selectedPersonId, updatedData } =
    updateConfirmModal;

  const handleOk = async () => {
    setConfirmLoading(true);
    await updatePerson(selectedPersonId, updatedData);
    setConfirmLoading(false);
    setUpdateConfirmModal({
      open: false,
      updatedValues: null,
      selectedPersonId: null,
      updatedData: null,
    });
    form.resetFields();
    setFormData({});
    closeModal();
  };

  const handleCancel = () => {
    setUpdateConfirmModal({
      open: false,
      updatedValues: null,
      selectedPersonId: null,
      updatedData: null,
    });
  };

  return (
    <Modal centered open={open} closable={false} footer={null}>
      {updatedValues && Object.keys(updatedValues).length > 0 ? (
        <>
          <Title level={4} style={{ textAlign: "center" }}>
            <Space>
              <InfoCircleOutlined
                style={{ color: "yellow", fontSize: "2rem" }}
              />
              Following data got updated!
            </Space>
          </Title>
          {/* make this good */}
          <Text>{JSON.stringify(updatedValues)}</Text>
          <Title level={5}>Are you sure to update?</Title>
          <Flex justify="end">
            <Space>
              <Button onClick={handleCancel}>No</Button>
              <Button
                onClick={handleOk}
                type="primary"
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
            No changes detected!
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
export default UpdateConfirmModal;
