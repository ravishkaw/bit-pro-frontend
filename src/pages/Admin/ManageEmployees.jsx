import { useState } from "react";
import { Button, Col, Row, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useMobileContext } from "../../contexts/MobileContext";

import { employeeColumnItems } from "../../constants/ColumnItems";
import useEmployees from "../../hooks/useEmployees";

import ManageEmployeeCard from "../../components/Cards/ManageEmployeeCard";
import FormModal from "../../components/Modals/FormModal";

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
          <Row>
            <Col span={16}>
              <Typography.Title level={2}>Manage Employees</Typography.Title>
            </Col>
            <Col span={8} style={{ textAlign: "end" }}>
              <Button type="primary" onClick={handleAdd}>
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
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            personType="Employee"
            addAnEmployee={addAnEmployee}
          />
        </Col>
      </Row>
    </>
  );
};
export default ManageEmployee;
