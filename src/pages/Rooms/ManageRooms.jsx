import {
  Row,
  Col,
  Card,
  Tabs,
  Flex,
  Empty,
  Button,
  Space,
  Skeleton,
  Select,
  Typography,
  Input,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { useAuth } from "../../contexts/AuthContext";
import useRooms from "../../hooks/useRooms";
import useModalStates from "../../hooks/useModalStates";

import RoomCard from "../../components/Cards/RoomCard";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import UpdateConfirmationModal from "../../components/Modals/UpdateConfirmationModal";
import RoomForm from "../../components/Forms/RoomForm";
import ViewRoom from "../../components/DataDisplay/ViewRoom";
import Styles from "../../constants/Styles";
import { useThemeContext } from "../../contexts/ThemeContext";
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
  } = useRooms();

  const { boxShadow } = Styles();

  const {
    formModalState,
    openFormModal,
    closeFormModal,
    viewModal,
    closeViewModal,
    deleteModal,
    setDeleteModal,
    openDeleteModal,
    handleEdit,
    handleView,
    showUpdateModal,
    updateConfirmModal,
    setUpdateConfirmModal,
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
      <Card
        variant="borderless"
        style={{ ...boxShadow, marginBottom: 20 }}
        styles={{ body: { padding: 20 } }}
      >
        <Row gutter={[20, 20]}>
          <Col md={12} xs={24}>
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
            </Flex>
          </Col>
          <Col md={12} xs={24}>
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
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={24}>
          <Row gutter={[20, 20]}>
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
                      openDeleteModal={openDeleteModal}
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
        showUpdateModal={showUpdateModal}
        additionalData={additionalData}
        mappedRoomTypes={mappedRoomTypes}
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
          <DeleteConfirmModal
            module={module}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            deleteFunction={deleteItem}
          />

          {/* Appears when confirming an update */}
          <UpdateConfirmationModal
            updateFunction={updateItem}
            updateConfirmModal={updateConfirmModal}
            setUpdateConfirmModal={setUpdateConfirmModal}
            closeModal={closeFormModal}
          />
        </>
      )}
    </>
  );
};

export default ManageRooms;
