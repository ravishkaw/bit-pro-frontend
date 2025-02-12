import { Col, Row } from "antd";

import useUsers from "../../hooks/useUsers";
import useModalStates from "../../hooks/useModalStates";

import { userColumnItems } from "../../components/Table/UsersColumnItems";
import UserFormModal from "../../components/Modals/UserFormModal";
import UserTableCard from "../../components/DataDisplay/UserTableCard";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";

// Admin Manage Users Page
const ManageUsers = () => {
  const personType = "user";

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
          <UserTableCard
            personType={personType}
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

          <UserFormModal
            formModalState={formModalState}
            closeFormModal={closeFormModal}
            addAnUser={addAnUser}
            updateAnUser={updateAnUser}
          />

          {users && users.length > 0 && (
            <>
              {/* Delete confirmation modal */}
              <DeleteConfirmModal
                personType={personType}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                deletePerson={deleteAnUser}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageUsers;
