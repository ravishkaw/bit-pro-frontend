import { Col, Row } from "antd";

import { useAuth } from "../../contexts/AuthContext";
import useRoomTypes from "../../hooks/useRoomsTypes";
import useModalStates from "../../hooks/useModalStates";

import { RoomTypeColumns } from "../../components/Table/RoomAndReservation";
import TableCard from "../../components/DataDisplay/TableCard";
import RoomTypeForm from "../../components/Forms/RoomTypeForm";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import GenericModal from "../../components/Modals/GenericModal";

// Room Types page
const ManageRoomTypes = () => {
  const object = "room type"; // Define the object type for room type

  // Find the module related to "Room Type" in the privileges
  const { privileges } = useAuth();

  const roomTypeModulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "Room Type"
  );

  // Destructure functions and states from custom hooks
  const {
    loading,
    roomTypes,
    paginationDetails,
    setPaginationDetails,
    loadOneRoomType,
    addAnRoomType,
    updateAnRoomType,
    deleteAnRoomType,
  } = useRoomTypes();

  const {
    formModalState,
    openFormModal,
    closeFormModal,
    deleteModal,
    setDeleteModal,
    openDeleteModal,
    handleEdit,
  } = useModalStates();

  const { open, isEditing, selectedObject } = formModalState; // Extract modal state details

  // Generate table columns dynamically using PrivilegeColumnItems
  const columns = RoomTypeColumns(
    roomTypeModulePrivileges,
    openDeleteModal,
    handleEdit,
    loadOneRoomType
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <TableCard
            object={object}
            columns={columns}
            rowKey="id"
            dataSource={roomTypes}
            privileges={roomTypeModulePrivileges}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleEdit={handleEdit}
            openFormModal={openFormModal}
            openDeleteModal={openDeleteModal}
            apiFunction={loadOneRoomType}
          />

          {/* Generic Modal: Used for adding or editing a room type */}
          <GenericModal
            title="Room Types"
            open={open}
            onCancel={closeFormModal}
            width={600}
            footer={null}
          >
            <RoomTypeForm
              closeFormModal={closeFormModal}
              isEditing={isEditing}
              selectedObject={selectedObject}
              addAnRoomType={addAnRoomType}
              updateAnRoomType={updateAnRoomType}
            />
          </GenericModal>

          {/* Delete Confirmation Modal: Appears when deleting a room type */}
          {roomTypes && roomTypes.length > 0 && (
            <DeleteConfirmModal
              object={object}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              deleteFunction={deleteAnRoomType}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageRoomTypes;
