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

const ManageEmployee = () => {
  const [modalState, setModalState] = useState({
    open: false,
    isEditing: false,
    confirmLoading: false,
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
    getEmployeeDesignation,
  } = useEmployees();

  useEffect(() => {
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

  const openModal = (isEditing, selectedEmployee = null) => {
    setModalState({
      open: true,
      isEditing,
      confirmLoading: loading,
      selectedPerson: selectedEmployee,
    });
  };

  const closeModal = () => {
    setModalState({
      open: false,
      isEditing: false,
      confirmLoading: false,
      selectedPerson: null,
    });
  };

  const handleView = async (employeeid) => {
    const employee = await loadOneEmployee(employeeid);
    const updatedEmployee = {
      ...employee,
      dob: dayjs(employee.dob),
      designation: employee.designation.id,
      employeeStatus: employee.employeeStatus.name,
    };
    openModal(true, updatedEmployee);
  };

  const columns = employeeColumnItems(
    handleView,
    deleteAnEmployee,
    restoreAnEmployee
  );
  const dataSource = employees.map((employee) => ({
    ...employee,
    key: employee.employeeId,
    name: `${employee.firstName} ${employee.lastName}`,
  }));

  return (
    <>
      <Row>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={2}>Manage Employees</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" onClick={() => openModal(false)}>
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
              dataSource={dataSource}
              loading={loading}
              scroll={{
                x: "max-content",
              }}
            />
          )}

          {isMobile &&
            (loading ? (
              <SkeletonCards />
            ) : (
              dataSource.map((employee) => {
                return (
                  <ManageEmployeeCard
                    key={employee.employeeId}
                    loading={loading}
                    columns={columns}
                    employee={employee}
                    handleView={handleView}
                    deleteAnEmployee={deleteAnEmployee}
                    restoreAnEmployee={restoreAnEmployee}
                  />
                );
              })
            ))}

          <FormModal
            personType="Employee"
            addPerson={addAnEmployee}
            updatePerson={updateAnEmployee}
            designations={designations}
            modalState={modalState}
            closeModal={closeModal}
          />
        </Col>
      </Row>
    </>
  );
};
export default ManageEmployee;
