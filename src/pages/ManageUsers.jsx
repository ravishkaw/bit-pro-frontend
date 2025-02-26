import { Col, Row } from "antd";

import { useAuth } from "../contexts/AuthContext";
import useUsers from "../hooks/useUsers";
import useModalStates from "../hooks/useModalStates";

import TableCard from "../components/DataDisplay/TableCard";
import { userColumnItems } from "../components/Table/UsersColumnItems";
import GenericModal from "../components/Modals/GenericModal";
import UserForm from "../components/Forms/UserForm";
import DeleteConfirmModal from "../components/Modals/DeleteConfirmModal";

// Admin Manage Users Page
const ManageUsers = () => {
  const object = "user"; // Define the object type for users

  // Find the module related to "User" in the privileges
  const { privileges } = useAuth();

  const userModulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "User"
  );

  // Destructure functions and states from custom hooks
  const {
    loading,
    users,
    loadOneUser,
    addAnUser,
    updateAnUser,
    deleteAnUser,
    paginationDetails,
    setPaginationDetails,
  } = useUsers();

  const {
    formModalState,
    openFormModal,
    closeFormModal,
    deleteModal,
    setDeleteModal,
    openDeleteModal,
  } = useModalStates();

  const { open, isEditing, selectedObject } = formModalState; // Extract modal state details

  // Handle edit action: Load user data and open the form modal
  const handleEdit = async (userId) => {
    const user = await loadOneUser(userId);
    openFormModal(true, user);
  };

  // Generate table columns dynamically using userColumnItems
  const columns = userColumnItems(
    userModulePrivileges,
    openDeleteModal,
    handleEdit
  );

  return (
    <>
      <Row>
        <Col span={24}>
          {/* TableCard Component: Displays the list of users */}
          <TableCard
            object={object}
            columns={columns}
            rowKey="username"
            dataSource={users}
            privileges={userModulePrivileges}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleEdit={handleEdit}
            openFormModal={openFormModal}
            openDeleteModal={openDeleteModal}
          />

          {/* Generic Modal: Used for adding or editing a user */}
          <GenericModal
            title="System User"
            open={open}
            onCancel={closeFormModal}
            width={600}
            footer={null}
          >
            <UserForm
              closeFormModal={closeFormModal}
              isEditing={isEditing}
              selectedObject={selectedObject}
              addAnUser={addAnUser}
              updateAnUser={updateAnUser}
            />
          </GenericModal>

          {/* Delete Confirmation Modal: Appears when deleting a user */}
          {users && users.length > 0 && (
            <DeleteConfirmModal
              object={object}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              deleteFunction={deleteAnUser}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageUsers;
