import { Row, Col, Empty, Skeleton } from "antd";

import { useAuth } from "../../contexts/AuthContext";

import useRooms from "../../hooks/room/useRooms";
import useModalStates from "../../hooks/common/useModalStates";

import RoomCard from "../../components/Cards/RoomCard";
import RoomFilter from "../../components/Cards/RoomFilter";
import ViewRoom from "../../components/DataDisplay/ViewRoom";
import RoomStatistics from "../../components/Statistics/RoomStatistics";

import DeleteRestoreConfirmationModal from "../../components/Modals/DeleteRestoreConfirmationModal";
import UpdateConfirmationModal from "../../components/Modals/UpdateConfirmationModal";

import RoomForm from "../../components/Forms/RoomForm";

import { mapToSelectOptions } from "../../utils/utils";

const ManageRooms = () => {
  let roomModule = "Room"; // Define the module for rooms

  // Find the module related to "Room" in the privileges
  const { privileges } = useAuth();

  const modulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === roomModule
  );

  // Destructure functions and states from custom hooks
  const {
    rooms,
    loading,
    additionalData,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    applyFilters,
    filters,
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
  const { roomTypes, roomStatus } = additionalData;

  const mappedRoomTypes = mapToSelectOptions(roomTypes);

  const handleFilterChange = (newFilters) => {
    applyFilters(newFilters);
  };

  return (
    <>
      <RoomStatistics rooms={rooms} />
      <RoomFilter
        mappedRoomTypes={mappedRoomTypes}
        roomStatus={roomStatus}
        modulePrivileges={modulePrivileges}
        openFormModal={openFormModal}
        onFilter={handleFilterChange}
        filters={filters}
      />
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
        module={roomModule}
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
            module={roomModule}
            viewModal={viewModal}
            modulePrivileges={modulePrivileges}
            closeViewModal={closeViewModal}
            handleEdit={handleEdit}
            loadOneRoom={loadOneItem}
            additionalData={additionalData}
          />

          {/* Appears when deleting a room */}
          <DeleteRestoreConfirmationModal
            module={roomModule}
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
