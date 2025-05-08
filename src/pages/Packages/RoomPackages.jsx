import { Col, Row, Skeleton, Empty } from "antd";

import DeleteRestoreConfirmationModal from "../../components/Modals/DeleteRestoreConfirmationModal";
import UpdateConfirmationModal from "../../components/Modals/UpdateConfirmationModal";

import PackageCard from "../../components/Cards/PackageCard";
import RoomPackageForm from "../../components/Forms/RoomPackageForm";

const RoomPackages = ({ modulePrivileges, hookData, modalStates }) => {
  const roomPackageModule = "Room Package"; // Define the module for room package

  // Destructure functions and states from custom hooks
  const {
    data,
    additionalData,
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
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Col lg={6} md={8} sm={12} xs={24} key={index}>
                    <Skeleton active />
                  </Col>
                ))
              : (data?.length > 0 &&
                  data?.map((roomPackage) => (
                    <PackageCard
                      key={roomPackage.id}
                      packages={roomPackage}
                      modulePrivileges={modulePrivileges}
                      handleView={handleView}
                      handleEdit={handleEdit}
                      opendeleteRestoreModal={opendeleteRestoreModal}
                      loadOneItem={loadOneItem}
                    />
                  ))) || (
                  <Col span={24}>
                    <Empty description="No Room Packages found" />
                  </Col>
                )}
          </Row>
        </Col>
      </Row>

      {/* Add/ edit form modal */}
      <RoomPackageForm
        module={roomPackageModule}
        additionalData={additionalData}
        isEditing={isEditing}
        open={open}
        closeFormModal={closeFormModal}
        selectedObject={selectedObject}
        addItem={addItem}
        showUpdateConfirmModal={showUpdateConfirmModal}
      />

      {data && data.length > 0 && (
        <>
          {/* Appears when deleting a room package*/}
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

export default RoomPackages;
