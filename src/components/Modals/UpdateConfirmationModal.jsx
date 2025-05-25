import { useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Modal,
  Space,
  Typography,
  List,
  Card,
} from "antd";
import { InfoCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// Helper component to display different types of changes
const ChangeItem = ({ change }) => {
  // For quantity arrays or list arrays, display as lists
  if (change.type === "quantity" || change.type === "list") {
    const oldItems =
      change.oldValue === "None" ? [] : change.oldValue.split(", ");
    const newItems =
      change.newValue === "None" ? [] : change.newValue.split(", ");

    return (
      <>
        <Divider />
        <Text strong>{change.field}: </Text>
        <Flex gap={16}>
          <div style={{ flex: 1 }}>
            <Text type="secondary">Previous:</Text>
            {oldItems.length === 0 ? (
              <div>
                <Text italic>None</Text>
              </div>
            ) : (
              <List
                size="small"
                dataSource={oldItems}
                renderItem={(item) => (
                  <List.Item style={{ padding: "4px 0" }}>
                    <Text>{item}</Text>
                  </List.Item>
                )}
              />
            )}
          </div>

          <ArrowRightOutlined
            style={{ color: "#1890ff", alignSelf: "center" }}
          />

          <div style={{ flex: 1 }}>
            <Text type="secondary">New:</Text>
            {newItems.length === 0 ? (
              <div>
                <Text italic>None</Text>
              </div>
            ) : (
              <List
                size="small"
                dataSource={newItems}
                renderItem={(item) => (
                  <List.Item style={{ padding: "4px 0" }}>
                    <Text>{item}</Text>
                  </List.Item>
                )}
              />
            )}
          </div>
        </Flex>
        <Divider />
      </>
    );
  }

  // For simple values, show inline
  return (
    <div style={{ marginBottom: 8 }}>
      <Text strong>{change.field}: </Text>
      <Text delete type="secondary">
        {change.oldValue}
      </Text>
      <ArrowRightOutlined style={{ margin: "0 8px", color: "#666cff" }} />
      <Text type="success">{change.newValue}</Text>
    </div>
  );
};

// Update confirmation modal
const UpdateConfirmationModal = ({
  updateFunction,
  updateConfirmModal,
  closeUpdateConfirmModal,
  closeModal,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { open, updatedValues, selectedObjectId, updatedData } =
    updateConfirmModal;

  // Check if we're receiving the new structured format or legacy format
  const hasStructuredChanges =
    updatedValues && typeof updatedValues === "object" && updatedValues.changes;

  const changes = hasStructuredChanges ? updatedValues.changes : [];
  const formattedStrings = hasStructuredChanges
    ? updatedValues.formatted
    : updatedValues || [];

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
    <Modal
      open={open}
      closable={false}
      footer={null}
      destroyOnClose
      width={hasStructuredChanges ? 600 : 520}
    >
      {/* check and show changes were made or not */}
      {(
        hasStructuredChanges ? changes.length > 0 : formattedStrings.length > 0
      ) ? (
        <>
          <Title level={4} style={{ textAlign: "center" }}>
            <Space>
              <InfoCircleOutlined
                style={{ color: "#faad14", fontSize: "24px" }}
              />
              Changes Summary
            </Space>
          </Title>
          <Divider />

          {hasStructuredChanges ? (
            // New structured format
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                padding: "0 4px",
              }}
            >
              {changes.map((change, index) => (
                <ChangeItem key={index} change={change} />
              ))}
            </div>
          ) : (
            // Legacy format
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {formattedStrings.map((values, index) => (
                <div key={index}>
                  <Text>{values}</Text> <br />
                </div>
              ))}
            </div>
          )}

          <Title level={5}>
            Are you sure you want to update these changes?
          </Title>
          <Flex justify="end">
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                onClick={handleOk}
                loading={confirmLoading}
              >
                Confirm Update
              </Button>
            </Space>
          </Flex>
        </>
      ) : (
        <Flex vertical align="center" gap={16}>
          <Space direction="vertical" align="center">
            <InfoCircleOutlined
              style={{ color: "#52c41a", fontSize: "32px" }}
            />
            <Title level={4} style={{ margin: 0 }}>
              No changes were made
            </Title>
            <Text type="secondary">The form data remains unchanged</Text>
          </Space>
          <Button onClick={handleCancel}>Close</Button>
        </Flex>
      )}
    </Modal>
  );
};

export default UpdateConfirmationModal;
