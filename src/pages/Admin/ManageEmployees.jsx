import { Col, Row } from "antd";

import useEmployees from "../../hooks/useEmployees";
import useModalStates from "../../hooks/useModalStates";

import { employeeColumnItems } from "../../components/Table/EmployeeColumnItems";

import ProfileTableCard from "../../components/DataDisplay/ProfileTableCard";
import ViewPerson from "../../components/Modals/ViewPerson";
import ProfileFormModal from "../../components/Modals/ProfileFormModal";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import UpdateConfirmModal from "../../components/Modals/UpdateConfirmModal";

// Admin Manage Employees Page
const ManageEmployee = () => {
  const personType = "employee";

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
    setViewModal,
    deleteModal,
    setDeleteModal,
    openFormModal,
    closeFormModal,
    openDeleteModal,
    showUpdateModal,
  } = useModalStates();

  // Handle view
  const handleView = async (employeeid) => {
    const employee = await loadOneEmployee(employeeid);
    setViewModal({ open: true, selectedPerson: employee });
  };

  // Handle edit
  const handleEdit = async (employeeid) => {
    const employee = await loadOneEmployee(employeeid);
    openFormModal(true, employee);
  };

  // Table columns
  const columns = employeeColumnItems(
    handleView,
    handleEdit,
    openDeleteModal,
    restoreAnEmployee
  );

  return (
    <>
      <Row>
        <Col span={24}>
          {/* Data view table and card for mobile */}
          <ProfileTableCard
            personType={personType}
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
            restorePerson={restoreAnEmployee}
          />

          {/* Add / edit form modal */}
          <ProfileFormModal
            personType={personType}
            addPerson={addAnEmployee}
            updatePerson={updateAnEmployee}
            designations={designations}
            employeeStatus={employeeStatus}
            formModalState={formModalState}
            showUpdateModal={showUpdateModal}
            closeFormModal={closeFormModal}
          />

          {employees && employees.length > 0 && (
            <>
              {/* View modal */}
              <ViewPerson
                personType={personType}
                viewModal={viewModal}
                setViewModal={setViewModal}
                handleEdit={handleEdit}
              />

              {/* Update confirmation modal */}
              <UpdateConfirmModal
                updatePerson={updateAnEmployee}
                updateConfirmModal={updateConfirmModal}
                setUpdateConfirmModal={setUpdateConfirmModal}
                closeModal={closeFormModal}
              />

              {/* Delete confirmation modal */}
              <DeleteConfirmModal
                personType={personType}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                deletePerson={deleteAnEmployee}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageEmployee;
