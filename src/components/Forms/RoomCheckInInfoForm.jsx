import { useState } from "react";
import {
  Form,
  Select,
  Button,
  Card,
  Alert,
  List,
  Typography,
  Space,
  Row,
  Col,
  Empty,
  Badge,
  Avatar,
  Flex,
  Tag,
  Input,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ProfileFormModal from "../Modals/ProfileFormModal";

const { Text } = Typography;

const RoomCheckInInfoForm = ({
  form,
  isEditing,
  setCurrent,
  next,
  prev,
  guestHookData,
  reservationTypes,
  reservationSources,
}) => {
  const [selectedGuests, setSelectedGuests] = useState(
    form.getFieldValue("guests") || []
  );
  const [primaryGuest, setPrimaryGuest] = useState(
    form.getFieldValue("primaryGuestId") || null
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const { data: guests, additionalData, addItem: addGuestData } = guestHookData;

  // Add guest to the selected list
  const addGuestToSelection = (guest) => {
    if (!selectedGuests.some((g) => g.id === guest.id)) {
      const updatedGuests = [...selectedGuests, guest];
      setSelectedGuests(updatedGuests);

      // Set as primary guest if this is the first guest
      if (!primaryGuest) {
        setPrimaryGuest(guest.id);
      }

      // Update form data
      updateGuestData(updatedGuests, primaryGuest || guest.id);
    }
  };

  // Remove guest from the selection
  const removeGuest = (guestId) => {
    const updatedGuests = selectedGuests.filter((g) => g.id !== guestId);
    setSelectedGuests(updatedGuests);

    // Update primary guest if needed
    if (primaryGuest === guestId) {
      const newPrimaryId =
        updatedGuests.length > 0 ? updatedGuests[0].id : null;
      setPrimaryGuest(newPrimaryId);
      updateGuestData(updatedGuests, newPrimaryId);
    } else {
      updateGuestData(updatedGuests, primaryGuest);
    }
  };

  // Handle guest selection
  const handleGuestSelect = (value) => {
    const selectedGuest = guests.find((g) => g.id === value);
    if (selectedGuest) {
      addGuestToSelection(selectedGuest);
      form.setFieldsValue({ guestSelect: undefined });
    }
  };

  // Set a guest as primary
  const setAsPrimary = (guestId) => {
    setPrimaryGuest(guestId);
    updateGuestData(selectedGuests, guestId);
  };

  // Update guest data fields
  const updateGuestData = (guestList, primaryId) => {
    form.setFieldsValue({
      guests: guestList,
      primaryGuestId: primaryId,
    });
  };

  const guestsOptions = () => {
    const filteredOptions = guests.filter(
      (guest) => !selectedGuests.some((selected) => selected.id === guest.id)
    );
    return filteredOptions.map((guest) => ({
      label: `${guest.fullName} (${guest.email})`,
      value: guest.id,
    }));
  };

  // handle next button click
  const handleNext = () => {
    const selectedGuests = form.getFieldValue("guests");
    const primaryGuestId = form.getFieldValue("primaryGuestId");

    if (!selectedGuests || selectedGuests.length === 0 || !primaryGuestId) {
      setError("Please select at least one guest");
      return;
    }
    setError(null);
    next();
  };

  // Reset form fields and state
  const handleReset = () => {
    form.resetFields();
    setCurrent(0);
    setPrimaryGuest(null);
    setSelectedGuests([]);
    setError(null);
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

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="reservationSource"
            label="Reservation Source"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              options={reservationSources}
              placeholder="Select a source"
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="reservationType"
            label="Reservation Type"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              options={reservationTypes}
              placeholder="Select a type"
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Guest Selection Area */}
      <Form.Item name="guestSelect" label="Select Guest">
        <Row gutter={16}>
          <Col xs={24} md={18}>
            <Select
              showSearch
              placeholder="Search for a guest by name, email, or phone"
              style={{ width: "100%" }}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={guestsOptions()}
              onSelect={handleGuestSelect}
              allowClear
            />
          </Col>
          <Col xs={24} md={6}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsProfileModalOpen(true)}
              block
            >
              Add New Guest
            </Button>
          </Col>
        </Row>
      </Form.Item>

      {/* Hidden form field to store guest data */}
      <Form.Item name="guests" hidden required>
        <Input hidden />
      </Form.Item>

      <Form.Item name="primaryGuestId" hidden>
        <Input hidden />
      </Form.Item>

      {/* Selected Guests Display */}
      <Card>
        {selectedGuests.length === 0 ? (
          <Empty description="No guests selected yet" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={selectedGuests}
            style={{ maxHeight: 300, overflowY: "auto" }}
            renderItem={(guest) => (
              <List.Item
                actions={[
                  primaryGuest !== guest.id ? (
                    <Button type="link" onClick={() => setAsPrimary(guest.id)}>
                      Set as primary
                    </Button>
                  ) : null,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeGuest(guest.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={primaryGuest === guest.id} color="green">
                      <Avatar icon={<UserOutlined />} />
                    </Badge>
                  }
                  title={
                    <Flex align="center" gap={8}>
                      {guest.fullName}
                      {primaryGuest === guest.id && (
                        <Tag color="green">Primary</Tag>
                      )}
                    </Flex>
                  }
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">{guest.email}</Text>
                      <Text type="secondary">{guest.mobileNo}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>

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
          <Button onClick={prev}>Previous</Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </Space>
      </Flex>

      {/* Profile Form Modal for adding new guests */}
      <ProfileFormModal
        open={isProfileModalOpen}
        module="Guest"
        closeFormModal={() => setIsProfileModalOpen(false)}
        isEditing={false}
        selectedObject={null}
        addItem={addGuestData}
        additionalData={additionalData}
      />
    </>
  );
};

export default RoomCheckInInfoForm;
