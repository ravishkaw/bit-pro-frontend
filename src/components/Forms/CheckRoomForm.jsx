import { useEffect, useState } from "react";
import {
  Form,
  Space,
  InputNumber,
  Typography,
  Button,
  DatePicker,
  Row,
  Col,
  Flex,
  Spin,
  Divider,
  Card,
  Empty,
  notification,
  Select,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import FormInputTooltip from "./FormInputTooltip";
import { formValidations } from "./validations";
import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

// Form for room facility availability check
const CheckRoomForm = ({
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [capacity, setCapacity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleCapacityChange = (type, value) => {
    setCapacity((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      setSearching(true);

      // Simulate API call to search for available rooms
      setTimeout(() => {
        // Mock data for available rooms
        const mockRooms = [
          {
            id: 1,
            name: "Deluxe Room",
            price: 150,
            capacity: 2,
            description: "Cozy room with garden view",
          },
          {
            id: 2,
            name: "Family Suite",
            price: 250,
            capacity: 4,
            description: "Spacious suite with sea view",
          },
          {
            id: 3,
            name: "Garden Villa",
            price: 350,
            capacity: 6,
            description: "Private villa with pool access",
          },
        ];

        setAvailableRooms(mockRooms);
        setSearching(false);
      }, 1500);
    } catch (error) {
      notification.error({
        message: "Validation Error",
        description: "Please check your inputs and try again",
      });
    }
  };

  const disabledDate = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <>
      <Spin spinning={loading} size="large" tip="Loading...">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              name="reservationSource"
              label="Reservation Source"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                options={[
                  { label: "Online", value: "online" },
                  { label: "Phone", value: "phone" },
                ]}
                placeholder="Select a source"
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>

          <Divider style={{ margin: 0 }} />

          <Col xs={24} md={15}>
            <Form.Item
              name="reservationDateRange"
              label={
                <Space>
                  <CalendarOutlined />
                  <span>Check-in & Check-out Dates</span>
                </Space>
              }
              rules={[
                {
                  required: true,
                  message: "Please select your reservation dates!",
                },
              ]}
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
              name="adults"
              label="Adults"
              rules={[
                {
                  required: true,
                  message: "Please select your reservation dates!",
                },
              ]}
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
              name="children"
              label="Children"
              rules={[
                {
                  required: true,
                  message: "Please select your reservation dates!",
                },
              ]}
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
              name="infants"
              label="Infants"
              rules={[
                {
                  required: true,
                  message: "Please select your reservation dates!",
                },
              ]}
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

        <Spin spinning={searching} tip="Searching for available rooms...">
          {availableRooms.length > 0 ? (
            <Row gutter={[16, 16]}>
              {availableRooms.map((room) => (
                <Col xs={24} md={8} key={room.id}>
                  <Card
                    hoverable
                    title={room.name}
                    onClick={() => setSelectedRoom(room.id)}
                    extra={
                      <Typography.Text strong>
                        ${room.price}/night
                      </Typography.Text>
                    }
                  >
                    <Typography.Paragraph>
                      {room.description}
                    </Typography.Paragraph>
                    <Typography.Text type="secondary">
                      Max capacity: {room.capacity} guests
                    </Typography.Text>
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
              style={{ padding: "20px 0" }}
            />
          )}
        </Spin>
      </Spin>
    </>
  );
};

export default CheckRoomForm;
