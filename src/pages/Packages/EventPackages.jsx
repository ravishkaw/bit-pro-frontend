import { Col, Row, Skeleton, Empty, Pagination } from "antd";

import DeleteRestoreConfirmationModal from "../../components/Modals/DeleteRestoreConfirmationModal";
import UpdateConfirmationModal from "../../components/Modals/UpdateConfirmationModal";

import RoomPackageCard from "../../components/Cards/RoomPackageCard";
import EventPackageForm from "../../components/Forms/EventPackageForm";

const EventPackages = ({ modulePrivileges, hookData, modalStates }) => {
  const roomPackageModule = "Event Package"; // Define the module for event package

  // Destructure functions and states from custom hooks
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
  } = hookData;

  const {
    formModalState,
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
  } = modalStates;

  const { open, isEditing, selectedObject } = formModalState; // Extract modal state details

  return (
    <>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Col md={8} sm={12} xs={24} key={index}>
                    <Skeleton active />
                  </Col>
                ))
              : (data?.length > 0 &&
                  data?.map((roomPackage) => (
                    <RoomPackageCard
                      key={roomPackage.id}
                      roomPackage={roomPackage}
                      modulePrivileges={modulePrivileges}
                      handleView={handleView}
                      handleEdit={handleEdit}
                      opendeleteRestoreModal={opendeleteRestoreModal}
                      loadOneItem={loadOneItem}
                    />
                  ))) || (
                  <Col span={24}>
                    <Empty description="No Event Packages found" />
                  </Col>
                )}
          </Row>
        </Col>
      </Row>

      {/* Add/ edit form modal */}
      <EventPackageForm
        module={roomPackageModule}
        isEditing={isEditing}
        open={open}
        closeFormModal={closeFormModal}
        selectedObject={selectedObject}
        addItem={addItem}
        showUpdateConfirmModal={showUpdateConfirmModal}
      />

      {data && data.length > 0 && (
        <>
          {/* Displays detailed information about a room */}
          {/* <ViewRoom
            module={roomPackageModule}
            viewModal={viewModal}
            modulePrivileges={modulePrivileges}
            closeViewModal={closeViewModal}
            handleEdit={handleEdit}
            loadOneRoom={loadOneItem}
            additionalData={additionalData}
          /> */}

          {/* Appears when deleting a room */}
          <DeleteRestoreConfirmationModal
            module={roomPackageModule}
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

export default EventPackages;
