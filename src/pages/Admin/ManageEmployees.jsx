import { Button, Col, Flex, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import useEmployees from "../../hooks/useEmployees";
import useProfileModalStates from "../../hooks/useProfileModalStates";

import { useMobileContext } from "../../contexts/MobileContext";

import { employeeColumnItems } from "../../components/DataDisplay/Table/ColumnItems";

import ProfileTableCard from "../../components/DataDisplay/ProfileTableCard";
import ViewPerson from "../../components/Modals/ViewPerson";
import ProfileFormModal from "../../components/Modals/ProfileFormModal";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import UpdateConfirmModal from "../../components/Modals/UpdateConfirmModal";

const ManageEmployee = () => {
  const personType = "employee";

  const { isMobile } = useMobileContext();
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
  } = useEmployees();

  const {
    profileFormModalState,
    setProfileFormModalState,
    updateConfirmModal,
    setUpdateConfirmModal,
    viewModal,
    setViewModal,
    deleteModal,
    setDeleteModal,
  } = useProfileModalStates();

  // Open form modal for add new and edit employee
  const openProfileFormModal = (isEditing, selectedEmployee = null) => {
    setProfileFormModalState({
      open: true,
      isEditing,
      selectedPerson: selectedEmployee,
    });
  };

  // Handle view
  const handleView = async (employeeid) => {
    const employee = await loadOneEmployee(employeeid);
    setViewModal({ open: true, selectedPerson: employee });
  };

  // Handle edit
  const handleEdit = async (employeeid) => {
    const employee = await loadOneEmployee(employeeid);
    openProfileFormModal(true, employee);
  };

  // Open the delete confirmation modal
  const openDeleteModal = (record) => {
    setDeleteModal({ open: true, selectedPerson: record });
  };

  // Show the update confirmation modal with updated data
  const showUpdateModal = (updatedValues, selectedPersonId, updatedData) => {
    setUpdateConfirmModal({
      open: true,
      updatedValues,
      selectedPersonId,
      updatedData,
    });
  };

  // Close the form modal
  const closeFormModal = () => {
    setProfileFormModalState({
      open: false,
      isEditing: false,
      selectedPerson: null,
    });
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
          <Flex justify="space-between" align="center">
            <Typography.Title level={isMobile ? 4 : 3}>
              Manage Employees
            </Typography.Title>

            <Button type="primary" onClick={() => openProfileFormModal(false)}>
              <PlusOutlined />
              Add New Employee
            </Button>
          </Flex>

          {/* Data view table and card for mobile */}
          <ProfileTableCard
            personType={personType}
            columns={columns}
            rowKey="empNo"
            dataSource={employees}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
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
            profileFormModalState={profileFormModalState}
            setProfileFormModalState={setProfileFormModalState}
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
