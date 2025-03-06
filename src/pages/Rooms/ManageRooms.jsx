import { Row, Col, Card, Tabs, Flex, Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useAuth } from "../../contexts/AuthContext";
import useRooms from "../../hooks/useRooms";
import useModalStates from "../../hooks/useModalStates";

import RoomCard from "../../components/Cards/RoomCard";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import RoomForm from "../../components/Forms/RoomForm";
import ViewRoom from "../../components/Descriptions/ViewRoom";

const ManageRooms = () => {
  let module = "Room"; // Define the module for rooms

  // Find the module related to "Room" in the privileges
  const { privileges } = useAuth();

  const roomModulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === module
  );
  // Destructure functions and states from custom hooks
  const { rooms, setSelectedTab, roomTypes, loadOneItem } = useRooms();

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
  } = useModalStates();

  const { open, isEditing, selectedObject } = formModalState; // Extract modal state details

  // Function to handle tab change
  const handleTabChange = (key) => {
    setSelectedTab({ key: key });
  };

  return (
    <>
      <Card
        bordered={false}
        style={{ marginBottom: 20 }}
        styles={{ body: { padding: "0 20px" } }}
      >
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Flex justify="space-between" align="center">
              <Tabs
                items={roomTypes}
                defaultActiveKey="all"
                onChange={handleTabChange}
              />
              {roomModulePrivileges?.insert_privilege && (
                <Button type="primary" onClick={() => openFormModal(false)}>
                  <PlusOutlined />
                  Add New Room
                </Button>
              )}
            </Flex>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            {/* {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Col lg={6} md={8} sm={12} xs={24} key={index}>
                    <Skeleton active />
                  </Col>
                ))
              :  */}
            {(rooms?.length > 0 &&
              rooms?.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  privileges={roomModulePrivileges}
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
      />

      {rooms && rooms.length > 0 && (
        <>
          {/* View Modal: Displays detailed information about a room */}
          <ViewRoom
            module={module}
            viewModal={viewModal}
            privileges={roomModulePrivileges}
            closeViewModal={closeViewModal}
            handleEdit={handleEdit}
            loadOneRoom={loadOneItem}
          />

          {/* Delete Confirmation Modal: Appears when deleting a room */}
          <DeleteConfirmModal
            module={module}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            deleteFunction={() => console.log("deleted")}
          />
        </>
      )}
    </>
  );
};

export default ManageRooms;
