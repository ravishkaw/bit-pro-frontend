import {
  Row,
  Col,
  Card,
  Flex,
  Empty,
  Button,
  Space,
  Skeleton,
  Select,
  Typography,
  Input,
  Statistic,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { useAuth } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import useRooms from "../../hooks/useRooms";
import useModalStates from "../../hooks/useModalStates";

import RoomCard from "../../components/Cards/RoomCard";
import DeleteRestoreConfirmationModal from "../../components/Modals/DeleteRestoreConfirmationModal";
import UpdateConfirmationModal from "../../components/Modals/UpdateConfirmationModal";
import RoomForm from "../../components/Forms/RoomForm";
import ViewRoom from "../../components/DataDisplay/ViewRoom";

import { mapToSelectOptions } from "../../utils/utils";

const ManageRooms = () => {
  let module = "Room"; // Define the module for rooms

  // Find the module related to "Room" in the privileges
  const { privileges } = useAuth();
  const { isDarkMode } = useThemeContext();

  const modulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === module
  );

  // Destructure functions and states from custom hooks
  const {
    rooms,
    loading,
    setSelectedTab,
    additionalData,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  } = useRooms();

  const {
    formModalState,
    openFormModal,
    closeFormModal,
    viewModal,
    closeViewModal,
    deleteRestoreModal,
    opendeleteRestoreModal,
    closedeleteRestoreModal,
    handleEdit,
    handleView,
    updateConfirmModal,
    showUpdateConfirmModal,
    closeUpdateConfirmModal,
  } = useModalStates();

  const { open, isEditing, selectedObject } = formModalState; // Extract modal state details
  const { roomTypes } = additionalData;

  const mappedRoomTypes = mapToSelectOptions(roomTypes);

  // Function to handle tab change
  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title="Total Rooms"
              value={0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title="Available Rooms"
              value={0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title="Available Rooms"
              value={0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              valueRender={() => (
                <Flex vertical gap={8}>
                  <Button>Manage Room Facilities</Button>
                  <Button>Manage Room Inventories</Button>
                </Flex>
              )}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
      <Card
        variant="borderless"
        style={{ position: "sticky", top: 68, zIndex: 1, marginBottom: 16 }}
      >
        <Flex align="center" gap={8} wrap>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Filter Rooms
          </Typography.Title>
          <Typography.Text>By room type</Typography.Text>
          <Select
            placeholder="select the room type"
            options={[
              {
                value: "all",
                label: "All Rooms",
              },
              ...mappedRoomTypes,
            ]}
            onChange={handleTabChange}
            defaultValue={"all"}
          />
          <Select placeholder="by availability" />
          <Space size="large" align="center">
            <Input.Search
              allowClear
              placeholder="Search rooms"
              enterButton={
                <Button type={isDarkMode ? "primary" : "default"}>
                  <SearchOutlined />
                </Button>
              }
            />
            {modulePrivileges?.insert_privilege && (
              <Button type="primary" onClick={() => openFormModal(false)}>
                <PlusOutlined />
                Add New Room
              </Button>
            )}
          </Space>
        </Flex>
      </Card>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Col md={8} sm={12} xs={24} key={index}>
                    <Skeleton active />
                  </Col>
                ))
              : (rooms?.length > 0 &&
                  rooms?.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      modulePrivileges={modulePrivileges}
                      handleView={handleView}
                      handleEdit={handleEdit}
                      opendeleteRestoreModal={opendeleteRestoreModal}
                      loadOneRoom={loadOneItem}
                    />
                  ))) || (
                  <Col span={24}>
                    <Empty description="No rooms found" />
                  </Col>
                )}
          </Row>
        </Col>
      </Row>

      {/* Add/ edit form modal */}
      <RoomForm
        isEditing={isEditing}
        open={open}
        module={module}
        closeFormModal={closeFormModal}
        selectedObject={selectedObject}
        addItem={addItem}
        showUpdateConfirmModal={showUpdateConfirmModal}
        additionalData={additionalData}
      />

      {rooms && rooms.length > 0 && (
        <>
          {/* Displays detailed information about a room */}
          <ViewRoom
            module={module}
            viewModal={viewModal}
            modulePrivileges={modulePrivileges}
            closeViewModal={closeViewModal}
            handleEdit={handleEdit}
            loadOneRoom={loadOneItem}
            additionalData={additionalData}
          />

          {/* Appears when deleting a room */}
          <DeleteRestoreConfirmationModal
            module={module}
            deleteRestoreModal={deleteRestoreModal}
            closedeleteRestoreModal={closedeleteRestoreModal}
            deleteItem={deleteItem}
            restoreItem={restoreItem}
          />

          {/* Appears when confirming an update */}
          <UpdateConfirmationModal
            updateFunction={updateItem}
            updateConfirmModal={updateConfirmModal}
            closeUpdateConfirmModal={closeUpdateConfirmModal}
            closeModal={closeFormModal}
          />
        </>
      )}
    </>
  );
};

export default ManageRooms;
