import { useState } from "react";
import {
  Form,
  Space,
  InputNumber,
  Typography,
  Button,
  DatePicker,
  Row,
  Col,
  Spin,
  Divider,
  Card,
  Empty,
  Flex,
  Select,
  Alert,
  Tag,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import FormInputTooltip from "./FormInputTooltip";

// Form for room facility availability check
const CheckRoomForm = ({
  form,
  fetchRooms,
  isEditing,
  setCurrent,
  next,
  setFormData,
}) => {
  const [searching, setSearching] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [capacity, setCapacity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [error, setError] = useState(null);

  // Handle capacity change for adults, children, and infants
  const handleCapacityChange = (type, value) => {
    setCapacity((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // get available rooms for a stay between two dates with adults, children and infants
  const handleSearch = async () => {
    try {
      setError(null);
      setSearching(true);

      // Check if date range is selected
      const dateRange = form.getFieldValue("reservationDateRange");

      if (!dateRange || !dateRange[0] || !dateRange[1]) {
        setSearching(false);
        throw new Error("Please select check-in and check-out dates");
      }

      const checkInDate = dateRange[0].format("YYYY-MM-DD");
      const checkOutDate = dateRange[1].format("YYYY-MM-DD");

      const rooms = await fetchRooms(
        checkInDate,
        checkOutDate,
        capacity.adults,
        capacity.children,
        capacity.infants
      );
      setSearching(false);
      setAvailableRooms(rooms);
    } catch (error) {
      setError(error.message || "Failed to search for rooms");
      setAvailableRooms([]);
    }
  };

  // Handle room selection
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    form.setFieldsValue({
      roomId: { label: `Room ${room.number}`, value: room.id },
    });
    setError(null);
  };

  // Disable past dates in the date picker
  const disabledDate = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  // Reset form fields and state
  const handleReset = () => {
    form.resetFields();
    setCurrent(0);
    setAvailableRooms([]);
    setSelectedRoom(null);
    setCapacity({ adults: 1, children: 0, infants: 0 });
    setError(null);
    setFormData({});
    setSearching(false);
  };

  // Handle next button click
  const handleNext = () => {
    if (form.getFieldValue("roomId") === undefined) {
      setError("Please select a room");
      return;
    }
    setError(null);
    next();
  };

  return (
    <>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={15}>
          <Form.Item
            name="reservationDateRange"
            label={
              <FormInputTooltip
                label={
                  <Space>
                    <CalendarOutlined />
                    <span>Check-in & Check-out Dates</span>
                  </Space>
                }
                title={"Select your check-in and check-out dates"}
              />
            }
            rules={[
              {
                required: true,
                message: "Please select your reservation dates!",
              },
            ]}
            hasFeedback
          >
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              format="YYYY-MM-DD"
              placeholder={["Check-in", "Check-out"]}
            />
          </Form.Item>
        </Col>
        <Col xs={8} md={3}>
          <Form.Item
            name="adultNo"
            label={
              <FormInputTooltip
                label="Adults"
                title="Select the number of adults"
              />
            }
            rules={[
              {
                required: true,
                message: "Please select your reservation dates!",
              },
            ]}
            hasFeedback
          >
            <InputNumber
              min={1}
              max={10}
              value={capacity.adults}
              onChange={(value) => handleCapacityChange("adults", value)}
            />
          </Form.Item>
        </Col>
        <Col xs={8} md={3}>
          <Form.Item
            name="childNo"
            label={
              <FormInputTooltip
                label="Children"
                title="Select the number of children"
              />
            }
            rules={[
              {
                required: true,
                message: "Please select your reservation dates!",
              },
            ]}
            hasFeedback
          >
            <InputNumber
              min={0}
              max={10}
              value={capacity.children}
              onChange={(value) => handleCapacityChange("children", value)}
            />
          </Form.Item>
        </Col>
        <Col xs={8} md={3}>
          <Form.Item
            name="infantNo"
            label={
              <FormInputTooltip
                label="Infants"
                title="Select the number of infants"
              />
            }
            rules={[
              {
                required: true,
                message: "Please select your reservation dates!",
              },
            ]}
            hasFeedback
          >
            <InputNumber
              min={0}
              max={5}
              value={capacity.infants}
              onChange={(value) => handleCapacityChange("infants", value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            loading={searching}
          >
            Search Available Rooms
          </Button>
        </Col>
      </Row>

      <Divider style={{ marginTop: 16, marginBottom: 16 }} />

      <Spin spinning={searching}>
        <Row justify="end">
          <Col>
            <Form.Item
              name="roomId"
              label="Selected Room"
              layout="horizontal"
              hasFeedback
            >
              <Select suffixIcon={null} disabled />
            </Form.Item>
          </Col>
        </Row>

        {availableRooms.length > 0 ? (
          <Row gutter={[16, 16]}>
            {availableRooms.map((room) => (
              <Col xs={24} sm={12} md={12} key={room.id}>
                <Card
                  hoverable
                  onClick={() => handleRoomSelect(room)}
                  style={{
                    border:
                      selectedRoom?.id === room.id
                        ? "2px solid #1890ff"
                        : undefined,
                    height: "100%",
                  }}
                >
                  <Card.Meta
                    title={
                      <Flex justify="space-between" wrap>
                        Room {room.number}
                        <Tag color="processing">
                          Total :{" "}
                          {room.price.toLocaleString("en-LK", {
                            style: "currency",
                            currency: "LKR",
                          })}
                        </Tag>
                      </Flex>
                    }
                    description={
                      <>
                        <Flex gap={12} wrap="wrap">
                          <Flex align="center" gap={4}>
                            <TeamOutlined style={{ color: "#1890ff" }} />
                            <Typography.Text>
                              {room.adultNo || 0} Adults
                            </Typography.Text>
                          </Flex>
                          <Flex align="center" gap={4}>
                            <TeamOutlined style={{ color: "#52c41a" }} />
                            <Typography.Text>
                              {room.childNo || 0} Children
                            </Typography.Text>
                          </Flex>
                          <Flex align="center" gap={4}>
                            <TeamOutlined style={{ color: "#faad14" }} />
                            <Typography.Text>
                              {room.infantNo || 0} Infant
                            </Typography.Text>
                          </Flex>
                        </Flex>
                        {room.facilities?.map((facility, index) => (
                          <Typography.Text type="secondary" key={index}>
                            | {facility}{" "}
                          </Typography.Text>
                        ))}
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description={
              <Typography.Text type="secondary">
                Search for available rooms by selecting dates and guests
              </Typography.Text>
            }
          />
        )}
      </Spin>

      <Flex
        justify={isEditing ? "end" : "space-between"}
        style={{ marginTop: 16 }}
      >
        {!isEditing && (
          <Button color="default" variant="dashed" onClick={handleReset}>
            Reset
          </Button>
        )}
        <Space>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default CheckRoomForm;
