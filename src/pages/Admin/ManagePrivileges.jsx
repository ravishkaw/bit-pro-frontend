import { Col, Row } from "antd";

import useModalStates from "../../hooks/useModalStates";
import usePrivileges from "../../hooks/usePrivileges";

import PrivilegeColumnItems from "../../components/Table/PrivilegeColumnItems";
import GenericModal from "../../components/Modals/GenericModal";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import TableCard from "../../components/DataDisplay/TableCard";
import PrivilegeForm from "../../components/Forms/PrivilegeForm";

const ManagePrivileges = () => {
  const object = "privilege";

  const {
    loading,
    privileges,
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
  } = useModalStates();

  // Handle edit
  const handleEdit = async (privilegeId) => {
    const privilege = await loadOnePrivilege(privilegeId);    
    openFormModal(true, privilege);
  };

  const { open, isEditing, selectedObject } = formModalState;

  const columns = PrivilegeColumnItems(openDeleteModal, handleEdit);
  return (
    <>
      <Row>
        <Col span={24}>
          <TableCard
            object={object}
            columns={columns}
            rowKey="id"
            dataSource={privileges}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleEdit={handleEdit}
            openFormModal={openFormModal}
            openDeleteModal={openDeleteModal}
          />

          <GenericModal
            title="Add new privilege"
            open={open}
            onCancel={closeFormModal}
            width={600}
            footer={null}
          >
            <PrivilegeForm
              roles={roles}
              closeFormModal={closeFormModal}
              isEditing={isEditing}
              selectedObject={selectedObject}
              addNewPrivilege={addNewPrivilege}
              updateAPrivilege={updateAPrivilege}
            />
          </GenericModal>

          {privileges && privileges.length > 0 && (
            <>
              {/* Delete confirmation modal */}
              <DeleteConfirmModal
                object={object}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                deleteFunction={deleteAPrivilege}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
export default ManagePrivileges;
