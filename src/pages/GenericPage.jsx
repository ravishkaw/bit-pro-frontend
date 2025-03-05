import { Col, Row } from "antd";

import { useAuth } from "../contexts/AuthContext";
import useModalStates from "../hooks/useModalStates";

import TableCard from "../components/DataDisplay/TableCard";
import DeleteConfirmModal from "../components/Modals/DeleteConfirmModal";
import UpdateConfirmationModal from "../components/Modals/UpdateConfirmationModal";

// Admin Manage Users Page
const GenericPage = ({
  module,
  rowKey,
  hookData,
  columnItems,
  CustomForm,
  showView = false,
  ViewObject,
}) => {
  // Find the module in the privileges
  const { privileges } = useAuth();

  const modulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === module
  );

  const {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  } = hookData;

  const {
    formModalState,
    openFormModal,
    closeFormModal,
    deleteModal,
    setDeleteModal,
    openDeleteModal,
    viewModal,
    closeViewModal,
    showUpdateModal,
    updateConfirmModal,
    setUpdateConfirmModal,
    handleEdit,
    handleView,
  } = useModalStates();

  const { open, isEditing, selectedObject } = formModalState; // Extract form modal state details

  // Generate table columns dynamically
  const columns = columnItems(
    modulePrivileges,
    openDeleteModal,
    handleEdit,
    loadOneItem,
    handleView
  );

  return (
    <>
      <Row>
        <Col span={24}>
          {/* Displays the list of object from table/ card */}
          <TableCard
            module={module}
            columns={columns}
            rowKey={rowKey}
            dataSource={data}
            privileges={modulePrivileges}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleEdit={handleEdit}
            openFormModal={openFormModal}
            openDeleteModal={openDeleteModal}
            restoreItem={restoreItem}
            loadOneItem={loadOneItem}
          />

          {/* Form for adding or editing a object */}
          <CustomForm
            open={open}
            module={module}
            closeFormModal={closeFormModal}
            isEditing={isEditing}
            selectedObject={selectedObject}
            addItem={addItem}
            updateItem={updateItem}
            showUpdateModal={showUpdateModal}
          />

          {data && data.length > 0 && (
            <>
              {/* Displays detailed information if show view is true */}
              {showView && (
                <ViewObject
                  module={module}
                  viewModal={viewModal}
                  modulePrivileges={modulePrivileges}
                  closeViewModal={closeViewModal}
                  handleEdit={handleEdit}
                  loadOneItem={loadOneItem}
                />
              )}

              {/* Appears when confirming an update */}
              <UpdateConfirmationModal
                updateFunction={updateItem}
                updateConfirmModal={updateConfirmModal}
                setUpdateConfirmModal={setUpdateConfirmModal}
                closeModal={closeFormModal}
              />

              {/* Appears when deleting */}
              <DeleteConfirmModal
                module={module}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                deleteFunction={deleteItem}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default GenericPage;
