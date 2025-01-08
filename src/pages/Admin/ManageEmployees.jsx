import { useState } from "react";
import { Button, Col, Row, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useMobileContext } from "../../contexts/MobileContext";

import { employeeColumnItems } from "../../constants/ColumnItems";
import useEmployees from "../../hooks/useEmployees";

import ManageEmployeeCard from "../../components/Cards/ManageEmployeeCard";
import FormModal from "../../components/Modals/FormModal";

const ManageEmployee = () => {
  const [modalState, setModalState] = useState({
    open: false,
    isEditing: false,
    confirmLoading: false,
    selectedEmployee: null,
  });

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

  const openModal = (isEditing, selectedEmployee = null) => {
    setModalState({
      open: true,
      isEditing,
      selectedEmployee: selectedEmployee,
    });
  };

  const closeModal = () => {
    setModalState({ open: false, isEditing: false, selectedEmployee: null });
  };

  const handleView = async (employeeid) => {
    const employee = await loadOneEmployee(employeeid);
    openModal(true, employee);
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
            })}

          <FormModal
            personType="Employee"
            addAnEmployee={addAnEmployee}
            updateAnEmployee={updateAnEmployee}
            getEmployeeDesignation={getEmployeeDesignation}
            modalState={modalState}
            closeModal={closeModal}
          />
        </Col>
      </Row>
    </>
  );
};
export default ManageEmployee;
