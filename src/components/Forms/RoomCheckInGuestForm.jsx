import { useState } from "react";
import {
  Form,
  Select,
  Button,
  Card,
  Divider,
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
  Tooltip,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ProfileFormModal from "../Modals/ProfileFormModal";

const { Title, Text } = Typography;

const RoomCheckInGuestForm = ({ form, formData, setFormData }) => {
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [primaryGuest, setPrimaryGuest] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Mock guest data - this would come from your API
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+94 77 123 4567",
      idNumber: "982731465V",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+94 71 456 7890",
      idNumber: "895623147X",
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert@example.com",
      phone: "+94 76 789 0123",
      idNumber: "761294538Y",
    },
  ]);

  // Add a new guest from ProfileFormModal
  const handleAddGuest = (guestData) => {
    const newGuest = {
      id: guests.length + 1,
      name: `${guestData.firstName} ${guestData.lastName}`,
      email: guestData.email,
      phone: guestData.phoneNumber,
      idNumber: guestData.idNumber,
    };

    setGuests([...guests, newGuest]);
    addGuestToSelection(newGuest);
  };

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
      updateFormData(updatedGuests, primaryGuest || guest.id);
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
      updateFormData(updatedGuests, newPrimaryId);
    } else {
      updateFormData(updatedGuests, primaryGuest);
    }
  };

  // Set a guest as primary
  const setAsPrimary = (guestId) => {
    setPrimaryGuest(guestId);
    updateFormData(selectedGuests, guestId);
  };

  // Update form data with the current guest selection
  const updateFormData = (guestList, primaryId) => {
    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        guests: guestList,
        primaryGuestId: primaryId,
      }));
    }

    // Update form fields
    form.setFieldsValue({
      guestDetails: {
        guests: guestList,
        primaryGuestId: primaryId,
      },
    });
  };

  // Filter out already selected guests
  const getFilteredOptions = () => {
    return guests.filter(
      (guest) => !selectedGuests.some((selected) => selected.id === guest.id)
    );
  };

  return (
    <>
      {/* Guest Selection Area */}
      <Form.Item
        name="guestSelect"
        label="Select Guest"
        rules={[{ required: false }]}
      >
        <Row gutter={16}>
          <Col xs={24} md={18}>
            <Select
              showSearch
              placeholder="Search for a guest by name or ID"
              style={{ width: "100%" }}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={getFilteredOptions().map((guest) => ({
                value: guest.id,
                label: `${guest.name} (${guest.idNumber})`,
              }))}
              onSelect={(value) => {
                const selectedGuest = guests.find((g) => g.id === value);
                if (selectedGuest) {
                  addGuestToSelection(selectedGuest);
                }
              }}
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
      <Form.Item name={["guestDetails", "guests"]} hidden>
        <input type="hidden" />
      </Form.Item>

      <Form.Item name={["guestDetails", "primaryGuestId"]} hidden>
        <input type="hidden" />
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
                      {guest.name}
                      {primaryGuest === guest.id && (
                        <Tag color="green">Primary</Tag>
                      )}
                    </Flex>
                  }
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">{guest.email}</Text>
                      <Text type="secondary">{guest.phone}</Text>
                      <Text type="secondary">ID: {guest.idNumber}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      {/* Profile Form Modal for adding new guests */}
      <ProfileFormModal
        open={isProfileModalOpen}
        module="Guest"
        closeFormModal={() => setIsProfileModalOpen(false)}
        isEditing={false}
        selectedObject={null}
        addItem={handleAddGuest}
        additionalData={{
          nationalities: [],
          idTypes: [],
          genders: [],
          civilStatus: [],
          titles: [],
        }}
      />
    </>
  );
};

export default RoomCheckInGuestForm;
