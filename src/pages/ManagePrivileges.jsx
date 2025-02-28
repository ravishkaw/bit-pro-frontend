import { Col, Row } from "antd";

import { useAuth } from "../contexts/AuthContext";
import useModalStates from "../hooks/useModalStates";
import usePrivileges from "../hooks/usePrivileges";

import PrivilegeColumnItems from "../components/Table/PrivilegeColumnItems";
import GenericModal from "../components/Modals/GenericModal";
import DeleteConfirmModal from "../components/Modals/DeleteConfirmModal";
import TableCard from "../components/DataDisplay/TableCard";
import PrivilegeForm from "../components/Forms/PrivilegeForm";

// Admin Manage Privileges Page
const ManagePrivileges = () => {
  const object = "privilege"; // Define the object type for privileges

  // Find the module related to "Privilege" in the privileges
  const { privileges } = useAuth();

  const privilegeModulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "Privilege"
  );

  // Destructure functions and states from custom hooks
  const {
    loading,
    filteredPrivileges,
    roles,
    paginationDetails,
    setPaginationDetails,
    loadOnePrivilege,
    addNewPrivilege,
    updateAPrivilege,
    deleteAPrivilege,
  } = usePrivileges();

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
  const columns = PrivilegeColumnItems(
    privilegeModulePrivileges,
    openDeleteModal,
    handleEdit,
    loadOnePrivilege
  );

  // get the filtered privileges ( no Admin )
  const allPrivileges = filteredPrivileges();

  return (
    <>
      <Row>
        <Col span={24}>
          {/* TableCard Component: Displays the list of privileges */}
          <TableCard
            object={object}
            columns={columns}
            rowKey="id"
            dataSource={allPrivileges}
            privileges={privilegeModulePrivileges}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleEdit={handleEdit}
            openFormModal={openFormModal}
            openDeleteModal={openDeleteModal}
          />

          {/* Generic Modal: Used for adding or editing a privilege */}
          <GenericModal
            title="Add new privilege"
            open={open}
            onCancel={closeFormModal}
            width={600}
            footer={null}
          >
            <PrivilegeForm
              roles={roles} // Pass roles to the form for role selection
              closeFormModal={closeFormModal}
              isEditing={isEditing}
              selectedObject={selectedObject}
              addNewPrivilege={addNewPrivilege}
              updateAPrivilege={updateAPrivilege}
            />
          </GenericModal>

          {/* Delete Confirmation Modal: Appears when deleting a privilege */}
          {privileges && privileges.length > 0 && (
            <DeleteConfirmModal
              object={object}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              deleteFunction={deleteAPrivilege}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManagePrivileges;
