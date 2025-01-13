import { useState, useEffect } from "react";
import { Button, Col, Row, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { useMobileContext } from "../../contexts/MobileContext";

import { employeeColumnItems } from "../../constants/ColumnItems";
import useEmployees from "../../hooks/useEmployees";

import ManageEmployeeCard from "../../components/Cards/ManageEmployeeCard";
import FormModal from "../../components/Modals/FormModal";
import SkeletonCards from "../../components/Cards/SkeletonCards";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import ViewPerson from "../../components/Modals/ViewPerson";

const ManageEmployee = () => {
  const [modalState, setModalState] = useState({
    open: false,
    isEditing: false,
    selectedPerson: null,
  });

  const [viewModal, setViewModal] = useState({
    open: false,
    selectedPerson: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    selectedPerson: null,
  });

  const [designations, setDesignations] = useState([
    { value: 1, label: "Staff" },
  ]);

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
    getEmployeeDesignation,
  } = useEmployees();

  useEffect(() => {
    // Fetch designtions and format it into the options in designation
    const fetchDesignations = async () => {
      try {
        const response = await getEmployeeDesignation();
        const mappedDesignations = response.map((designation) => ({
          value: designation.id,
          label: designation.name,
        }));
        setDesignations(mappedDesignations);
      } catch (error) {
        console.error("Failed to fetch designations:", error);
      }
    };

    fetchDesignations();
  }, []);

  // Open form modal for add new and edit employee
  const openFormModal = (isEditing, selectedEmployee = null) => {
    setModalState({
      open: true,
      isEditing,
      selectedPerson: selectedEmployee,
    });
  };

  // Close edit / add form modal
  const closeFormModal = () => {
    setModalState({
      open: false,
      isEditing: false,
      selectedPerson: null,
    });
  };

  // Fetch and return formatted employee
  const oneEmployee = async (employeeid) => {
    // Fetch employee from id
    const employee = await loadOneEmployee(employeeid);
    const updatedEmployee = {
      ...employee,
      dob: dayjs(employee.dob),
      designation: employee.designation.id,
      employeeStatus: employee.employeeStatus.name,
    };
    return updatedEmployee;
  };

  // Handle view
  const handleView = async (employeeid) => {
    const employee = await oneEmployee(employeeid);
    setViewModal({ open: true, selectedPerson: employee });
  };

  // Handle edit
  const handleEdit = async (employeeid) => {
    const employee = await oneEmployee(employeeid);
    openFormModal(true, employee);
  };

  // open the delete confirmation modal
  const openDeleteModal = (record) => {
    setDeleteModal({ open: true, selectedPerson: record });
  };

  // Table coloumns
  const columns = employeeColumnItems(
    handleView,
    handleEdit,
    openDeleteModal,
    restoreAnEmployee
  );

  // handle the pagination details
  const handlePageChange = (pagination) => {
    const isPageSizeChanged =
      pagination.pageSize !== paginationDetails.pageSize;

    setPaginationDetails({
      current: isPageSizeChanged ? 1 : pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  // Map the fetched employees into datasource and add empty array as a fallback
  const dataSource = employees ? employees : [];

  return (
    <>
      <Row>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={2}>Manage Employees</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" onClick={() => openFormModal(false)}>
                <PlusOutlined />
                Add New Employee
              </Button>
            </Col>
          </Row>

          {/* Render Table or a Card Depend on Screen Size 
          Breakpoint : 768px */}
          {!isMobile && (
            <Table
              columns={columns}
              // bordered
              rowKey="empNo"
              dataSource={dataSource}
              loading={loading}
              pagination={{
                ...paginationDetails,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
              }}
              scroll={{
                x: "max-content",
              }}
              onChange={handlePageChange}
            />
          )}

          {/* Cards for mobile view instead of table */}
          {isMobile &&
            (loading ? (
              <SkeletonCards />
            ) : (
              dataSource.map((employee) => {
                return (
                  <ManageEmployeeCard
                    key={employee.id}
                    loading={loading}
                    columns={columns}
                    employee={employee}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    openDeleteModal={openDeleteModal}
                    restoreAnEmployee={restoreAnEmployee}
                  />
                );
              })
            ))}

          {/* Add / edit form modal */}
          {dataSource.length > 0 && (
            <FormModal
              personType="Employee"
              addPerson={addAnEmployee}
              updatePerson={updateAnEmployee}
              designations={designations}
              modalState={modalState}
              closeModal={closeFormModal}
            />
          )}

          {/* view modal */}
          {dataSource.length > 0 && (
            <ViewPerson
              personType="Employee"
              viewModal={viewModal}
              setViewModal={setViewModal}
            />
          )}

          {/* Delete confirmatin form modal */}
          {dataSource.length > 0 && (
            <DeleteConfirmModal
              personType="Employee"
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              deletePerson={deleteAnEmployee}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
export default ManageEmployee;
