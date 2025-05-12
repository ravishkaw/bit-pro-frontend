import { useState } from "react";
import { Button, Divider, Flex, Modal, Typography } from "antd";

const { Title, Text } = Typography;

// modal for room reservation actions (check-in, check-out, cancel)
const RoomReservationActionModal = ({
  actionFunction, // API function to execute the action
  actionModalState, // modal state
  closeModal, // function to close the modal
}) => {
  const [loading, setLoading] = useState(false);
  const { open, selectedReservationId, actionType } = actionModalState;

  const getActionConfig = () => {
    switch (actionType) {
      case "check-in":
        return { color: "#52c41a", icon: "🏨" };
      case "confirm":
        return { color: "#666cff", icon: "🔑" };
      case "cancel":
        return { color: "#f5222d", icon: "❌" };
      default:
        return { color: "#faad14", icon: "⚠️" };
    }
  };

  const { color, icon } = getActionConfig();

  const handleAction = async () => {
    setLoading(true);
    try {
      await actionFunction(selectedReservationId, actionType);
      closeModal();
    } catch (error) {
      console.error("Error executing action:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      footer={null}
      closable={false}
      maskClosable={false}
      width={450}
    >
      <div style={{ textAlign: "center", padding: "12px 0" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
        <Title level={4} style={{ color }}>
          {actionType?.toUpperCase()} CONFIRMATION
        </Title>

        <Divider />

        <div style={{ marginBottom: 16, textAlign: "left" }}>
          <Text strong>Reservation #{selectedReservationId}</Text>
        </div>

        <Text>
          Are you sure you want to{" "}
          <Text strong style={{ color }}>
            {actionType}
          </Text>{" "}
          this reservation?
        </Text>

        <Text
          type="secondary"
          style={{ display: "block", marginTop: 8, fontSize: 12 }}
        >
          Note: This action {actionType === "cancel" ? "cannot" : "may not"} be
          reversed.
        </Text>

        <Divider />

        <Flex justify="end" gap={8}>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            type="primary"
            style={{ backgroundColor: color, borderColor: color }}
            onClick={handleAction}
            loading={loading}
          >
            Confirm
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default RoomReservationActionModal;
