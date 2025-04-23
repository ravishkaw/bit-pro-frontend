import { Col, Row } from "antd";

import { useAuth } from "../contexts/AuthContext";
import useModalStates from "../hooks/common/useModalStates";

import TableCard from "../components/DataDisplay/TableCard";
import DeleteRestoreConfirmationModal from "../components/Modals/DeleteRestoreConfirmationModal";
import UpdateConfirmationModal from "../components/Modals/UpdateConfirmationModal";

// generic page ( table / card with add, serach)
const GenericPage = ({
  module, // nodule name
  rowKey, // key to use in table
  hookData, // data and methods of the hook
  columnItems, // table coloumn items
  CustomForm, // add / edit form
  showView = false, // if there is view modal
  ViewObject, // view modal component
}) => {
  // Find the module in the privileges
  const { privileges } = useAuth();

  const modulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === module
  );

  // destruct hook data
  const {
    data,
    additionalData,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  } = hookData;

  // get modal states
  const {
    formModalState,
    openFormModal,
    closeFormModal,
    handleEdit,
    handleView,
    deleteRestoreModal,
    opendeleteRestoreModal,
    closedeleteRestoreModal,
    viewModal,
    closeViewModal,
    updateConfirmModal,
    showUpdateConfirmModal,
    closeUpdateConfirmModal,
  } = useModalStates();

  // Extract form modal state details
  const { open, isEditing, selectedObject } = formModalState;

  // Generate table columns dynamically
  const columns = columnItems(
    modulePrivileges,
    handleEdit,
    loadOneItem,
    handleView,
    opendeleteRestoreModal
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
            handleView={handleView}
            openFormModal={openFormModal}
            opendeleteRestoreModal={opendeleteRestoreModal}
            loadOneItem={loadOneItem}
            showView={showView}
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
            showUpdateConfirmModal={showUpdateConfirmModal}
            additionalData={additionalData}
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
                  additionalData={additionalData}
                />
              )}

              {/* Appears when confirming an update */}
              <UpdateConfirmationModal
                updateFunction={updateItem}
                updateConfirmModal={updateConfirmModal}
                closeUpdateConfirmModal={closeUpdateConfirmModal}
                closeModal={closeFormModal}
              />

              {/* Appears when deleting or restore */}
              <DeleteRestoreConfirmationModal
                deleteRestoreModal={deleteRestoreModal}
                closedeleteRestoreModal={closedeleteRestoreModal}
                deleteItem={deleteItem}
                restoreItem={restoreItem}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default GenericPage;
