import {
  Button,
  Divider,
  Flex,
  Space,
  Typography,
  Modal,
  Row,
  Col,
  Image,
  Descriptions,
  List,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { TeamOutlined } from "@ant-design/icons";

import usePrintContent from "../../hooks/usePrintContent";

const { Title, Text } = Typography;

// Modal of view room
const ViewRoom = ({
  module,
  viewModal,
  modulePrivileges,
  closeViewModal,
  handleEdit,
  loadOneRoom,
  additionalData,
}) => {
  // React print configuration
  const { contentRef, printFn } = usePrintContent();

  const { open, selectedObject: selectedRoom } = viewModal;
  const { roomTypes, roomFacilities, roomStatus } = additionalData;

  const selectedRoomStatus = roomStatus.find(
    (status) => status.value == selectedRoom?.statusId
  );

  const selectedRoomType = roomTypes.find(
    (roomType) => roomType.id == selectedRoom?.roomTypeId
  );

  const selectedRoomFacilities = selectedRoom?.roomFacilityIds
    ?.map((facilityId) =>
      roomFacilities.find((facility) => facility.id == facilityId)
    )
    .filter(Boolean);

  // All value mappings for room details
  const roomInfo = [
    {
      key: "1",
      label: "Status",
      children: (
        <Tag
          color={selectedRoomStatus?.label === "Available" ? "green" : "red"}
        >
          {selectedRoomStatus?.label}
        </Tag>
      ),
    },
    {
      key: "2",
      label: "Room Type",
      children: selectedRoomType?.name,
    },
    {
      key: "3",
      label: "Price",
      children: <Tag color="blue">${selectedRoom?.price}</Tag>,
    },
    {
      key: "4",
      label: "Description",
      children: selectedRoom?.description,
    },
    { key: "5", label: "Floor Number", children: selectedRoom?.floorNumber },
    {
      key: "6",
      label: "Capacity",
      children: (
        <>
          <Flex gap={12} wrap="wrap" style={{ marginBottom: "16px" }}>
            <Flex align="center" gap={4}>
              <TeamOutlined style={{ color: "#1890ff" }} />
              <Text>{selectedRoom?.adultNo || 0} Adults</Text>
            </Flex>
            <Flex align="center" gap={4}>
              <TeamOutlined style={{ color: "#52c41a" }} />
              <Text>{selectedRoom?.childNo || 0} Children</Text>
            </Flex>
            <Flex align="center" gap={4}>
              <TeamOutlined style={{ color: "#faad14" }} />
              <Text>{selectedRoom?.infantNo || 0} Infant</Text>
            </Flex>
          </Flex>
        </>
      ),
    },
  ];

  const pricingRules = selectedRoomType?.pricingRules?.map((rule, index) => ({
    key: `pricing-${index}`,
    // label: `${index + 1}`,
    children: `⁕ ${dayjs(rule.startDate).format("YYYY-MM-DD")} to ${dayjs(
      rule.endDate
    ).format("YYYY-MM-DD")} → Multiplier: ${rule.pricingMultiplier} - ${
      rule.description
    } `,
  }));

  const inventory = [
    {
      key: `inventory`,
      children: "have to fix this along side with inventory",
    },
  ];

  const facilities = selectedRoomFacilities?.map((facility, index) => ({
    key: `facility-${index}`,
    // label: index + 1,
    children: `⁕ ${facility.name}`,
  }));

  return (
    <Modal
      title={null}
      open={open}
      width={1000}
      onCancel={closeViewModal}
      footer={null}
    >
      <div ref={contentRef}>
        <Divider orientation="center" style={{ marginTop: 0 }}>
          <Title
            level={3}
            style={{ margin: 0 }}
          >{`${module} Details - Room ${selectedRoom?.number}`}</Title>
        </Divider>

        <Row gutter={[20, 20]}>
          <Col xs={24} sm={8}>
            <img
              style={{
                borderRadius: 8,
                maxHeight: "300px",
                width: "100%",
                objectFit: "fill",
              }}
              alt={selectedRoom?.number}
              src={import.meta.env.VITE_IMAGE_URL + selectedRoom?.photo}
            />
            <Descriptions
              title={null}
              items={roomInfo}
              column={1}
              size="small"
              style={{ margin: 4 }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Divider orientation="left" style={{ marginBottom: 0 }}>
              <Title level={5}>Facilities</Title>
            </Divider>
            <Descriptions
              title={null}
              items={facilities}
              column={4}
              size="small"
            />
            <Divider orientation="left" style={{ marginBottom: 0 }}>
              <Title level={5}>Inventory</Title>
            </Divider>
            <Descriptions
              title={null}
              items={inventory}
              column={1}
              size="small"
            />
            <Divider orientation="left" style={{ marginBottom: 0 }}>
              <Title level={5}>Pricing Rules</Title>
            </Divider>
            <Descriptions
              title={null}
              items={pricingRules}
              column={1}
              size="small"
            />
          </Col>
        </Row>
      </div>

      <Divider />
      <Flex justify="space-between">
        {modulePrivileges.update_privilege ? (
          <Button
            onClick={() => {
              handleEdit(loadOneRoom, selectedRoom?.id);
              closeViewModal();
            }}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
        ) : (
          <span></span>
        )}
        <Space>
          <Button onClick={() => closeViewModal()}>Close</Button>
          <Button color="primary" variant="solid" onClick={() => printFn()}>
            Print
          </Button>
        </Space>
      </Flex>
    </Modal>
  );
};

export default ViewRoom;
