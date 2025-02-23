import { Col, Row } from "antd";
import useEmployees from "../hooks/useEmployees";
import useModalStates from "../hooks/useModalStates";
import { employeeColumnItems } from "../components/Table/EmployeeColumnItems";
import TableCard from "../components/DataDisplay/TableCard";
import ViewPerson from "../components/Descriptions/ViewPerson";
import GenericModal from "../components/Modals/GenericModal";
import ProfileFormModal from "../components/Modals/ProfileFormModal";
import DeleteConfirmModal from "../components/Modals/DeleteConfirmModal";
import UpdateConfirmModal from "../components/Modals/UpdateConfirmModal";

// Admin Manage Employees Page
const ManageEmployee = () => {
  const object = "employee"; // Define the object type for employees

  // Destructure functions and states from custom hooks
  const {
    employees,
    loadOneEmployee,
    addAnEmployee,
    updateAnEmployee,
    deleteAnEmployee,
    restoreAnEmployee,
    loading,
    paginationDetails,
    setPaginationDetails,
    designations,
    employeeStatus,
  } = useEmployees();

  const {
    formModalState,
    updateConfirmModal,
    setUpdateConfirmModal,
    viewModal,
    deleteModal,
    setDeleteModal,
    openFormModal,
    closeFormModal,
    closeViewModal,
    openDeleteModal,
    showUpdateModal,
    handleEdit,
    handleView,
  } = useModalStates();

  // Generate table columns dynamically using employeeColumnItems
  const columns = employeeColumnItems(
    handleView,
    handleEdit,
    loadOneEmployee,
    openDeleteModal,
    restoreAnEmployee
  );

  return (
    <>
      <Row>
        <Col span={24}>
          {/* Data view table and card for mobile */}
          <TableCard
            object={object}
            columns={columns}
            rowKey="empNo"
            dataSource={employees}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            openFormModal={openFormModal}
            handleView={handleView}
            handleEdit={handleEdit}
            openDeleteModal={openDeleteModal}
          />

          {/* Add / Edit Form Modal: Used for adding or editing an employee */}
          <ProfileFormModal
            object={object}
            addPerson={addAnEmployee}
            updatePerson={updateAnEmployee}
            designations={designations} // Pass designations for selection
            employeeStatus={employeeStatus} // Pass employee status for selection
            formModalState={formModalState}
            showUpdateModal={showUpdateModal}
            closeFormModal={closeFormModal}
          />

          {employees && employees.length > 0 && (
            <>
              {/* View Modal: Displays detailed information about an employee */}
              <GenericModal
                title={null}
                open={viewModal.open}
                onCancel={closeViewModal}
                width={850}
                footer={null}
              >
                <ViewPerson
                  object={object}
                  selectedPerson={viewModal.selectedObject}
                  closeViewModal={closeViewModal}
                  handleEdit={handleEdit}
                  loadOneEmployee={loadOneEmployee}
                />
              </GenericModal>

              {/* Update Confirmation Modal: Appears when confirming an update */}
              <UpdateConfirmModal
                updateFunction={updateAnEmployee}
                updateConfirmModal={updateConfirmModal}
                setUpdateConfirmModal={setUpdateConfirmModal}
                closeModal={closeFormModal}
              />

              {/* Delete Confirmation Modal: Appears when deleting an employee */}
              <DeleteConfirmModal
                object={object}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                deleteFunction={deleteAnEmployee}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageEmployee;
