import { useState } from "react";
import { Button, Col, Row, Table } from "antd";

import { useMobileContext } from "../../contexts/MobileContext";

import { employeeColumnItems } from "../../constants/ColumnItems";
import useEmployees from "../../hooks/useEmployees";

import ManageEmployeeCard from "../../components/Cards/ManageEmployeeCard";
import EditDrawer from "../../components/Drawers/EditDrawer";
import AddNewModal from "../../components/Modals/AddNewModal";

const ManageEmployee = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { isMobile } = useMobileContext();

  const {
    employees,
    loadOneEmployee,
    addAnEmployee,
    updateAnEmployee,
    deleteAnEmployee,
    restoreAnEmployee,
    loading,
    contextHolder,
  } = useEmployees();

  const handleView = async (employeeid) => {
    const employee = await loadOneEmployee(employeeid);
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
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
      {contextHolder}
      <Row>
        <Col span={24}>
          <h1 style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            Manage Employees
          </h1>
          <Row>
            <Col
              span={24}
              style={{ textAlign: "end", marginBottom: "1.25rem" }}
            >
              <Button type="primary" onClick={handleAdd}>
                Add New Employee
              </Button>
            </Col>
          </Row>

          {/* Render Table or a Card Depend on Screen Size 
          Breakpoint : 768px */}
          {!isMobile && (
            <Table
              columns={columns}
              bordered
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

          <AddNewModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            personType="Employee"
            addAnEmployee={addAnEmployee}
          />

          {isDrawerOpen && selectedEmployee && (
            <EditDrawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              personType="Employee"
              employee={selectedEmployee}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
export default ManageEmployee;
