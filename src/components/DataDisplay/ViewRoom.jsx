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

import usePrintContent from "../../hooks/usePrintContent";

const { Title } = Typography;

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
    { key: "1", label: "Capacity", children: selectedRoom?.capacity },
    { key: "2", label: "Floor Number", children: selectedRoom?.floorNumber },
    { key: "3", label: "Description", children: selectedRoom?.description },
    {
      key: "4",
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
      key: "5",
      label: "Room Type",
      children: selectedRoomType?.name,
    },
    {
      key: "6",
      label: "Base Price",
      children: `$${selectedRoomType?.basePrice}`,
    },
  ];

  const pricingRules = selectedRoomType?.pricingRules?.map((rule, index) => ({
    key: `pricing-${index}`,
    // label: `${index + 1}`,
    children: `⁕ ${rule.description} (${dayjs(rule.startDate).format(
      "YYYY-MM-DD"
    )} to ${dayjs(rule.endDate).format("YYYY-MM-DD")}) - Multiplier: ${
      rule.pricingMultiplier
    }`,
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
            <Image
              style={{
                borderRadius: 8,
                maxHeight: "300px",
                objectFit: "fill",
              }}
              alt={selectedRoom?.number}
              src={import.meta.env.VITE_IMAGE_URL + selectedRoom?.photo}
            />
            <Divider orientation="left" style={{ marginBottom: 0 }}>
              <Title level={5}>Facilities</Title>
            </Divider>
            <Descriptions
              title={null}
              items={facilities}
              column={3}
              size="small"
            />
          </Col>
          <Col xs={24} sm={16}>
            <Descriptions
              title={null}
              items={roomInfo}
              column={2}
              size="small"
              style={{ margin: 4 }}
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
