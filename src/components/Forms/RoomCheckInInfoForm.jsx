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
  Divider,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  TeamOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ProfileFormModal from "../Modals/ProfileFormModal";
import ChildForm from "./ChildForm";
import useGuests from "../../hooks/profile/useGuests";
import FormInputTooltip from "./FormInputTooltip";
import { mapToSelectOptions } from "../../utils/utils";

const { Text } = Typography;

const RoomCheckInInfoForm = ({
  form,
  isEditing,
  setCurrent,
  next,
  prev,
  additionalData,
  formData,
  setFormData,
}) => {
  const [selectedGuestIds, setSelectedGuestIds] = useState(
    formData?.guestIds || []
  );
  const [selectedChildIds, setSelectedChildIds] = useState(
    formData?.childIds || []
  );
  const [primaryGuest, setPrimaryGuest] = useState(
    formData?.primaryGuestId || null
  );

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const [expandedChildSections, setExpandedChildSections] = useState({});

  const [currentParentId, setCurrentParentId] = useState(null);
  const [error, setError] = useState(null);

  const {
    guests,
    children,
    reservationTypes,
    reservationSources,
    addChild,
    addGuest,
  } = additionalData;

  const {
    additionalData: { genders, idTypes, civilStatus, nationalities, titles },
  } = useGuests();

  // Guest options for the select input filtering already selected guests
  const guestsOptions = () => {
    const filteredOptions = guests.filter(
      (guest) => !selectedGuestIds.includes(guest.id)
    );
    return filteredOptions.map((guest) => ({
      label: `${guest.fullName} (${guest.email})`,
      value: guest.id,
    }));
  };

  const mappedGuests = mapToSelectOptions(guests);

  // Child options for the select input filtering already selected children for the parent
  const childrenOptions = (parentId) => {
    const filteredOptions = children.filter(
      (child) =>
        child.guestId === parentId &&
        !selectedChildIds.some((selected) => selected.id === child.id)
    );

    return filteredOptions.map((child) => ({
      label: child.fullName,
      value: child.id,
    }));
  };

  // Add new guest to the selection
  const addGuestToSelection = (guest) => {
    if (!selectedGuestIds.includes(guest.id)) {
      const updatedGuestIds = [...selectedGuestIds, guest.id];
      setSelectedGuestIds(updatedGuestIds);

      // Check if a guest is already set as primary and set it if not
      if (!primaryGuest) {
        setPrimaryGuest(guest.id);
      }

      updateGuestData(
        updatedGuestIds,
        selectedChildIds,
        primaryGuest || guest.id
      );
    }
  };

  // Remove guest from the selection with children
  const removeGuest = (guestId) => {
    const updatedGuestIds = selectedGuestIds.filter((id) => id !== guestId);
    const updatedChildIds = selectedChildIds.filter(
      (child) => child.guestId !== guestId
    );

    setSelectedGuestIds(updatedGuestIds);
    setSelectedChildIds(updatedChildIds);

    // Check if the removed guest was the primary guest and if set the first guest in the list as the new primary guest
    if (primaryGuest === guestId) {
      const newPrimaryId =
        updatedGuestIds.length > 0 ? updatedGuestIds[0] : null;
      setPrimaryGuest(newPrimaryId);
      updateGuestData(updatedGuestIds, updatedChildIds, newPrimaryId);
    } else {
      updateGuestData(updatedGuestIds, updatedChildIds, primaryGuest);
    }
  };

  // Add new child to the selection
  const addChildToSelection = (childId, parentId) => {
    if (!selectedChildIds.some((c) => c.id === childId)) {
      const updatedChildIds = [...selectedChildIds, { id: childId, parentId }];
      setSelectedChildIds(updatedChildIds);
      updateGuestData(selectedGuestIds, updatedChildIds, primaryGuest);
    }
  };

  // Remove child from the selection
  const removeChild = (childId) => {
    const updatedChildIds = selectedChildIds.filter((c) => c.id !== childId);
    setSelectedChildIds(updatedChildIds);
    updateGuestData(selectedGuestIds, updatedChildIds, primaryGuest);
  };

  // Handle guest selection from the dropdown
  const handleGuestSelect = (value) => {
    const selectedGuest = guests.find((g) => g.id === value);
    if (selectedGuest) {
      addGuestToSelection(selectedGuest);
      form.setFieldsValue({ guestSelect: undefined });
    }
  };

  // Handle child selection from the dropdown
  const handleChildSelect = (value, parentId) => {
    const selectedChild = children.find((c) => c.id === value);
    if (selectedChild) {
      addChildToSelection(value, parentId);
    }
  };

  // Set the selected guest as primary
  const setAsPrimary = (guestId) => {
    setPrimaryGuest(guestId);
    updateGuestData(selectedGuestIds, selectedChildIds, guestId);
  };

  // Update the form values for guests and children
  const updateGuestData = (guestIds, childIds, primaryId) => {
    // Exclude primary guest from guestIds
    const filteredGuestIds = guestIds.filter((id) => id !== primaryId);
    form.setFieldsValue({
      guestIds: filteredGuestIds,
      childIds: childIds,
      primaryGuestId: primaryId,
    });
  };

  // Toggle the child section for a specific guest
  const toggleChildSection = (guestId) => {
    setExpandedChildSections((prev) => ({
      ...prev,
      [guestId]: !prev[guestId],
    }));
  };

  // Open the child modal for adding a new child
  const openAddChildModal = (parentId) => {
    setCurrentParentId(parentId);
    setIsChildModalOpen(true);
  };

  // Handle next button click
  const handleNext = () => {
    const selectedGuests = form.getFieldValue("guestIds");
    const primaryGuestId = form.getFieldValue("primaryGuestId");

    if (!selectedGuests || selectedGuests.length === 0 || !primaryGuestId) {
      setError("Please select at least one guest");
      return;
    }
    setError(null);
    next();
  };

  // Handle reset button click
  const handleReset = () => {
    form.resetFields();
    setCurrent(0);
    setPrimaryGuest(null);
    setSelectedGuestIds([]);
    setSelectedChildIds([]);
    setError(null);
    setFormData({});
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
            name="roomReservationSourceId"
            label={
              <FormInputTooltip
                label="Reservation Source"
                title="Select the source of the reservation"
              />
            }
            rules={[{ required: true, message: "Please select a source" }]}
            hasFeedback
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
            name="reservationTypeId"
            label={
              <FormInputTooltip
                label="Reservation Type"
                title="Select the type of the room reservation"
              />
            }
            rules={[{ required: true, message: "Please select a type" }]}
            hasFeedback
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

      <Form.Item
        name="guestSelect"
        label={
          <FormInputTooltip
            label="Select Guest"
            title="Select guest/s and children for the reservation"
          />
        }
        hasFeedback
      >
        <Row gutter={16}>
          <Col xs={24} md={18}>
            <Select
              showSearch
              placeholder="Search a guest by name or email"
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

      <Form.Item name="guestIds" hidden>
        <Input hidden />
      </Form.Item>

      <Form.Item name="childIds" hidden>
        <Input hidden />
      </Form.Item>

      <Form.Item name="primaryGuestId" hidden>
        <Input hidden />
      </Form.Item>

      <Card>
        {selectedGuestIds.length === 0 ? (
          <Empty description="No guests selected yet" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={selectedGuestIds.map((id) =>
              guests.find((g) => g.id === id)
            )}
            style={{ maxHeight: 500, overflowY: "auto", overflowX: "hidden" }}
            renderItem={(guest) => (
              <>
                <List.Item
                  actions={[
                    primaryGuest !== guest.id ? (
                      <Button
                        type="link"
                        onClick={() => setAsPrimary(guest.id)}
                      >
                        Set as primary
                      </Button>
                    ) : null,
                    <Button
                      type="text"
                      icon={<PlusCircleOutlined />}
                      onClick={() => toggleChildSection(guest.id)}
                    >
                      {expandedChildSections[guest.id]
                        ? "Hide children"
                        : "Add children"}
                    </Button>,
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
                      </Space>
                    }
                  />
                </List.Item>

                {expandedChildSections[guest.id] && (
                  <div
                    style={{ marginLeft: 48, marginBottom: 12, marginTop: 8 }}
                  >
                    <Flex align="center" justify="space-between">
                      <Space>
                        <TeamOutlined />
                        <Text type="secondary">Children</Text>
                      </Space>
                      <Select
                        placeholder="Select existing child"
                        options={childrenOptions(guest.id)}
                        onSelect={(value) => handleChildSelect(value, guest.id)}
                        allowClear
                        showSearch
                        style={{ width: 250 }}
                        suffixIcon={
                          <Tooltip title="Add child">
                            <Button
                              size="small"
                              type="dashed"
                              icon={<UserAddOutlined />}
                              onClick={() => openAddChildModal(guest.id)}
                            />
                          </Tooltip>
                        }
                      />
                    </Flex>

                    {selectedChildIds.filter(
                      (child) => child.parentId === guest.id
                    ).length > 0 ? (
                      <List
                        size="small"
                        dataSource={selectedChildIds
                          .filter((child) => child.parentId === guest.id)
                          .map(({ id }) => children.find((c) => c.id === id))}
                        renderItem={(child) => (
                          <List.Item
                            actions={[
                              <Button
                                type="text"
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={() => removeChild(child.id)}
                              />,
                            ]}
                          >
                            <List.Item.Meta
                              avatar={
                                <Avatar size="small" icon={<UserOutlined />} />
                              }
                              title={child.fullName}
                            />
                          </List.Item>
                        )}
                        style={{ marginTop: 8 }}
                      />
                    ) : (
                      <Text
                        type="secondary"
                        italic
                        style={{ display: "block", marginTop: 8 }}
                      >
                        No children added
                      </Text>
                    )}
                  </div>
                )}

                {selectedGuestIds.indexOf(guest.id) <
                  selectedGuestIds.length - 1 && (
                  <Divider style={{ margin: "8px 0" }} />
                )}
              </>
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

      <ProfileFormModal
        open={isProfileModalOpen}
        module="Guest"
        closeFormModal={() => setIsProfileModalOpen(false)}
        isEditing={false}
        selectedObject={null}
        addItem={addGuest}
        additionalData={{
          genders,
          idTypes,
          civilStatus,
          nationalities,
          titles,
        }}
      />

      {isChildModalOpen && (
        <ChildForm
          open={isChildModalOpen}
          closeFormModal={() => setIsChildModalOpen(false)}
          isEditing={false}
          selectedObject={null}
          module="Child"
          addItem={addChild}
          additionalData={{ genders, nationalities, guests: mappedGuests }}
          parentId={currentParentId}
        />
      )}
    </>
  );
};

export default RoomCheckInInfoForm;
