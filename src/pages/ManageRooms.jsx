import { Row, Col, Card, Tabs, Flex, Empty, Button } from "antd";

import useRooms from "../hooks/useRooms";
import useModalStates from "../hooks/useModalStates";

import RoomCard from "../components/Cards/RoomCard";
import DeleteConfirmModal from "../components/Modals/DeleteConfirmModal";
import GenericModal from "../components/Modals/GenericModal";
import RoomForm from "../components/Forms/RoomForm";
import ViewRoom from "../components/Descriptions/ViewRoom";

const ManageRooms = () => {
  let object = "room"; // Define the object type for rooms

  // Destructure functions and states from custom hooks
  const { rooms, loading, setSelectedTab, roomTypes, loadOneRoom } = useRooms();

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
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Flex justify="end">
              <Button type="primary" onClick={() => openFormModal(false)}>
                Add New Room
              </Button>
            </Flex>
            <Tabs
              items={roomTypes}
              defaultActiveKey="all"
              onChange={handleTabChange}
            />
          </Col>
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
                    handleView={handleView}
                    handleEdit={handleEdit}
                    openDeleteModal={openDeleteModal}
                    loadOneRoom={loadOneRoom}
                  />
                ))) || (
                <Col span={24}>
                  <Empty description="No rooms found" />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Add/ edit form modal */}
      <GenericModal
        title={isEditing ? "Edit room" : "Add new room"}
        open={open}
        width={800}
        onCancel={closeFormModal}
        footer={null}
      >
        <RoomForm selectedObject={selectedObject} />
      </GenericModal>

      {rooms && rooms.length > 0 && (
        <>
          {/* View Modal: Displays detailed information about a room */}
          <GenericModal
            title={null}
            open={viewModal.open}
            width={800}
            onCancel={closeViewModal}
            footer={null}
          >
            <ViewRoom
              object={object}
              selectedRoom={viewModal.selectedObject}
              closeViewModal={closeViewModal}
              handleEdit={handleEdit}
              loadOneRoom={loadOneRoom}
            />
          </GenericModal>

          {/* Delete Confirmation Modal: Appears when deleting a room */}
          <DeleteConfirmModal
            object={object}
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
