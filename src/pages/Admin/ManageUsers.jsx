import { Col, Row } from "antd";

import useUsers from "../../hooks/useUsers";
import useModalStates from "../../hooks/useModalStates";

import TableCard from "../../components/DataDisplay/TableCard";
import { userColumnItems } from "../../components/Table/UsersColumnItems";
import GenericModal from "../../components/Modals/GenericModal";
import UserForm from "../../components/Forms/UserForm";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";

// Admin Manage Users Page
const ManageUsers = () => {
  const object = "user";

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

  const { open, isEditing, selectedObject } = formModalState;

  // Handle edit
  const handleEdit = async (userId) => {
    const user = await loadOneUser(userId);
    openFormModal(true, user);
  };

  const columns = userColumnItems(openDeleteModal, handleEdit);
  return (
    <>
      <Row>
        <Col span={24}>
          <TableCard
            object={object}
            columns={columns}
            rowKey="username"
            dataSource={users}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleEdit={handleEdit}
            openFormModal={openFormModal}
            openDeleteModal={openDeleteModal}
          />

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

          {users && users.length > 0 && (
            <>
              {/* Delete confirmation modal */}
              <DeleteConfirmModal
                object={object}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                deleteFunction={deleteAnUser}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageUsers;
