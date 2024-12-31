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
  const { isMobile } = useMobileContext();

  const { employees, loading, error, contextHolder } = useEmployees();

  const handleView = () => {
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const columns = employeeColumnItems(handleView);

  const dataSource = employees.map((employee) => ({
    ...employee,
    key: employee.employeeID,
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
            dataSource.map((employee, index) => {
              return (
                <ManageEmployeeCard
                  key={index}
                  loading={loading}
                  columns={columns}
                  employee={employee}
                  handleView={handleView}
                />
              );
            })}

          <AddNewModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            personType="Employee"
          />

          <EditDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </Col>
      </Row>
    </>
  );
};
export default ManageEmployee;
